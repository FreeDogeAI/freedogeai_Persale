let web3; const TOKENS_PER_BNB = 12500000; // 1 BNB = 12.5M FDAI

const connectBtn = document.getElementById("connectBtn"); const walletAddress = document.getElementById("walletAddress"); const bnbAmountInput = document.getElementById("bnbAmount"); const tokenAmount = document.getElementById("tokenAmount"); const buyBtn = document.getElementById("buyBtn");

// WalletConnect Modal const modal = window.web3modal.default();

// Auto popup wallet list and connect connectBtn.addEventListener("click", async () => { try { const instance = await modal.connect(); web3 = new Web3(instance); const accounts = await web3.eth.getAccounts(); walletAddress.textContent = Connected: ${accounts[0]}; } catch (err) { walletAddress.textContent = "Wallet connection failed."; } });

// Calculate Token Amount bnbAmountInput.addEventListener("input", () => { const bnb = parseFloat(bnbAmountInput.value); if (!isNaN(bnb) && bnb > 0) { tokenAmount.textContent = ${bnb * TOKENS_PER_BNB} FDAI; } else { tokenAmount.textContent = "0 FDAI"; } });

// Buy button dummy function (you will replace with actual contract interaction) buyBtn.addEventListener("click", () => { alert("Buy function coming soon!"); });

// Language Switcher const languageSelect = document.getElementById("languageSelect"); languageSelect.addEventListener("change", () => { const selectedLang = languageSelect.value; const translations = LANGUAGES[selectedLang]; document.querySelectorAll("[data-translate]").forEach(el => { const key = el.getAttribute("data-translate"); if (translations[key]) { el.textContent = translations[key]; } }); });

