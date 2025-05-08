// Configuration
const CONFIG = {
  RECEIVE_WALLET: "0xd924e01c7d319c5b23708cd622bd1143cd4fb360",
  TOKENS_PER_BNB: 120000000000,
  BSC_CHAIN_ID: 56,
  METAMASK_DEEPLINK: "https://metamask.app.link/dapp/"
};

// App state
let web3;
let userAddress = "";
let isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
let isInMetamask = navigator.userAgent.includes("MetaMask") && window.ethereum?.isMetaMask;

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  // Hide all warning messages
  document.querySelectorAll('.warning-message').forEach(el => el.style.display = 'none');
  
  // Setup event listeners
  document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
  document.getElementById('buyBtn').addEventListener('click', sendBNB);
  document.getElementById('bnbAmount').addEventListener('input', calculateFDAI);
  
  // Auto-connect if in MetaMask browser
  if (isInMetamask && window.ethereum.selectedAddress) {
    connectWallet();
  }
});

// Wallet connection handler
async function connectWallet() {
  // If in MetaMask browser, connect directly
  if (isInMetamask) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      userAddress = accounts[0];
      web3 = new Web3(window.ethereum);
      
      // Switch to BSC network
      try {
        const chainId = await web3.eth.getChainId();
        if (chainId !== CONFIG.BSC_CHAIN_ID) {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x38' }]
          });
        }
      } catch (error) {
        console.log("Network switch failed:", error);
      }
      
      updateWalletUI();
      return;
    } catch (error) {
      console.log("Connection failed:", error);
      return;
    }
  }
  
  // If on mobile but not in MetaMask, redirect
  if (isMobile) {
    const currentUrl = window.location.href.replace(/^https?:\/\//, '');
    window.location.href = CONFIG.METAMASK_DEEPLINK + currentUrl;
    return;
  }
  
  // If on desktop without MetaMask, open install page
  if (!window.ethereum) {
    window.open("https://metamask.io/download.html", "_blank");
    return;
  }
  
  // Default connection for desktop with MetaMask
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    userAddress = accounts[0];
    web3 = new Web3(window.ethereum);
    updateWalletUI();
  } catch (error) {
    console.log("Connection error:", error);
  }
}

// Update UI after connection
function updateWalletUI() {
  // Format address display
  const shortAddress = `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
  document.getElementById('walletAddress').textContent = shortAddress;
  document.getElementById('userTokenAddress').textContent = shortAddress;
  
  // Show wallet info
  document.getElementById('walletInfo').style.display = 'block';
  document.getElementById('connectWalletBtn').textContent = '✅ Connected';
  document.getElementById('buyBtn').disabled = false;
  
  // Get and display balance
  web3.eth.getBalance(userAddress).then(balance => {
    const bnbBalance = web3.utils.fromWei(balance, 'ether');
    document.getElementById('bnbBalance').textContent = `${parseFloat(bnbBalance).toFixed(6)} BNB`;
  });
}

// Calculate FDAI tokens
function calculateFDAI() {
  const amount = parseFloat(this.value) || 0;
  document.getElementById('fdaiAmount').textContent = (amount * CONFIG.TOKENS_PER_BNB).toLocaleString();
}

// Send BNB transaction
async function sendBNB() {
  const bnbAmount = parseFloat(document.getElementById('bnbAmount').value);
  
  if (!bnbAmount || bnbAmount <= 0) return;
  
  try {
    const weiAmount = web3.utils.toWei(bnbAmount.toString(), 'ether');
    
    const tx = {
      from: userAddress,
      to: CONFIG.RECEIVE_WALLET,
      value: weiAmount,
      gas: 300000,
      gasPrice: await web3.eth.getGasPrice()
    };
    
    const receipt = await web3.eth.sendTransaction(tx);
    alert(`✅ ${bnbAmount} BNB sent successfully!\nTX Hash: ${receipt.transactionHash}`);
    
  } catch (error) {
    console.error("Transaction failed:", error);
  }
}

// Handle account changes
if (window.ethereum) {
  window.ethereum.on('accountsChanged', (accounts) => {
    if (accounts.length > 0) {
      userAddress = accounts[0];
      updateWalletUI();
    } else {
      // Disconnect
      document.getElementById('walletInfo').style.display = 'none';
      document.getElementById('connectWalletBtn').textContent = '🔗 Connect Wallet';
      document.getElementById('buyBtn').disabled = true;
    }
  });
  
  window.ethereum.on('chainChanged', () => window.location.reload());
}
