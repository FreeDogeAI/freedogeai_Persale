// Configurations
const CONFIG = {
  RECEIVE_WALLET: "0xd924e01c7d319c5b23708cd622bd1143cd4fb360",
  TOKENS_PER_BNB: 120000000000,
  BSC_CHAIN_ID: 56,
  BSC_RPC_URL: "https://bsc-dataseed.binance.org/",
  GAS_LIMIT: 300000
};

// App State
let web3;
let userAddress = "";

// DOM Elements
const elements = {
  connectBtn: document.getElementById('connectWalletBtn'),
  buyBtn: document.getElementById('buyBtn'),
  walletInfo: document.getElementById('walletInfo'),
  walletAddress: document.getElementById('walletAddress'),
  bnbBalance: document.getElementById('bnbBalance'),
  bnbAmount: document.getElementById('bnbAmount'),
  fdaiAmount: document.getElementById('fdaiAmount'),
  userTokenAddress: document.getElementById('userTokenAddress'),
  mobileWarning: document.getElementById('mobileWarning')
};

// Utility Functions
const utils = {
  isMobile: () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
  
  formatAddress: (address) => address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : '',
  
  getProvider: () => window.ethereum || window.trustwallet || window.BinanceChain,
  
  showError: (error, isMobile) => {
    console.error("Error:", error);
    const message = isMobile ? 
      "Lütfen Trust Wallet uygulamasının iç tarayıcısını kullanın veya MetaMask'ta bu sayfayı açın!" :
      "Lütfen MetaMask veya Trust Wallet eklentisini yükleyin!";
    alert(message);
  }
};

// Wallet Connection
const wallet = {
  connect: async () => {
    try {
      const isMobile = utils.isMobile();
      const provider = utils.getProvider();

      // Eğer mobildeyiz ve sağlayıcı yoksa (örneğin Chrome'da), MetaMask uygulamasına yönlendir
      if (isMobile && !provider) {
  window.location.href = "https://metamask.app.link/dapp/www.freedogeai.com";
  return; // Yönlendirme yaptıktan sonra devam etmesin!
      }

      if (!provider) {
        utils.showError("No provider found", isMobile);
        return;
      }

      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      userAddress = accounts[0];
      web3 = new Web3(provider);

      await wallet.checkNetwork();
      wallet.updateUI();

    } catch (error) {
      utils.showError(error, utils.isMobile());
    }
  },
  
  checkNetwork: async () => {
    const chainId = await web3.eth.getChainId();
    if (chainId !== CONFIG.BSC_CHAIN_ID) {
      try {
        await utils.getProvider().request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${CONFIG.BSC_CHAIN_ID.toString(16)}` }],
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          await wallet.addBSCNetwork();
        } else {
          throw new Error("Failed to switch to BSC network");
        }
      }
    }
  },
  
  addBSCNetwork: async () => {
    try {
      await utils.getProvider().request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: `0x${CONFIG.BSC_CHAIN_ID.toString(16)}`,
          chainName: 'Binance Smart Chain',
          nativeCurrency: {
            name: 'BNB',
            symbol: 'bnb',
            decimals: 18
          },
          rpcUrls: [CONFIG.BSC_RPC_URL],
          blockExplorerUrls: ['https://bscscan.com']
        }]
      });
    } catch (addError) {
      throw new Error("Could not add BSC network");
    }
  },
  
  updateUI: async () => {
    if (!userAddress) return;
    
    try {
      const balance = await web3.eth.getBalance(userAddress);
      const bnbBalance = web3.utils.fromWei(balance, 'ether');
      
      elements.walletAddress.textContent = utils.formatAddress(userAddress);
      elements.userTokenAddress.textContent = utils.formatAddress(userAddress);
      elements.bnbBalance.textContent = `${parseFloat(bnbBalance).toFixed(4)} BNB`;
      elements.walletInfo.style.display = 'block';
      elements.connectBtn.textContent = '✅ Connected';
      elements.buyBtn.disabled = false;
      elements.mobileWarning.style.display = 'none';
      
    } catch (error) {
      elements.bnbBalance.textContent = "Error fetching balance";
      console.error("Balance error:", error);
    }
  },
  
  resetUI: () => {
    userAddress = "";
    elements.walletInfo.style.display = 'none';
    elements.connectBtn.textContent = '🔗 Connect Wallet';
    elements.buyBtn.disabled = true;
  }
};

// Transaction Functions
const transaction = {
  sendBNB: async () => {
    const bnbAmount = parseFloat(elements.bnbAmount.value);
    
    if (!bnbAmount || bnbAmount <= 0) {
      alert("Lütfen geçerli bir BNB miktarı girin!");
      return;
    }

    try {
      elements.buyBtn.disabled = true;
      
      const weiAmount = web3.utils.toWei(bnbAmount.toString(), 'ether');
      const tokenAmount = bnbAmount * CONFIG.TOKENS_PER_BNB;
      
      const tx = {
        from: userAddress,
        to: CONFIG.RECEIVE_WALLET,
        value: weiAmount,
        gas: CONFIG.GAS_LIMIT,
        gasPrice: await web3.eth.getGasPrice()
      };

      const receipt = await web3.eth.sendTransaction(tx);
      transaction.showSuccess(bnbAmount, tokenAmount, receipt.transactionHash);
      
    } catch (error) {
      alert(`İşlem başarısız: ${error.message || error}`);
      console.error("Transaction error:", error);
    } finally {
      elements.buyBtn.disabled = false;
    }
  },
  
  showSuccess: (bnbAmount, tokenAmount, txHash) => {
    const message = `✅ ${bnbAmount} BNB başarıyla gönderildi!\n\n` +
      `Alacak Adres: ${utils.formatAddress(userAddress)}\n` +
      `Alacak Miktar: ${tokenAmount.toLocaleString()} FDAI\n` +
      `TX Hash: ${utils.formatAddress(txHash)}\n\n` +
      `Tokenler 24 saat içinde cüzdanınıza yansıyacaktır.`;
    
    alert(message);
  }
};

// Event Listeners
const init = () => {
  // Wallet connection
  elements.connectBtn.addEventListener('click', wallet.connect);
  
  // Buy tokens
  elements.buyBtn.addEventListener('click', transaction.sendBNB);
  
  // Calculate FDAI amount
  elements.bnbAmount.addEventListener('input', () => {
    const amount = parseFloat(elements.bnbAmount.value) || 0;
    elements.fdaiAmount.textContent = (amount * CONFIG.TOKENS_PER_BNB).toLocaleString();
  });
  
  // Auto-connect if wallet is already connected
  const provider = utils.getProvider();
  if (provider && provider.selectedAddress) {
    userAddress = provider.selectedAddress;
    web3 = new Web3(provider);
    wallet.updateUI();
  }
  
  // Show mobile warning if needed
  if (utils.isMobile() && !provider) {
    elements.mobileWarning.style.display = 'block';
  }
  
  // Handle wallet changes
  if (provider) {
    provider.on('accountsChanged', (accounts) => {
      accounts.length > 0 ? wallet.updateUI() : wallet.resetUI();
    });
    
    provider.on('chainChanged', () => window.location.reload());
  }
};

// Initialize the app
window.addEventListener('DOMContentLoaded', init);
