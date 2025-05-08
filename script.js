const CONFIG = {
  RECEIVE_WALLET: "0xd924e01c7d319c5b23708cd622bd1143cd4fb360",
  TOKENS_PER_BNB: 120000000000,
  BSC_CHAIN_ID: 56
};

let web3;
let userAddress = "";

// Tarayıcı kontrolü (sadece MetaMask kontrolü)
const isInMetamaskBrowser = () => navigator.userAgent.includes("MetaMask");

// Direkt MetaMask'a yönlendirme
const redirectToMetamask = () => {
  const currentUrl = window.location.href.replace(/^https?:\/\//, '');
  window.location.href = `https://metamask.app.link/dapp/${currentUrl}`;
};

// Cüzdan bağlantısı (hiçbir uyarı yok)
const connectWallet = async () => {
  // MetaMask tarayıcısı içindeysek direkt bağlan
  if (isInMetamaskBrowser()) {
    try {
      // Hesapları direkt iste (hiçbir kontrol yok)
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      userAddress = accounts[0];
      web3 = new Web3(window.ethereum);

      // Ağı otomatik değiştir (hata yönetimi yok)
      try {
        const chainId = await web3.eth.getChainId();
        if (chainId !== CONFIG.BSC_CHAIN_ID) {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x38' }]
          });
        }
      } catch {} // Ağ hatasını görmezden gel

      // UI güncelle
      document.getElementById("walletAddress").textContent = `${userAddress.slice(0,6)}...${userAddress.slice(-4)}`;
      document.getElementById("walletInfo").style.display = 'block';
      document.getElementById("connectWalletBtn").textContent = "✅ Connected";
      document.getElementById("buyBtn").disabled = false;
      
    } catch {} // Bağlantı hatasını görmezden gel
    return;
  }

  // MetaMask tarayıcısında değilse direkt yönlendir (hiçbir uyarı yok)
  redirectToMetamask();
};

// Sayfa yüklendiğinde
window.addEventListener("DOMContentLoaded", () => {
  // Tüm uyarı mesajlarını gizle
  const warnings = document.querySelectorAll('.warning-message');
  warnings.forEach(w => w.style.display = 'none');
  
  // Bağlantı butonu
  document.getElementById("connectWalletBtn").addEventListener("click", connectWallet);
  
  // MetaMask tarayıcısındaysa otomatik bağlan
  if (isInMetamaskBrowser()) {
    connectWallet();
  }
  
  // BNB miktarı değiştiğinde FDAI hesapla
  document.getElementById('bnbAmount').addEventListener('input', function() {
    const amount = parseFloat(this.value) || 0;
    document.getElementById('fdaiAmount').textContent = (amount * CONFIG.TOKENS_PER_BNB).toLocaleString();
  });
});

// Cüzdan değişikliklerini sessizce dinle
if (window.ethereum) {
  window.ethereum.on('accountsChanged', (accounts) => {
    if (accounts.length === 0) {
      document.getElementById('walletInfo').style.display = 'none';
      document.getElementById('connectWalletBtn').textContent = '🔗 Connect Wallet';
      document.getElementById('buyBtn').disabled = true;
    }
  });
  window.ethereum.on('chainChanged', () => window.location.reload());
}
