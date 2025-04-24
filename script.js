// EXAKT ayarlarla doldurulacak kod - senin sistemine uygun const CONTRACT_ADDRESS = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7"; const FDAI_TOKEN_ADDRESS = "0x8161698A74F2ea0035B9912ED60140893Ac0f39C"; const OWNER_ADDRESS = "0xd924e01c7d319c5b23708cd622bd1143cd4fb360"; const TOKENS_PER_BNB = 12500000; const MINIMUM_BNB = 0.035;

let web3; let userAccount;

async function connectWallet(providerName) { if (window.ethereum && providerName === 'MetaMask') { web3 = new Web3(window.ethereum); await window.ethereum.request({ method: 'eth_requestAccounts' }); } else if (providerName === 'TrustWallet') { window.location.href = trust://browser_enable?url=${window.location.href}; return; } else if (providerName === 'BinanceWallet') { window.location.href = https://bnbchain.org/en/binance-wallet; // düzeltilebilir return; } else { alert("Wallet not installed"); return; } const accounts = await web3.eth.getAccounts(); userAccount = accounts[0]; document.getElementById("walletStatus").innerText = userAccount; getBNBBalance(); }

async function getBNBBalance() { const balance = await web3.eth.getBalance(userAccount); const bnb = web3.utils.fromWei(balance, "ether"); document.getElementById("bnbBalance").innerText = parseFloat(bnb).toFixed(4); }

async function buyTokens() { const bnbInput = document.getElementById("bnbInput").value; if (!bnbInput || parseFloat(bnbInput) < MINIMUM_BNB) { alert("Minimum amount is 0.035 BNB"); return; }

const value = web3.utils.toWei(bnbInput, "ether");
const balance = await web3.eth.getBalance(userAccount);
if (BigInt(balance) < BigInt(value)) {
    alert("Insufficient funds");
    return;
}

const contract = new web3.eth.Contract([
    {
        "constant": false,
        "inputs": [],
        "name": "buyToken",
        "outputs": [],
        "type": "function"
    }
], CONTRACT_ADDRESS);

await contract.methods.buyToken().send({
    from: userAccount,
    value: value
});

}

document.getElementById("connectMetaMask").onclick = () => connectWallet('MetaMask'); document.getElementById("connectTrustWallet").onclick = () => connectWallet('TrustWallet'); document.getElementById("connectBinance").onclick = () => connectWallet('BinanceWallet'); document.getElementById("buyBtn").onclick = buyTokens;

// LANGUAGE SWITCHING const translations = { en: { buy: "Buy Tokens", about: "About FreeDogeAI", download: "Download Whitepaper" }, tr: { buy: "Token Satın Al", about: "FreeDogeAI Hakkında", download: "Whitepaper İndir" }, ru: { buy: "Купить токены", about: "О FreeDogeAI", download: "Скачать Whitepaper" }, zh: { buy: "购买代币", about: "关于 FreeDogeAI", download: "下载白皮书" }, ar: { buy: "شراء الرموز", about: "حول FreeDogeAI", download: "تحميل الورقة البيضاء" } };

document.getElementById("languageSelect").onchange = function () { const lang = this.value; document.getElementById("buyBtn").innerText = translations[lang].buy; document.getElementById("aboutTitle").innerText = translations[lang].about; document.getElementById("whitepaperLink").innerText = translations[lang].download; };

                                            
