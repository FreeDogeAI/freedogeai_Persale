// Config
const CONFIG = {
  BNB_RECEIVER: "0xd924e01c7d319c5b23708cd622bd1143cd4fb360",
  TOKEN_CONTRACT: "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7",
  TOKEN_PRICE: 12500000, // 1 BNB = 12.5M FDAI
  MIN_BNB: 0.035,
  CHAIN_ID: 56 // BSC Mainnet
};

// State
let provider, signer, userAddress;

// Translations
const TRANSLATIONS = {
  en: {
    title: "FreeDogeAI Token Presale",
    connectMetaMask: "Connect MetaMask",
    connectTrustWallet: "Connect TrustWallet",
    walletNotConnected: "Wallet not connected",
    buyButton: "Buy Tokens",
    aboutTitle: "About FreeDogeAI",
    aboutText: "FreeDogeAI is revolutionizing the meme coin space with AI-powered utilities. Join our presale to get early access to tokens at the best price!",
    communityText: "Join our community:",
    insufficientFunds: "Insufficient BNB balance",
    wrongNetwork: "Please switch to Binance Smart Chain"
  },
  zh: {
    title: "FreeDogeAI代币预售",
    connectMetaMask: "连接MetaMask",
    connectTrustWallet: "连接TrustWallet",
    walletNotConnected: "钱包未连接",
    buyButton: "购买代币",
    aboutTitle: "关于FreeDogeAI",
    aboutText: "FreeDogeAI正在通过人工智能驱动的实用程序彻底改变模因币领域。加入我们的预售，以最佳价格早期获取代币！",
    communityText: "加入我们的社区：",
    insufficientFunds: "BNB余额不足",
    wrongNetwork: "请切换到币安智能链"
  },
  tr: {
    title: "FreeDogeAI Token Ön Satış",
    connectMetaMask: "MetaMask'e Bağlan",
    connectTrustWallet: "TrustWallet'e Bağlan",
    walletNotConnected: "Cüzdan bağlı değil",
    buyButton: "Token Satın Al",
    aboutTitle: "FreeDogeAI Hakkında",
    aboutText: "FreeDogeAI, AI destekli özellikleriyle meme coin alanında devrim yapıyor. En iyi fiyattan token almak için ön satışımıza katılın!",
    communityText: "Topluluğumuza katılın:",
    insufficientFunds: "Yetersiz BNB bakiyesi",
    wrongNetwork: "Lütfen Binance Smart Chain'a geçin"
  }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initEventListeners();
  updateLanguage('en');
});

// Language switcher
function updateLanguage(lang) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  document.getElementById('title').textContent = t.title;
  document.getElementById('connectMetaMask').innerHTML = `<i class="fab fa-ethereum"></i> ${t.connectMetaMask}`;
  document.getElementById('connectTrustWallet').innerHTML = `<i class="fas fa-wallet"></i> ${t.connectTrustWallet}`;
  document.getElementById('buyButton').innerHTML = `<i class="fas fa-shopping-cart"></i> ${t.buyButton}`;
  document.getElementById('aboutTitle').textContent = t.aboutTitle;
  document.getElementById('aboutText').textContent = t.aboutText;
  document.getElementById('communityText').textContent = t.communityText;
}

// MetaMask Connection
async function connectMetaMask() {
  try {
    if (!window.ethereum) {
      if (/mobile/i.test(navigator.userAgent)) {
        window.location.href = `https://metamask.app.link/dapp/${encodeURIComponent(window.location.href)}`;
      } else {
        window.open('https://metamask.io/download.html', '_blank');
      }
      return;
    }

    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();
    
    const network = await provider.getNetwork();
    if (network.chainId !== CONFIG.CHAIN_ID) {
      alert(TRANSLATIONS[document.getElementById('languageSelect').value]?.wrongNetwork || "Wrong network");
      return;
    }
    
    updateWalletInfo();
  } catch (error) {
    showError(error.message);
  }
}

// TrustWallet Connection
async function connectTrustWallet() {
  try {
    if (!window.ethereum) {
      window.location.href = `https://link.trustwallet.com/open_url?coin_id=20000714&url=${encodeURIComponent(window.location.href)}`;
      return;
    }
    await connectMetaMask(); // TrustWallet also injects window.ethereum
  } catch (error) {
    showError(error.message);
  }
}

// Update wallet info
async function updateWalletInfo() {
  const balance = await provider.getBalance(userAddress);
  const bnbBalance = ethers.utils.formatEther(balance);
  
  document.getElementById('walletAddress').textContent = `Connected: ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
  document.getElementById('bnbBalance').textContent = `BNB Balance: ${parseFloat(bnbBalance).toFixed(4)}`;
  
  document.getElementById('bnbAmount').addEventListener('input', (e) => {
    const bnb = parseFloat(e.target.value);
    if (isNaN(bnb)) {
      document.getElementById('fdaiAmount').textContent = '0 FDAI';
      document.getElementById('buyButton').disabled = true;
      return;
    }
    
    const tokens = bnb * CONFIG.TOKEN_PRICE;
    document.getElementById('fdaiAmount').textContent = `${tokens.toLocaleString()} FDAI`;
    document.getElementById('buyButton').disabled = bnb < CONFIG.MIN_BNB || bnb > parseFloat(bnbBalance);
    
    if (bnb > parseFloat(bnbBalance)) {
      showError(TRANSLATIONS[document.getElementById('languageSelect').value]?.insufficientFunds || "Insufficient funds");
    } else {
      clearError();
    }
  });
}

// Buy tokens
async function buyTokens() {
  try {
    const bnbAmount = parseFloat(document.getElementById('bnbAmount').value);
    if (bnbAmount < CONFIG.MIN_BNB) {
      alert(`Minimum purchase is ${CONFIG.MIN_BNB} BNB`);
      return;
    }

    const tx = await signer.sendTransaction({
      to: CONFIG.BNB_RECEIVER,
      value: ethers.utils.parseEther(bnbAmount.toString())
    });
    
    alert(`Transaction sent! TX Hash: ${tx.hash}`);
  } catch (error) {
    showError(error.message);
  }
}

// Helpers
function initEventListeners() {
  document.getElementById('connectMetaMask').addEventListener('click', connectMetaMask);
  document.getElementById('connectTrustWallet').addEventListener('click', connectTrustWallet);
  document.getElementById('buyButton').addEventListener('click', buyTokens);
  document.getElementById('languageSelect').addEventListener('change', (e) => updateLanguage(e.target.value));
}

function showError(message) {
  document.getElementById('errorMessage').textContent = message;
}

function clearError() {
  document.getElementById('errorMessage').textContent = '';
}
