// Constants
const RECEIVE_WALLET = "0xd924e01c7d319c5b23708cd622bd1143cd4fb360";
const TOKENS_PER_BNB = 120000000000;
let web3;
let userAddress = "";

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
  await initWalletConnection();
  setupEventListeners();
});

// Initialize wallet connection
async function initWalletConnection() {
  if (window.ethereum) {
    try {
      // Check if already connected
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      
      if (accounts.length > 0) {
        await handleConnectedWallet(accounts[0]);
        return;
      }
      
      // Auto-connect if not connected
      await connectWallet();
    } catch (error) {
      console.error("Initial connection error:", error);
    }
  } else {
    console.log("Wallet extension not detected");
  }
}

// Connect wallet automatically
async function connectWallet() {
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    userAddress = accounts[0];
    web3 = new Web3(window.ethereum);
    
    await switchToBSCNetwork();
    await updateWalletInfo();
  } catch (error) {
    console.error("Wallet connection failed:", error);
  }
}

// Switch to BSC network
async function switchToBSCNetwork() {
  try {
    const chainId = await web3.eth.getChainId();
    if (chainId !== 56) {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x38' }] // BSC Mainnet
      });
    }
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x38',
            chainName: 'Binance Smart Chain',
            nativeCurrency: {
              name: 'BNB',
              symbol: 'BNB',
              decimals: 18
            },
            rpcUrls: ['https://bsc-dataseed.binance.org/'],
            blockExplorerUrls: ['https://bscscan.com/']
          }]
        });
      } catch (addError) {
        console.error("Failed to add BSC network:", addError);
      }
    }
  }
}

// Update wallet info in UI
async function updateWalletInfo() {
  if (!userAddress) return;

  try {
    const balance = await web3.eth.getBalance(userAddress);
    const bnbBalance = web3.utils.fromWei(balance, 'ether');
    
    document.getElementById('walletAddress').textContent = userAddress;
    document.getElementById('userTokenAddress').textContent = userAddress;
    document.getElementById('bnbBalance').textContent = `${parseFloat(bnbBalance).toFixed(4)} BNB`;
    document.getElementById('walletInfo').style.display = 'block';
    document.getElementById('buyBtn').disabled = false;
  } catch (error) {
    console.error("Failed to update wallet info:", error);
  }
}

// Handle BNB to FDAI calculation
function setupEventListeners() {
  document.getElementById('bnbAmount').addEventListener('input', function() {
    const amount = parseFloat(this.value) || 0;
    document.getElementById('fdaiAmount').textContent = (amount * TOKENS_PER_BNB).toLocaleString();
  });

  document.getElementById('buyBtn').addEventListener('click', sendTransaction);
}

// Send BNB transaction
async function sendTransaction() {
  const bnbAmount = parseFloat(document.getElementById('bnbAmount').value);
  
  if (!bnbAmount || bnbAmount <= 0) {
    alert("Please enter a valid BNB amount!");
    return;
  }

  try {
    const weiAmount = web3.utils.toWei(bnbAmount.toString(), 'ether');
    
    const tx = {
      from: userAddress,
      to: RECEIVE_WALLET,
      value: weiAmount,
      gas: 300000,
      gasPrice: await web3.eth.getGasPrice()
    };

    const receipt = await web3.eth.sendTransaction(tx);
    showTransactionSuccess(bnbAmount, receipt.transactionHash);
  } catch (error) {
    console.error("Transaction failed:", error);
    alert(`Transaction failed: ${error.message}`);
  }
}

// Show success message
function showTransactionSuccess(amount, txHash) {
  const tokenAmount = amount * TOKENS_PER_BNB;
  const message = `
    ✅ ${amount} BNB sent successfully!
    
    Receiver Address: ${RECEIVE_WALLET}
    Your FDAI Address: ${userAddress}
    You will receive: ${tokenAmount.toLocaleString()} FDAI
    Transaction Hash: ${txHash}
    
    Tokens will be manually distributed within 24 hours.
  `;
  alert(message);
}

// Handle wallet changes
if (window.ethereum) {
  window.ethereum.on('accountsChanged', (accounts) => {
    if (accounts.length > 0) {
      handleConnectedWallet(accounts[0]);
    } else {
      resetWalletConnection();
      setTimeout(initWalletConnection, 1000);
    }
  });

  window.ethereum.on('chainChanged', () => window.location.reload());
}

// Helper functions
async function handleConnectedWallet(account) {
  userAddress = account;
  web3 = new Web3(window.ethereum);
  await updateWalletInfo();
}

function resetWalletConnection() {
  document.getElementById('walletInfo').style.display = 'none';
  document.getElementById('buyBtn').disabled = true;
  userAddress = "";
}
