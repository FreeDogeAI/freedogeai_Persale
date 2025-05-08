// Configuration
const CONFIG = {
  RECEIVE_WALLET: "0xd924e01c7d319c5b23708cd622bd1143cd4fb360",
  TOKENS_PER_BNB: 120000000000,
  BSC_CHAIN_ID: 56
};

// App state
let web3;
let userAddress = "";

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  // Setup event listeners
  document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
  document.getElementById('buyBtn').addEventListener('click', sendBNB);
  document.getElementById('bnbAmount').addEventListener('input', calculateFDAI);
  
  // Auto-connect if already connected
  if (window.ethereum?.selectedAddress) {
    connectWallet();
  }
});

// Wallet connection handler
async function connectWallet() {
  try {
    // Check if MetaMask is installed
    if (!window.ethereum) {
      // Mobile redirect
      if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        const currentUrl = window.location.href.replace(/^https?:\/\//, '');
        window.location.href = `https://metamask.app.link/dapp/${currentUrl}`;
      } else {
        // Desktop - OPEN METAMASK DEEP LINK DIRECTLY
        window.location.href = "https://metamask.io/download.html";
        // Alternative for direct app opening:
        // window.open("metamask://", "_blank"); 
      }
      return;
    }
    
    // Request accounts
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    userAddress = accounts[0];
    web3 = new Web3(window.ethereum);
    
    // Switch to BSC network
    try {
      const chainId = await web3.eth.getChainId();
      if (chainId !== CONFIG.BSC_CHAIN_ID) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x38' }] // BSC Mainnet
        });
      }
    } catch (error) {
      console.log("Network switch failed:", error);
    }
    
    updateWalletUI();
  } catch (error) {
    console.log("Connection error:", error);
    // Desktop'da bağlantı hatasında tekrar yönlendirme
    if (!/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.location.href = "https://metamask.io/download.html";
    }
  }
}

// ... (diğer fonksiyonlar aynı kalacak) ...
