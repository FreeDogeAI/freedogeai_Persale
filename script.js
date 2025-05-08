const CONFIG = {
  RECEIVE_WALLET: "0xd924e01c7d319c5b23708cd622bd1143cd4fb360",
  TOKENS_PER_BNB: 120000000000,
  BSC_CHAIN_ID: 56,
  GAS_LIMIT: 300000
};

let web3;
let userAddress = "";

// Tarayıcı kontrolü
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
const isInMetamaskBrowser = navigator.userAgent.includes("MetaMask");

const connectWallet = async () => {
  // Eğer MetaMask tarayıcısındaysak direkt bağlan
  if (isInMetamaskBrowser) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      userAddress = accounts[0];
      web3 = new Web3(window.ethereum);

      const chainId = await web3.eth.getChainId();
      if (chainId !== CONFIG.BSC_CHAIN_ID) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x38' }] // BSC Mainnet
        });
      }

      // UI güncelleme
      document.getElementById("walletAddress").textContent = 
        `${userAddress.slice(0,6)}...${userAddress.slice(-4)}`;
      document.getElementById("walletInfo").style.display = 'block';
      document.getElementById("connectWalletBtn").textContent = "✅ Connected";
      document.getElementById("buyBtn").disabled = false;

    } catch (err) {
      console.error("Bağlantı hatası:", err);
      alert("Cüzdan bağlantısı reddedildi: " + (err.message || err));
    }
    return;
  }

  // Eğer mobil tarayıcıdaysa MetaMask'a yönlendir
  if (isMobile) {
    window.location.href = `https://metamask.app.link/dapp/${window.location.host}${window.location.pathname}`;
    return;
  }

  // Desktop tarayıcı için normal bağlantı
  if (!window.ethereum) {
    alert("Lütfen MetaMask eklentisini yükleyin!");
    return;
  }

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

    // UI güncelleme
    document.getElementById("walletAddress").textContent = 
      `${userAddress.slice(0,6)}...${userAddress.slice(-4)}`;
    document.getElementById("walletInfo").style.display = 'block';
    document.getElementById("connectWalletBtn").textContent = "✅ Connected";
    document.getElementById("buyBtn").disabled = false;

  } catch (err) {
    console.error("Bağlantı hatası:", err);
    alert("Cüzdan bağlantısı reddedildi: " + (err.message || err));
  }
};

// Sayfa yüklendiğinde kontrol et
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("connectWalletBtn").addEventListener("click", connectWallet);
  
  // Eğer MetaMask tarayıcısındaysa otomatik bağlanmayı dene
  if (isInMetamaskBrowser && window.ethereum) {
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
  
  window.ethereum.on('chainChanged', () => {
    window.location.reload();
  });
}
