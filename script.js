// script.js — Deeplink Wallet Launch + Presale Info

// Token & Wallet Config let web3; let userAddress = ""; const TOKEN_DROP_ADDRESS = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7"; const MINIMUM_BNB = 0.035; const TOKENS_PER_BNB = 12500000;

// Open wallet via deeplink function openWallet(app) { const siteURL = encodeURIComponent("https://freedogeai.github.io"); if (app === 'metamask') { window.location.href = https://metamask.app.link/dapp/${siteURL}; } else if (app === 'trust') { window.location.href = https://link.trustwallet.com/open_url?coin_id=20000714&url=${siteURL}; } }

// Presale values rendering window.addEventListener("DOMContentLoaded", () => { document.getElementById("rateInfo").textContent = 1 BNB = ${TOKENS_PER_BNB.toLocaleString()} FDAI; document.getElementById("minBuy").textContent = Minimum Buy: ${MINIMUM_BNB} BNB; document.getElementById("supply").textContent = Total Supply: 125,000,000,000,000 FDAI; });

