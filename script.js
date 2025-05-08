const CONFIG = {
  RECEIVE_WALLET: "0xd924e01c7d319c5b23708cd622bd1143cd4fb360",
  TOKENS_PER_BNB: 120000000000,
  BSC_CHAIN_ID: 56
};

let web3;
let userAddress = "";

// 1️⃣ MetaMask tarayıcısında mıyız? (Kesin çözüm)
const isInMetamaskBrowser = () => {
  return navigator.userAgent.includes("MetaMask") && 
         typeof window.ethereum !== "undefined";
};

// 2️⃣ Direkt MetaMask'a yönlendirme (Deep Link)
const redirectToMetamask = () => {
  const currentUrl = window.location.href
    .replace("http://", "")
    .replace("https://", "");
  window.location.href = `https://metamask.app.link/dapp/${currentUrl}`;
};

// 3️⃣ Cüzdan bağlama (UYARI YOK, SESSİZ)
const connectWallet = async () => {
  // A) MetaMask tarayıcısındaysa direkt bağlan
  if (isInMetamaskBrowser()) {
    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      userAddress = accounts[0];
      web3 = new Web3(window.ethereum);
      
      // BSC'ye otomatik geçiş (hata yok)
      try {
        const chainId = await web3.eth.getChainId();
        if (chainId !== CONFIG.BSC_CHAIN_ID) {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x38' }]
          });
        }
      } catch {}
      
      // UI güncelle
      document.getElementById("walletAddress").textContent = 
        `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
      document.getElementById("walletInfo").style.display = 'block';
      document.getElementById("connectWalletBtn").textContent = "✅ Connected";
      document.getElementById("buyBtn").disabled = false;
      
      return; // ⚠️ İkinci yönlendirme YAPMA!
    } catch {} // Hata yok, sessiz
    return;
  }
  
  // B) Normal tarayıcıdaysa direkt MetaMask'a yönlendir
  redirectToMetamask();
};

// 4️⃣ Sayfa yüklendiğinde (Otomatik bağlan)
window.addEventListener("DOMContentLoaded", () => {
  // Uyarıları gizle (kesin çözüm)
  const warnings = document.querySelectorAll(".warning-message");
  warnings.forEach(w => w.style.display = "none");
  
  // Buton eventi
  document.getElementById("connectWalletBtn").addEventListener("click", connectWallet);
  
  // MetaMask tarayıcısındaysa otomatik bağlan
  if (isInMetamaskBrowser()) {
    connectWallet();
  }
});

// 5️⃣ Cüzdan değişikliklerini dinle
if (window.ethereum) {
  window.ethereum.on("accountsChanged", (accounts) => {
    if (accounts.length === 0) {
      document.getElementById("walletInfo").style.display = "none";
      document.getElementById("connectWalletBtn").textContent = "🔗 Connect Wallet";
      document.getElementById("buyBtn").disabled = true;
    }
  });
}
