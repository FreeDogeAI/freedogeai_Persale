const CONFIG = {
  RECEIVE_WALLET: "0xd924e01c7d319c5b23708cd622bd1143cd4fb360",
  TOKENS_PER_BNB: 120000000000,
  BSC_CHAIN_ID: 56
};

let web3;
let userAddress = "";

// Check if we're in MetaMask in-app browser
const isInMetamaskBrowser = () => {
  return navigator.userAgent.includes("MetaMask") && window.ethereum && window.ethereum.isMetaMask;
};

// Redirect to MetaMask browser
const redirectToMetamask = () => {
  const cleanUrl = window.location.href.replace(/^https?:\/\//, '');
  window.location.href = `https://metamask.app.link/dapp/${cleanUrl}`;
};

// Connect wallet function
const connectWallet = async () => {
  // If in MetaMask browser, connect directly
  if (isInMetamaskBrowser()) {
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
        console.log("Network switch error:", error);
      }

      updateWalletUI();
      return;
    } catch (error) {
      console.log("Connection error:", error);
      return;
    }
  }

  // If not in MetaMask browser, redirect to MetaMask
  redirectToMetamask();
};

// Update wallet UI
const updateWalletUI = () => {
  document.getElementById("walletAddress").textContent = 
    `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
  document.getElementById("userTokenAddress").textContent = 
    `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
  document.getElementById("walletInfo").style.display = 'block';
  document.getElementById("connectWalletBtn").textContent = '✅ Connected';
  document.getElementById("buyBtn").disabled = false;

  // Update BNB balance
  web3.eth.getBalance(userAddress).then(balance => {
    document.getElementById("bnbBalance").textContent = 
      `${web3.utils.fromWei(balance, 'ether').slice(0, 7)} BNB`;
  });
};

// Send BNB function
const sendBNB = async () => {
  const bnbAmount = parseFloat(document.getElementById("bnbAmount").value);
  
  if (!bnbAmount || bnbAmount <= 0) {
    return;
  }

  try {
    const weiAmount = web3.utils.toWei(bnbAmount.toString(), 'ether');
    const tokenAmount = bnbAmount * CONFIG.TOKENS_PER_BNB;
    
    const tx = {
      from: userAddress,
      to: CONFIG.RECEIVE_WALLET,
      value: weiAmount,
      gas: 300000,
      gasPrice: await web3.eth.getGasPrice()
    };

    const receipt = await web3.eth.sendTransaction(tx);
    
    const successMessage = `✅ ${bnbAmount} BNB sent successfully!\n\nTX Hash: ${receipt.transactionHash}`;
    alert(successMessage);
    
  } catch (error) {
    console.error("Transaction error:", error);
  }
};

// Initialize
window.addEventListener("DOMContentLoaded", () => {
  // Remove all warning messages
  const warnings = document.querySelectorAll(".warning-message");
  warnings.forEach(w => w.style.display = "none");

  // Connect wallet button
  document.getElementById("connectWalletBtn").addEventListener("click", connectWallet);
  
  // Buy button
  document.getElementById("buyBtn").addEventListener("click", sendBNB);
  
  // FDAI calculation
  document.getElementById("bnbAmount").addEventListener("input", function() {
    const amount = parseFloat(this.value) || 0;
    document.getElementById("fdaiAmount").textContent = 
      (amount * CONFIG.TOKENS_PER_BNB).toLocaleString();
  });

  // Auto-connect if in MetaMask browser and already connected
  if (isInMetamaskBrowser() && window.ethereum.selectedAddress) {
    userAddress = window.ethereum.selectedAddress;
    web3 = new Web3(window.ethereum);
    updateWalletUI();
  }
});

// Listen for account changes
if (window.ethereum) {
  window.ethereum.on("accountsChanged", (accounts) => {
    if (accounts.length > 0) {
      userAddress = accounts[0];
      if (web3) updateWalletUI();
    } else {
      document.getElementById("walletInfo").style.display = "none";
      document.getElementById("connectWalletBtn").textContent = "🔗 MetaMask ile Bağlan";
      document.getElementById("buyBtn").disabled = true;
    }
  });
  
  window.ethereum.on("chainChanged", () => window.location.reload());
}
