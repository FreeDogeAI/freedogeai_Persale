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
  // MetaMask tarayıcısındaysa direkt bağlan
  if (isInMetamaskBrowser) {
    try {
      if (!window.ethereum) {
        console.log("MetaMask provider bulunamadı");
        return;
      }

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
          console.error("Ağ değiştirme hatası:", switchError);
        }
      }

      // UI güncelleme
      document.getElementById("walletAddress").textContent = 
        `${userAddress.slice(0,6)}...${userAddress.slice(-4)}`;
      document.getElementById("walletInfo").style.display = 'block';
      document.getElementById("connectWalletBtn").textContent = "✅ Connected";
      document.getElementById("buyBtn").disabled = false;

      return;
    } catch (err) {
      console.error("Bağlantı hatası:", err);
      return;
    }
  }

  // Mobil tarayıcıdaysa direkt MetaMask'a yönlendir
  if (isMobile) {
    window.location.href = `https://metamask.app.link/dapp/${window.location.host}${window.location.pathname}`;
    return;
  }

  // Desktop'ta MetaMask yoksa yönlendirme yap
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

    // UI güncelleme
    document.getElementById("walletAddress").textContent = 
      `${userAddress.slice(0,6)}...${userAddress.slice(-4)}`;
    document.getElementById("walletInfo").style.display = 'block';
    document.getElementById("connectWalletBtn").textContent = "✅ Connected";
    document.getElementById("buyBtn").disabled = false;

  } catch (err) {
    console.error("Bağlantı hatası:", err);
  }
};

// Sayfa yüklendiğinde
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("connectWalletBtn").addEventListener("click", connectWallet);
  
  // MetaMask tarayıcısındaysa otomatik bağlanmayı dene
  if (isInMetamaskBrowser) {
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
