// script.js — FreeDogeAI Token Satış Sistemi (MOBİL UYUMLU)
let provider, signer, userAddress;
const CONTRACT_ADDRESS = "0xd924e01c7d319c5b23708cd622bd1143cd4fb360";
const TOKEN_PRICE = 12500000; // 1 BNB = 12.5M FDAI
const MIN_BNB = 0.035;

// Mobil kontrol
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

// Cüzdan bağlama fonksiyonları (SADECE MOBİL)
async function connectMetaMask() {
  try {
    // MetaMask mobil deep link
    const deepLink = `https://metamask.app.link/dapp/${encodeURIComponent(window.location.href)}`;
    
    // Önce MetaMask uygulamasını açmayı dene
    window.location.href = deepLink;
    
    // 2 saniye bekleyip bağlanıp bağlanmadığını kontrol et
    setTimeout(async () => {
      if (window.ethereum && window.ethereum.isMetaMask) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        userAddress = await signer.getAddress();
        updateWalletInfo();
      } else {
        // MetaMask yüklü değilse Play Store/App Store'a yönlendir
        const isAndroid = /Android/i.test(navigator.userAgent);
        const storeLink = isAndroid ? 
          "https://play.google.com/store/apps/details?id=io.metamask" : 
          "https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202";
        window.location.href = storeLink;
      }
    }, 2000);
  } catch (err) {
    alert("MetaMask bağlantı hatası: " + (err.message || "Uygulama yüklü değil"));
  }
}

async function connectTrustWallet() {
  try {
    // Trust Wallet mobil deep link
    const deepLink = `https://link.trustwallet.com/open_url?coin_id=60&url=${encodeURIComponent(window.location.href)}`;
    
    // Önce Trust uygulamasını açmayı dene
    window.location.href = deepLink;
    
    // 2 saniye bekleyip bağlanıp bağlanmadığını kontrol et
    setTimeout(async () => {
      if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        userAddress = await signer.getAddress();
        updateWalletInfo();
      } else {
        // Trust Wallet yüklü değilse mağazaya yönlendir
        const isAndroid = /Android/i.test(navigator.userAgent);
        const storeLink = isAndroid ? 
          "https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp" : 
          "https://apps.apple.com/us/app/trust-crypto-bitcoin-wallet/id1288339409";
        window.location.href = storeLink;
      }
    }, 2000);
  } catch (err) {
    alert("Trust Wallet bağlantı hatası: " + (err.message || "Uygulama yüklü değil"));
  }
}

// Cüzdan bilgilerini güncelle
async function updateWalletInfo() {
  if (!provider || !userAddress) return;
  
  const walletElement = document.getElementById("walletAddress");
  const balanceElement = document.getElementById("bnbBalance");
  
  walletElement.textContent = `Connected: ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
  
  const balance = await provider.getBalance(userAddress);
  const bnbBalance = ethers.utils.formatEther(balance);
  balanceElement.textContent = `BNB BALANCE: ${parseFloat(bnbBalance).toFixed(4)}`;
  
  // BNB miktarı değiştiğinde token hesapla
  document.getElementById("bnbAmount").addEventListener("input", function() {
    const bnbValue = parseFloat(this.value) || 0;
    const tokens = bnbValue * TOKEN_PRICE;
    document.getElementById("fdaiAmount").textContent = 
      `YOU WILL RECEIVE: ${tokens.toLocaleString()} FDAI`;
    
    // Yeterli bakiye kontrolü
    const buyButton = document.getElementById("buyButton");
    const warning = document.getElementById("insufficientFunds");
    if (bnbValue > parseFloat(bnbBalance)) {
      warning.style.display = "block";
      buyButton.disabled = true;
    } else {
      warning.style.display = "none";
      buyButton.disabled = bnbValue < MIN_BNB;
    }
  });
}

// Token satın alma fonksiyonu
async function buyTokens() {
  const bnbAmount = parseFloat(document.getElementById("bnbAmount").value);
  if (isNaN(bnbAmount) {
    alert("Lütfen geçerli bir BNB miktarı girin!");
    return;
  }
  
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS, 
      ["function buyTokens() payable"], 
      signer
    );
    
    const tx = await contract.buyTokens({
      value: ethers.utils.parseEther(bnbAmount.toString()),
      gasLimit: 200000
    });
    
    alert(`İşlem gönderildi! TX Hash: ${tx.hash}`);
  } catch (err) {
    alert("Hata: " + (err.message || "İşlem başarısız oldu"));
  }
}

// Sayfa yüklendiğinde butonları ayarla
document.addEventListener("DOMContentLoaded", function() {
  // Cüzdan bağlama butonları
  document.getElementById("connectMetaMask").addEventListener("click", connectMetaMask);
  document.getElementById("connectTrustWallet").addEventListener("click", connectTrustWallet);
  
  // Token satın alma butonu
  document.getElementById("buyButton").addEventListener("click", buyTokens);
  
  // Modal kapatma
  document.querySelector(".close").addEventListener("click", function() {
    document.getElementById("walletModal").style.display = "none";
  });
  
  // Dışarı tıklayınca modalı kapat
  window.addEventListener("click", function(event) {
    if (event.target === document.getElementById("walletModal")) {
      document.getElementById("walletModal").style.display = "none";
    }
  });
});
