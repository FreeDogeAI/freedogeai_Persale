let web3;
const TOKENS_PER_BNB = 12500000;
let provider;

const connectBtn = document.getElementById("connectBtn");
const walletAddress = document.getElementById("walletAddress");
const bnbAmountInput = document.getElementById("bnbAmount");
const tokenAmount = document.getElementById("tokenAmount");
const buyBtn = document.getElementById("buyBtn");

connectBtn.addEventListener("click", async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      walletAddress.textContent = `Connected: ${accounts[0]}`;
    } catch (err) {
      walletAddress.textContent = "Connection failed.";
    }
  } else {
    provider = new WalletConnectProvider.default({
      rpc: {
        56: "https://bsc-dataseed.binance.org/"
      },
      chainId: 56
    });

    try {
      await provider.enable();
      web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      walletAddress.textContent = `Connected: ${accounts[0]}`;
    } catch (err) {
      walletAddress.textContent = "WalletConnect failed.";
    }
  }
});

bnbAmountInput.addEventListener("input", () => {
  const bnb = parseFloat(bnbAmountInput.value);
  tokenAmount.textContent = (!isNaN(bnb) && bnb > 0) ? `${bnb * TOKENS_PER_BNB} FDAI` : "0 FDAI";
});

buyBtn.addEventListener("click", () => {
  alert("Buy functionality coming soon.");
});

const languageSelect = document.getElementById("languageSelect");
languageSelect.addEventListener("change", () => {
  const selectedLang = languageSelect.value;
  const translations = LANGUAGES[selectedLang];
  document.querySelectorAll("[data-translate]").forEach(el => {
    const key = el.getAttribute("data-translate");
    if (translations[key]) {
      el.textContent = translations[key];
    }
  });
});
