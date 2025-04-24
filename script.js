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
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// DOM elemanlarını kontrol eden yardımcı fonksiyon
function getElement(id) {
  const element = document.getElementById(id);
  if (!element) console.error(`Eleman bulunamadı: ${id}`);
  return element;
}

// MetaMask bağlantısı
async function connectMetaMask() {
  try {
    // Mobil cihazda MetaMask bağlantısı
    if (isMobile) {
      console.log("Mobil cihaz tespit edildi, MetaMask kontrolü yapılıyor...");
      if (!window.ethereum || !window.ethereum.isMetaMask) {
        console.log("Mobil cihazda MetaMask algılanamadı.");
        alert("MetaMask ile bağlanmak için lütfen MetaMask uygulamasını yükleyin ve bu siteyi MetaMask tarayıcısında açın. MetaMask uygulamasını açmak için aşağıdaki bağlantıyı kullanabilirsiniz.");
        window.location.href = "https://metamask.app.link"; // MetaMask uygulamasını aç veya yükle
        return;
      }
    } else {
      // Masaüstünde MetaMask kontrolü
      console.log("Masaüstü cihazda MetaMask kontrolü yapılıyor...");
      if (!window.ethereum) {
        console.log("MetaMask yüklü değil.");
        alert("MetaMask yüklü değil! Lütfen MetaMask'i yükleyin: https://metamask.io/download/");
        window.open("https://metamask.io/download/", "_blank");
        return;
      }

      if (!window.ethereum.isMetaMask) {
        console.log("MetaMask algılanamadı, başka bir Web3 cüzdanı olabilir.");
        alert("MetaMask algılanamadı. Başka bir Web3 cüzdanı kullanıyorsanız, lütfen MetaMask'i aktif edin.");
        return;
      }
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
          alert(`Lütfen Binance Smart Chain ağına geçin! Hata: ${switchError.message}`);
          return;
        }
      }
    }

    await updateInfo();
  } catch (err) {
    console.error("MetaMask bağlantı hatası:", err);
    alert(`Bağlantı başarısız: ${err.message || "Bilinmeyen bir hata oluştu. Lütfen MetaMask'i kontrol edin."}`);
  }
}

// TrustWallet bağlantısı
async function connectTrustWallet() {
  try {
    if (isMobile && !window.ethereum) {
      console.log("Mobil cihazda TrustWallet yönlendirmesi başlatılıyor...");
      const site = encodeURIComponent(window.location.href);
      alert("TrustWallet uygulamasına yönlendiriliyorsunuz. Uygulamayı açtıktan sonra siteye geri dönün.");
      window.location.href = `https://link.trustwallet.com/open_url?coin_id=60&url=${site}`;
      return;
    }
    console.log("TrustWallet Web3 enjeksiyonu tespit edildi, bağlanıyor...");
    await connectMetaMask();
  } catch (err) {
    console.error("TrustWallet bağlantı hatası:", err);
    alert(`TrustWallet bağlantısı başarısız: ${err.message || "Bilinmeyen bir hata oluştu."}`);
  }
}

// Arayüzü güncelleme
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
      alert("Hata: Arayüz elemanları eksik!");
      return;
    }

    elements.wallet.textContent = `Bağlı: ${userAddress}`;
    const balanceWei = await provider.getBalance(userAddress);
    const bnb = parseFloat(ethers.utils.formatEther(balanceWei));
    elements.bnbBalance.textContent = `BNB: ${bnb.toFixed(4)}`;
    console.log("Bakiye güncellendi:", bnb);

    elements.input.oninput = null;
    elements.input.oninput = () => {
      const val = parseFloat(elements.input.value);
      const tokens = isNaN(val) ? 0 : val * TOKEN_PRICE;
      elements.output.textContent = `${tokens.toLocaleString()} FDAI`;
      elements.buyBtn.disabled = val < MIN_BNB || val > bnb;
      elements.warning.style.display = val > bnb ? "block" : "none";
      console.log("Input güncellendi:", { val, tokens, disabled: elements.buyBtn.disabled });
    };
  } catch (err) {
    console.error("Arayüz güncelleme hatası:", err);
    alert(`Arayüz güncelleme hatası: ${err.message}`);
  }
}

// Token satın alma işlemi
async function buyTokens() {
  try {
    const input = getElement("bnbAmount");
    if (!input) {
      alert("Hata: BNB miktarı giriş alanı bulunamadı!");
      return;
    }

    const val = parseFloat(input.value);
    if (isNaN(val) || val < MIN_BNB) {
      alert(`Minimum satın alma miktarı ${MIN_BNB} BNB!`);
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
    alert("Token satın alma başarılı!");
    await updateInfo();
  } catch (err) {
    console.error("Token satın alma hatası:", err);
    alert(`İşlem başarısız: ${err.message || "Bilinmeyen bir hata oluştu."}`);
  }
}

// Olay dinleyicilerini bağlama
function initializeEventListeners() {
  try {
    const elements = {
      metaMaskBtn: getElement("connectMetaMask"),
      trustWalletBtn: getElement("connectTrustWallet"),
      buyBtn: getElement("buyButton")
    };

    if (!Object.values(elements).every(el => el)) {
      console.error("Buton elemanları eksik:", elements);
      alert("Hata: Buton elemanları eksik!");
      return;
    }

    elements.metaMaskBtn.onclick = connectMetaMask;
    elements.trustWalletBtn.onclick = connectTrustWallet;
    elements.buyBtn.onclick = buyTokens;
    console.log("Olay dinleyicileri bağlandı:", Object.keys(elements));
  } catch (err) {
    console.error("Olay dinleyicileri bağlama hatası:", err);
    alert("Butonlar başlatılırken hata oluştu!");
  }
}

// Başlatma
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM yüklendi, başlatılıyor...");
  initializeEventListeners();
});
