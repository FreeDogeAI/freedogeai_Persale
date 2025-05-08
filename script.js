const CONFIG = {
  RECEIVE_WALLET: "0xd924e01c7d319c5b23708cd622bd1143cd4fb360",
  TOKENS_PER_BNB: 120000000000,
  BSC_CHAIN_ID: 56
};

let web3;
let userAddress = "";

// Check if in MetaMask in-app browser
const isInMetamaskBrowser = () => navigator.userAgent.includes("MetaMask");

// Direct redirect to MetaMask
const redirectToMetamask = () => {
  const cleanUrl = window.location.href.replace(/^https?:\/\//, '');
  window.location.href = `https://metamask.app.link/dapp/${cleanUrl}`;
};

// Wallet connection without any warnings
const connectWallet = async () => {
  if (isInMetamaskBrowser()) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      userAddress = accounts[0];
      web3 = new Web3(window.ethereum);
      
      // Auto-switch to BSC without notifications
      try {
        const chainId = await web3.eth.getChainId();
        if (chainId !== CONFIG.BSC_CHAIN_ID) {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x38' }]
          });
        }
      } catch {}
      
      // Update UI
      document.getElementById("walletAddress").textContent = 
        `${userAddress.slice(0,6)}...${userAddress.slice(-4)}`;
      document.getElementById("walletInfo").style.display = 'block';
      document.getElementById("connectWalletBtn").textContent = "✅ Connected";
      document.getElementById("buyBtn").disabled = false;
      
    } catch {}
    return;
  }

  // If not in MetaMask browser, redirect immediately
  redirectToMetamask();
};

// Initialize
window.addEventListener("DOMContentLoaded", () => {
  // Remove all warning messages from DOM
  document.querySelectorAll('.warning-message, .info-message').forEach(el => {
    el.style.display = 'none';
  });
  
  // Connect button
  document.getElementById("connectWalletBtn").addEventListener("click", connectWallet);
  
  // Auto-connect if in MetaMask browser
  if (isInMetamaskBrowser()) {
    connectWallet();
  }
  
  // FDAI calculation
  document.getElementById('bnbAmount').addEventListener('input', function() {
    const amount = parseFloat(this.value) || 0;
    document.getElementById('fdaiAmount').textContent = 
      (amount * CONFIG.TOKENS_PER_BNB).toLocaleString();
  });
});

// Wallet listeners
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
