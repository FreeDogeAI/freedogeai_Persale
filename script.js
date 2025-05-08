const CONFIG = {
  RECEIVE_WALLET: "0xd924e01c7d319c5b23708cd622bd1143cd4fb360",
  TOKENS_PER_BNB: 120000000000,
  BSC_CHAIN_ID: 56
};

let web3;
let userAddress = "";

// Tarayıcı kontrolü
const isMobile = () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
const isInMetamaskBrowser = () => navigator.userAgent.includes("MetaMask");

// MetaMask tarayıcısına yönlendirme
const redirectToMetamask = () => {
  const currentUrl = encodeURIComponent(window.location.href);
  window.location.href = `https://metamask.app.link/dapp/${currentUrl}`;
};

// Cüzdan bağlantısı
const connectWallet = async () => {
  // Eğer zaten MetaMask tarayıcısındaysak
  if (isInMetamaskBrowser()) {
    try {
      // MetaMask provider kontrolü
      if (!window.ethereum) {
        console.log("MetaMask provider bekleniyor...");
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (!window.ethereum) {
          console.log("MetaMask provider bulunamadı");
          return;
        }
      }

      // Hesapları iste
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      userAddress = accounts[0];
      web3 = new Web3(window.ethereum);

      // Ağ kontrolü
      const chainId = await web3.eth.getChainId();
      if (chainId !== CONFIG.BSC_CHAIN_ID) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x38' }]
          });
        } catch (switchError) {
          console.log("BSC ağına geçiş yapılamadı:", switchError);
        }
      }

      // UI güncelleme
      updateWalletUI();
      
    } catch (error) {
      console.log("Bağlantı hatası:", error);
    }
    return;
  }

  // Mobil tarayıcıdaysa direkt yönlendir
  if (isMobile()) {
    redirectToMetamask();
    return;
  }

  // Desktop'ta MetaMask yoksa yönlendir
  if (!window.ethereum) {
    window.open("https://metamask.io/download.html", "_blank");
    return;
  }

  // Desktop'ta normal bağlantı
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    userAddress = accounts[0];
    web3 = new Web3(window.ethereum);

    const chainId = await web3.eth.getChainId();
    if (chainId !== CONFIG.BSC_CHAIN_ID) {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x38' }]
      });
    }

    updateWalletUI();
    
  } catch (error) {
    console.log("Bağlantı hatası:", error);
  }
};

// UI güncelleme fonksiyonu
const updateWalletUI = () => {
  document.getElementById("walletAddress").textContent = 
    `${userAddress.slice(0,6)}...${userAddress.slice(-4)}`;
  document.getElementById("walletInfo").style.display = 'block';
  document.getElementById("connectWalletBtn").textContent = "✅ Connected";
  document.getElementById("buyBtn").disabled = false;
};

// Sayfa yüklendiğinde
window.addEventListener("DOMContentLoaded", () => {
  // Bağlantı butonu
  document.getElementById("connectWalletBtn").addEventListener("click", connectWallet);
  
  // MetaMask tarayıcısındaysa otomatik bağlan
  if (isInMetamaskBrowser()) {
    connectWallet();
  }
  
  // BNB miktarı değiştiğinde FDAI hesapla
  document.getElementById('bnbAmount').addEventListener('input', function() {
    const amount = parseFloat(this.value) || 0;
    const tokens = amount * CONFIG.TOKENS_PER_BNB;
    document.getElementById('fdaiAmount').textContent = tokens.toLocaleString();
  });
});

// Cüzdan değişikliklerini dinle
if (window.ethereum) {
  window.ethereum.on('accountsChanged', (accounts) => {
    if (accounts.length === 0) {
      // Cüzdan bağlantısı kesildi
      document.getElementById('walletInfo').style.display = 'none';
      document.getElementById('connectWalletBtn').textContent = '🔗 Connect Wallet';
      document.getElementById('buyBtn').disabled = true;
    }
  });
  
  window.ethereum.on('chainChanged', () => window.location.reload());
}
