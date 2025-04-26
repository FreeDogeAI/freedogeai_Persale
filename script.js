// script.js — FreeDogeAI Token Satış Sistemi
let provider, signer, userAddress;
const CONTRACT_ADDRESS = "0xd924e01c7d319c5b23708cd622bd1143cd4fb360"; // BNB gönderilecek adres
const TOKEN_CONTRACT = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7"; // FDAI Token adresi
const TOKEN_PRICE = 12500000; // 1 BNB = 12.5M FDAI
const MIN_BNB = 0.035; // Minimum satın alma miktarı
const EXPECTED_CHAIN_ID = 56; // Binance Smart Chain (mainnet)

// Akıllı sözleşme ABI'si
const CONTRACT_ABI = [
  "function buyTokens() public payable"
];

// Mobil cihaz kontrolü
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

// DOM elemanlarını kontrol eden yardımcı fonksiyon
function getElement(id) {
  const element = document.getElementById(id);
  if (!element) console.error(`Eleman bulunamadı: ${id}`);
  return element;
}

// Cüzdan bağlantı modalını açma
function openWalletModal() {
  const modal = getElement("walletModal");
  if (modal) {
    modal.style.display = "block";
    console.log("Modal açıldı");
  } else {
    console.error("Modal bulunamadı!");
  }
}

// Modal kapatma
function closeWalletModal() {
  const modal = getElement("walletModal");
  if (modal) {
    modal.style.display = "none";
    console.log("Modal kapatıldı");
  } else {
    console.error("Modal bulunamadı!");
  }
}

// MetaMask bağlantısı (düzeltildi)
async function connectMetaMask() {
  try {
    closeWalletModal();
    if (isMobile) {
      console.log("Mobil cihazda MetaMask bağlantısı deneniyor...");
      const site = encodeURIComponent(window.location.href); // Tam URL’yi kullan
      window.location.href = `metamask://dapp/${site}`; // MetaMask uygulamasını aç
      setTimeout(() => {
        // Eğer MetaMask yüklü değilse, kullanıcıyı uygulama mağazasına yönlendir
        if (!document.hidden) {
          console.log("MetaMask açılmadı, kullanıcıyı mağazaya yönlendiriyorum...");
          const isAndroid = /Android/i.test(navigator.userAgent);
          const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
          let storeLink = "";
          if (isAndroid) {
            storeLink = "https://play.google.com/store/apps/details?id=io.metamask";
          } else if (isIOS) {
            storeLink = "https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202";
          } else {
            storeLink = "https://metamask.io/download/";
          }
          window.location.href = storeLink;
        }
      }, 2000); // 2 saniye bekle

      // Bağlantı sonrası cüzdan bilgilerini kontrol et
      if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        userAddress = await signer.getAddress();
        console.log("MetaMask cüzdanı bağlandı:", userAddress);
        await updateInfo();
      }
      return;
    }

    // Masaüstünde MetaMask kontrolü
    console.log("Masaüstü cihazda MetaMask kontrolü yapılıyor...");
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      console.log("MetaMask yüklü değil veya algılanamadı.");
      alert("MetaMask is not detected. Please install MetaMask or open this page in the MetaMask browser.");
      window.open("https://metamask.io/download/", "_blank");
      return;
    }

    // Sağlayıcıyı başlat
    provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    console.log("MetaMask sağlayıcısı başlatıldı:", window.ethereum);

    // Cüzdan bağlantısı iste
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();
    console.log("Cüzdan bağlandı:", userAddress);

    // Zincir kontrolü
    const network = await provider.getNetwork();
    console.log("Bağlı ağ:", network);
    if (network.chainId !== EXPECTED_CHAIN_ID) {
      try {
        console.log("BSC ağına geçiş deneniyor...");
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${EXPECTED_CHAIN_ID.toString(16)}` }]
        });
      } catch (switchError) {
        console.error("Ağ değiştirme hatası:", switchError);
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: `0x${EXPECTED_CHAIN_ID.toString(16)}`,
              chainName: "Binance Smart Chain",
              nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
              rpcUrls: ["https://bsc-dataseed.binance.org/"],
              blockExplorerUrls: ["https://bscscan.com"]
            }]
          });
        } else {
          alert(`Please switch to the Binance Smart Chain network! Error: ${switchError.message}`);
          return;
        }
      }
    }

    await updateInfo();
  } catch (err) {
    console.error("MetaMask bağlantı hatası:", err);
    alert(`Connection failed: ${err.message || "Please ensure you are using the MetaMask browser."}`);
  }
}

// TrustWallet bağlantısı (düzeltildi)
async function connectTrustWallet() {
  try {
    closeWalletModal();
    if (isMobile) {
      console.log("Mobil cihazda TrustWallet yönlendirmesi başlatılıyor...");
      const site = encodeURIComponent(window.location.href); // Tam URL’yi kullan
      window.location.href = `https://link.trustwallet.com/open_url?coin_id=60&url=${site}`; // TrustWallet uygulamasını aç
      setTimeout(() => {
        // Eğer TrustWallet yüklü değilse, kullanıcıyı uygulama mağazasına yönlendir
        if (!document.hidden) {
          console.log("TrustWallet açılmadı, kullanıcıyı mağazaya yönlendiriyorum...");
          const isAndroid = /Android/i.test(navigator.userAgent);
          const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
          let storeLink = "";
          if (isAndroid) {
            storeLink = "https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp";
          } else if (isIOS) {
            storeLink = "https://apps.apple.com/us/app/trust-crypto-bitcoin-wallet/id1288339409";
          } else {
            storeLink = "https://trustwallet.com/download";
          }
          window.location.href = storeLink;
        }
      }, 2000); // 2 saniye bekle

      // Bağlantı sonrası cüzdan bilgilerini kontrol et
      if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        userAddress = await signer.getAddress();
        console.log("TrustWallet cüzdanı bağlandı:", userAddress);
        await updateInfo();
      }
      return;
    }

    // Masaüstünde TrustWallet kontrolü
    console.log("Masaüstü cihazda TrustWallet kontrolü yapılıyor...");
    if (!window.ethereum) {
      console.log("TrustWallet yüklü değil veya algılanamadı.");
      alert("TrustWallet is not detected. Please install TrustWallet or open this page in the TrustWallet browser.");
      window.open("https://trustwallet.com/download", "_blank");
      return;
    }

    // Sağlayıcıyı başlat
    provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    console.log("TrustWallet sağlayıcısı başlatıldı:", window.ethereum);

    // Cüzdan bağlantısı iste
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();
    console.log("Cüzdan bağlandı:", userAddress);

    // Zincir kontrolü
    const network = await provider.getNetwork();
    console.log("Bağlı ağ:", network);
    if (network.chainId !== EXPECTED_CHAIN_ID) {
      try {
        console.log("BSC ağına geçiş deneniyor...");
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${EXPECTED_CHAIN_ID.toString(16)}` }]
        });
      } catch (switchError) {
        console.error("Ağ değiştirme hatası:", switchError);
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: `0x${EXPECTED_CHAIN_ID.toString(16)}`,
              chainName: "Binance Smart Chain",
              nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
              rpcUrls: ["https://bsc-dataseed.binance.org/"],
              blockExplorerUrls: ["https://bscscan.com"]
            }]
          });
        } else {
          alert(`Please switch to the Binance Smart Chain network! Error: ${switchError.message}`);
          return;
        }
      }
    }

    await updateInfo();
  } catch (err) {
    console.error("TrustWallet connection error:", err);
    alert(`TrustWallet connection failed: ${err.message || "An unknown error occurred."}`);
  }
}

// Arayüzü güncelleme (cüzdan adresi ve bakiye gösterimi)
async function updateInfo() {
  try {
    const elements = {
      wallet: getElement("walletAddress"),
      bnbBalance: getElement("bnbBalance"),
      input: getElement("bnbAmount"),
      output: getElement("fdaiAmount"),
      buyBtn: getElement("buyButton"),
      warning: getElement("insufficientFunds")
    };

    if (!Object.values(elements).every(el => el)) {
      console.error("Arayüz elemanları eksik:", elements);
      alert("Error: UI elements are missing!");
      return;
    }

    elements.wallet.textContent = `Connected: ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
    const balanceWei = await provider.getBalance(userAddress);
    const bnb = parseFloat(ethers.utils.formatEther(balanceWei));
    elements.bnbBalance.textContent = translations[document.getElementById("languageSelect").value]?.bnbBalance.replace("--", bnb.toFixed(4)) || `BNB BALANCE: ${bnb.toFixed(4)}`;
    console.log("Bakiye güncellendi:", bnb);

    elements.input.oninput = null;
    elements.input.oninput = () => {
      const val = parseFloat(elements.input.value);
      const tokens = isNaN(val) ? 0 : val * TOKEN_PRICE;
      const currentLang = document.getElementById("languageSelect").value;
      const baseText = translations[currentLang]?.fdaiAmount.split("0 FDAI")[0] || "YOU WILL RECEIVE: ";
      elements.output.textContent = `${baseText}${tokens.toLocaleString()} FDAI`;
      elements.buyBtn.disabled = val < MIN_BNB || val > bnb;
      elements.warning.style.display = val > bnb ? "block" : "none";
      console.log("Input güncellendi:", { val, tokens, disabled: elements.buyBtn.disabled });
    };
  } catch (err) {
    console.error("Arayüz güncelleme hatası:", err);
    alert(`UI update error: ${err.message}`);
  }
}

// Token satın alma işlemi
async function buyTokens() {
  try {
    const input = getElement("bnbAmount");
    if (!input) {
      alert("Error: BNB amount input field not found!");
      return;
    }

    const val = parseFloat(input.value);
    if (isNaN(val) || val < MIN_BNB) {
      alert(`Minimum purchase amount is ${MIN_BNB} BNB!`);
      return;
    }

    console.log("Token satın alma işlemi başlatılıyor:", { amount: val });
    const contract = new ethers.Contract(TOKEN_CONTRACT, CONTRACT_ABI, signer);
    const tx = await contract.buyTokens({
      value: ethers.utils.parseEther(val.toString()),
      gasLimit: 200000
    });

    console.log("İşlem gönderildi:", tx.hash);
    await tx.wait();
    alert("Token purchase successful!");
    await updateInfo();
  } catch (err) {
    console.error("Token satın alma hatası:", err);
    alert(`Transaction failed: ${err.message || "An unknown error occurred."}`);
  }
}

// Olay dinleyicilerini bağlama
function initializeEventListeners() {
  try {
    const elements = {
      connectWalletBtn: getElement("connectWallet"),
      metaMaskBtn: getElement("connectMetaMask"),
      trustWalletBtn: getElement("connectTrustWallet"),
      buyBtn: getElement("buyButton"),
      closeModal: document.querySelector(".close")
    };

    if (!elements.connectWalletBtn) throw new Error("Connect Wallet butonu bulunamadı!");
    if (!elements.metaMaskBtn) throw new Error("MetaMask butonu bulunamadı!");
    if (!elements.trustWalletBtn) throw new Error("TrustWallet butonu bulunamadı!");
    if (!elements.buyBtn) throw new Error("Buy butonu bulunamadı!");
    if (!elements.closeModal) throw new Error("Close butonu bulunamadı!");

    elements.connectWalletBtn.addEventListener("click", openWalletModal);
    elements.metaMaskBtn.addEventListener("click", connectMetaMask);
    elements.trustWalletBtn.addEventListener("click", connectTrustWallet);
    elements.buyBtn.addEventListener("click", buyTokens);
    elements.closeModal.addEventListener("click", closeWalletModal);

    window.addEventListener("click", function(event) {
      const modal = getElement("walletModal");
      if (event.target === modal) {
        modal.style.display = "none";
        console.log("Modal dışına tıklanarak kapatıldı");
      }
    });

    console.log("Olay dinleyicileri başarıyla bağlandı:", Object.keys(elements));
  } catch (err) {
    console.error("Olay dinleyicileri bağlama hatası:", err);
    alert(`Error occurred while initializing buttons: ${err.message}`);
  }
}

// Başlatma
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM yüklendi, başlatılıyor...");
  initializeEventListeners();
});
