// script.js — FreeDogeAI Mobil Presale (KONTROL EDİLMİŞ)
const TOKEN_SALE_CONTRACT = "0xd924e01c7d319c5b23708cd622bd1143cd4fb360"; // SENİN TOKEN SATIŞ KONTRATIN
const DROP_CONTRACT = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7"; // SENİN OTOMATİK DROP KONTRATIN
const TOKEN_PRICE = 12500000; // 1 BNB = 12.5M FDAI
const MIN_BNB = 0.035;

// MetaMask Bağlantısı (Mobil)
async function connectMetaMask() {
  const deepLink = `https://metamask.app.link/dapp/${encodeURIComponent(window.location.href)}`;
  window.location.href = deepLink;
  
  setTimeout(() => {
    if (!window.ethereum) {
      const isAndroid = /Android/i.test(navigator.userAgent);
      window.location.href = isAndroid ?
        "https://play.google.com/store/apps/details?id=io.metamask" :
        "https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202";
    }
  }, 2000);
}

// Trust Wallet Bağlantısı (Mobil)
async function connectTrustWallet() {
  const deepLink = `https://link.trustwallet.com/open_url?coin_id=60&url=${encodeURIComponent(window.location.href)}`;
  window.location.href = deepLink;
  
  setTimeout(() => {
    if (!window.ethereum) {
      const isAndroid = /Android/i.test(navigator.userAgent);
      window.location.href = isAndroid ?
        "https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp" :
        "https://apps.apple.com/us/app/trust-crypto-bitcoin-wallet/id1288339409";
    }
  }, 2000);
}

// Token Hesaplama
function setupCalculator() {
  document.getElementById("bnbAmount").addEventListener("input", (e) => {
    const bnb = parseFloat(e.target.value) || 0;
    const tokens = bnb * TOKEN_PRICE;
    document.getElementById("fdaiAmount").textContent = 
      `YOU WILL RECEIVE: ${tokens.toLocaleString()} FDAI`;
    document.getElementById("buyButton").disabled = bnb < MIN_BNB;
  });
}

// Token Satın Alma
async function buyTokens() {
  if (!window.ethereum) return alert("Cüzdan bağlı değil!");
  
  const bnbAmount = parseFloat(document.getElementById("bnbAmount").value);
  if (bnbAmount < MIN_BNB) return alert(`En az ${MIN_BNB} BNB girmelisiniz!`);

  try {
    const tx = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [{
        from: window.ethereum.selectedAddress,
        to: TOKEN_SALE_CONTRACT,
        value: ethers.utils.parseEther(bnbAmount.toString()).toHexString(),
        gas: "0x30d40" // 200.000 gas
      }]
    });
    alert(`BAŞARILI! İşlem hash: ${tx}`);
  } catch (err) {
    alert("HATA: " + (err.message || "İşlem başarısız"));
  }
}

// OTOMATİK DROP
async function claimDrop() {
  if (!window.ethereum) return alert("Cüzdan bağlı değil!");
  
  try {
    const tx = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [{
        from: window.ethereum.selectedAddress,
        to: DROP_CONTRACT,
        data: "0x4e71d92d" // claim() fonksiyonu
      }]
    });
    alert(`DROP TALEBİ GÖNDERİLDİ! TX: ${tx}`);
  } catch (err) {
    alert("DROP HATASI: " + err.message);
  }
}

// Sayfa Yükleme
window.addEventListener("DOMContentLoaded", () => {
  // Buton Eventleri
  document.getElementById("connectMetaMask").onclick = connectMetaMask;
  document.getElementById("connectTrustWallet").onclick = connectTrustWallet;
  document.getElementById("buyButton").onclick = buyTokens;
  
  // Eğer DROP butonu varsa
  const dropBtn = document.getElementById("dropButton");
  if (dropBtn) dropBtn.onclick = claimDrop;
  
  // Hesaplamayı Başlat
  setupCalculator();
});
