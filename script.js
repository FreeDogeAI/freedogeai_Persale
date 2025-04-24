// script.js let provider, signer, userAddress; const CONTRACT_ADDRESS = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7"; const TOKEN_PRICE = 12500000; const MIN_BNB = 0.035;

// Connect MetaMask async function connectMetaMask() { if (window.ethereum) { provider = new ethers.providers.Web3Provider(window.ethereum); await provider.send("eth_requestAccounts", []); signer = provider.getSigner(); userAddress = await signer.getAddress(); updateWalletInfo(); } else { alert("MetaMask not found!"); } }

// Connect Trust Wallet (via deep link + sign) function connectTrustWallet() { const dappUrl = encodeURIComponent(window.location.href); window.location.href = https://link.trustwallet.com/open_url?coin_id=60&url=${dappUrl}; }

// Update wallet info async function updateWalletInfo() { document.getElementById("walletAddress").textContent = Connected: ${userAddress}; const balance = await provider.getBalance(userAddress); const bnb = parseFloat(ethers.utils.formatEther(balance)); document.getElementById("walletBalance").textContent = BNB Balance: ${bnb.toFixed(4)} BNB;

document.getElementById("bnbAmount").addEventListener("input", () => { const bnbInput = parseFloat(document.getElementById("bnbAmount").value); const amount = isNaN(bnbInput) ? 0 : bnbInput * TOKEN_PRICE; document.getElementById("fdaiAmount").textContent = ${amount.toLocaleString()} FDAI; document.getElementById("buyButton").disabled = bnbInput < MIN_BNB; }); }

// Buy Tokens async function buyTokens() { try { const bnbAmount = parseFloat(document.getElementById("bnbAmount").value); if (isNaN(bnbAmount) || bnbAmount < MIN_BNB) { alert(Minimum buy is ${MIN_BNB} BNB); return; } const tx = await signer.sendTransaction({ to: CONTRACT_ADDRESS, value: ethers.utils.parseEther(bnbAmount.toString()) }); await tx.wait(); alert("Token purchase successful!"); } catch (err) { alert("Transaction failed: " + err.message); } }

// Language switching const translations = { en: { title: "FreeDogeAI Token Presale", buy: "Buy Tokens" }, tr: { title: "FreeDogeAI Token Ön Satışı", buy: "Token Satın Al" }, ar: { title: "عرض ما قبل البيع FreeDogeAI", buy: "شراء الرموز" }, ru: { title: "Предпродажа токена FreeDogeAI", buy: "Купить токены" }, zh: { title: "FreeDogeAI 代币预售", buy: "购买代币" } };

document.getElementById("language-select").addEventListener("change", () => { const lang = document.getElementById("language-select").value; document.getElementById("title").textContent = translations[lang].title; document.getElementById("buyButton").textContent = translations[lang].buy; });

// Event bindings window.onload = () => { document.getElementById("connectMetaMask").onclick = connectMetaMask; document.getElementById("connectTrustWallet").onclick = connectTrustWallet; document.getElementById("buyButton").onclick = buyTokens; };

