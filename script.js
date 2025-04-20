let web3; const TOKENS_PER_BNB = 12500000;

const connectBtn = document.getElementById("connectBtn"); const walletAddress = document.getElementById("walletAddress"); const bnbAmountInput = document.getElementById("bnbAmount"); const tokenAmount = document.getElementById("tokenAmount"); const buyBtn = document.getElementById("buyBtn");

// Setup Web3Modal const providerOptions = { walletconnect: { package: window.WalletConnectProvider.default, options: { rpc: { 56: "https://bsc-dataseed.binance.org/" }, chainId: 56 } } };

const web3Modal = new window.Web3Modal.default({ cacheProvider: false, providerOptions, theme: "dark" });

let provider;

connectBtn.addEventListener("click", async () => { try { provider = await web3Modal.connect(); web3 = new Web3(provider); const accounts = await web3.eth.getAccounts(); walletAddress.textContent = Connected: ${accounts[0]}; } catch (error) { console.error("Connection failed:", error); walletAddress.textContent = "Wallet connection failed."; } });

bnbAmountInput.addEventListener("input", () => { const bnb = parseFloat(bnbAmountInput.value); tokenAmount.textContent = (!isNaN(bnb) && bnb > 0) ? ${bnb * TOKENS_PER_BNB} FDAI : "0 FDAI"; });

buyBtn.addEventListener("click", () => { alert("Buy functionality coming soon."); });

const languageSelect = document.getElementById("languageSelect"); languageSelect.addEventListener("change", () => { const selectedLang = languageSelect.value; const translations = LANGUAGES[selectedLang]; document.querySelectorAll("[data-translate]").forEach(el => { const key = el.getAttribute("data-translate"); if (translations[key]) { el.textContent = translations[key]; } }); });

  
