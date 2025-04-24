// ========== Wallet Connection ========== //
let provider;
let selectedAddress = "";
const CONTRACT_ADDRESS = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7";
const TOKEN_PRICE = 12500000; // 1 BNB = 12,500,000 FDAI
const MIN_BNB = 0.015;

const connectMetaMask = async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      provider = new ethers.providers.Web3Provider(window.ethereum);
      selectedAddress = accounts[0];
      updateWalletInfo();
    } catch (err) {
      alert("Connection to MetaMask failed.");
    }
  } else {
    alert("MetaMask not installed");
  }
};

const connectTrustWallet = () => {
  window.location.href = `https://link.trustwallet.com/open_url?coin_id=60&url=${encodeURIComponent(window.location.href)}`;
};

const connectBinanceWallet = () => {
  window.location.href = "https://dapp.bnbchain.org"; // Placeholder, must be replaced with real URL
};

const updateWalletInfo = async () => {
  document.getElementById("wallet-address").innerText = selectedAddress;
  const balance = await provider.getBalance(selectedAddress);
  const bnb = ethers.utils.formatEther(balance);
  document.getElementById("wallet-balance").innerText = parseFloat(bnb).toFixed(4) + " BNB";
};

// ========== Buy Token ========== //
const buyTokens = async () => {
  const inputBNB = parseFloat(document.getElementById("bnb-amount").value);
  if (!selectedAddress) {
    alert("Connect wallet first!");
    return;
  }
  if (isNaN(inputBNB) || inputBNB < MIN_BNB) {
    alert(`Minimum buy: ${MIN_BNB} BNB`);
    return;
  }

  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, [
    "function buy() public payable"
  ], signer);

  try {
    const tx = await contract.buy({ value: ethers.utils.parseEther(inputBNB.toString()) });
    await tx.wait();
    alert(`Purchased ${inputBNB * TOKEN_PRICE} FDAI`);
  } catch (err) {
    alert("Transaction failed: " + err.message);
  }
};

// ========== Language ========== //
const translations = {
  en: {
    connectMetaMask: "Connect with MetaMask",
    connectTrust: "Connect with TrustWallet",
    connectBinance: "Connect with Binance Wallet",
    buyTokens: "Buy Tokens",
    about: "About FreeDogeAI"
  },
  tr: {
    connectMetaMask: "MetaMask ile Bağlan",
    connectTrust: "TrustWallet ile Bağlan",
    connectBinance: "Binance Cüzdan ile Bağlan",
    buyTokens: "Token Satın Al",
    about: "FreeDogeAI Hakkında"
  }
};

function setLang(lang) {
  document.getElementById("btn-metamask").innerText = translations[lang].connectMetaMask;
  document.getElementById("btn-trust").innerText = translations[lang].connectTrust;
  document.getElementById("btn-binance").innerText = translations[lang].connectBinance;
  document.getElementById("btn-buy").innerText = translations[lang].buyTokens;
  document.getElementById("about-title").innerText = translations[lang].about;
}
