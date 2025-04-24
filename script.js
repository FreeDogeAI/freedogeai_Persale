// FreeDogeAI Script.js - Tam Sürüm

// WalletConnect ve Web3Modal v2 entegrasyonu
let web3;
let connectedWallet = null;
let minBNB = 0.035;

const walletButtons = {
  metamask: document.getElementById('connectMetaMask'),
  trustwallet: document.getElementById('connectTrustWallet'),
  binancewallet: document.getElementById('connectBinanceWallet')
};

async function connectWallet(providerName) {
  if (window.ethereum && providerName === 'metamask') {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      web3 = new Web3(window.ethereum);
      connectedWallet = accounts[0];
      updateUIAfterConnect();
    } catch (err) {
      alert("MetaMask connection failed: " + err.message);
    }
  } else if (providerName === 'trustwallet') {
    window.location.href = `trust://browser_enable?url=${encodeURIComponent(window.location.href)}`;
  } else if (providerName === 'binancewallet') {
    window.location.href = `https://bnbchain.org/wallet-connect?redirect=${encodeURIComponent(window.location.href)}`;
  } else {
    alert("Wallet not installed");
  }
}

function updateUIAfterConnect() {
  document.getElementById("walletStatus").textContent = "Wallet Connected: " + connectedWallet;
  web3.eth.getBalance(connectedWallet).then(balance => {
    const bnb = web3.utils.fromWei(balance, 'ether');
    document.getElementById("bnbBalance").textContent = "BNB Balance: " + parseFloat(bnb).toFixed(4);
  });
}

// Token hesaplama ve kontrol
document.getElementById("buyBtn").addEventListener("click", async () => {
  const bnbAmount = parseFloat(document.getElementById("bnbInput").value);
  if (!connectedWallet || !web3) return alert("Connect a wallet first.");
  if (isNaN(bnbAmount) || bnbAmount < minBNB) return alert("Minimum 0.035 BNB required.");
  const balance = await web3.eth.getBalance(connectedWallet);
  if (parseFloat(web3.utils.fromWei(balance, 'ether')) < bnbAmount) return alert("Insufficient funds.");

  // Token satın alma işlemi
  try {
    const tx = await web3.eth.sendTransaction({
      from: connectedWallet,
      to: "0xd924e01c7d319c5b23708cd622bd1143cd4fb360", // Ali'nin BNB cüzdan adresi
      value: web3.utils.toWei(bnbAmount.toString(), 'ether')
    });

    alert("Purchase complete. TX Hash: " + tx.transactionHash);
  } catch (error) {
    alert("Transaction failed: " + error.message);
  }
});

// Çoklu dil sistemi (basit sürüm)
const translations = {
  en: {
    connect: "Connect Wallet",
    buy: "Buy Tokens",
    about: "About FreeDogeAI",
    errorFunds: "Insufficient funds",
    errorMin: "Minimum 0.035 BNB required"
  },
  tr: {
    connect: "Cüzdan Bağla",
    buy: "Token Satın Al",
    about: "Hakkında FreeDogeAI",
    errorFunds: "Yetersiz bakiye",
    errorMin: "Minimum 0.035 BNB gerekli"
  },
  zh: { connect: "连接钱包", buy: "购买代币", about: "关于FreeDogeAI", errorFunds: "资金不足", errorMin: "最低0.035 BNB" },
  ru: { connect: "Подключить кошелек", buy: "Купить токены", about: "О FreeDogeAI", errorFunds: "Недостаточно средств", errorMin: "Мин. 0.035 BNB" },
  ar: { connect: "ربط المحفظة", buy: "شراء الرموز", about: "حول FreeDogeAI", errorFunds: "رصيد غير كافي", errorMin: "الحد الأدنى 0.035 BNB" }
};

document.getElementById("language").addEventListener("change", function () {
  const lang = this.value;
  document.getElementById("connectMetaMask").textContent = translations[lang].connect + " (MetaMask)";
  document.getElementById("connectTrustWallet").textContent = translations[lang].connect + " (TrustWallet)";
  document.getElementById("connectBinanceWallet").textContent = translations[lang].connect + " (Binance)";
  document.getElementById("buyBtn").textContent = translations[lang].buy;
  document.getElementById("aboutTitle").textContent = translations[lang].about;
});
