// script.js - Tam Entegre Cüzdan, Satın Alma ve Dil Sistemi let provider, signer, userAddress; const CONTRACT_ADDRESS = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7"; const TOKEN_PRICE = 12500000; const MIN_BNB = 0.035;

async function connectMetaMask() { if (window.ethereum) { provider = new ethers.providers.Web3Provider(window.ethereum); await provider.send("eth_requestAccounts", []); signer = provider.getSigner(); userAddress = await signer.getAddress(); updateWalletInfo(); } else { alert("MetaMask not installed."); } }

function connectTrustWallet() { const dappUrl = encodeURIComponent(window.location.href); window.location.href = https://link.trustwallet.com/open_url?coin_id=60&url=${dappUrl}; }

async function updateWalletInfo() { document.getElementById("walletAddress").textContent = Connected: ${userAddress}; const balance = await provider.getBalance(userAddress); const bnb = parseFloat(ethers.utils.formatEther(balance)); document.getElementById("walletBalance").textContent = BNB: ${bnb.toFixed(4)};

document.getElementById("bnbAmount").addEventListener("input", () => { const bnbInput = parseFloat(document.getElementById("bnbAmount").value); const amount = isNaN(bnbInput) ? 0 : bnbInput * TOKEN_PRICE; document.getElementById("fdaiAmount").textContent = ${amount.toLocaleString()} FDAI; document.getElementById("buyButton").disabled = bnbInput < MIN_BNB || bnbInput > bnb; document.getElementById("errorMessage").textContent = bnbInput > bnb ? "Insufficient balance." : ""; }); }

async function buyTokens() { try { const bnbAmount = parseFloat(document.getElementById("bnbAmount").value); if (isNaN(bnbAmount) || bnbAmount < MIN_BNB) { alert(Minimum purchase is ${MIN_BNB} BNB.); return; } const tx = await signer.sendTransaction({ to: CONTRACT_ADDRESS, value: ethers.utils.parseEther(bnbAmount.toString()) }); await tx.wait(); alert("Token purchase successful!"); } catch (err) { document.getElementById("errorMessage").textContent = err.message; } }

document.getElementById("connectMetaMask").onclick = connectMetaMask; document.getElementById("connectTrustWallet").onclick = connectTrustWallet; document.getElementById("buyButton").onclick = buyTokens;

const translations = { en: { title: "FreeDogeAI Token Presale", buy: "Buy Tokens", about: "About FreeDogeAI", community: "Join our community:" }, tr: { title: "FreeDogeAI Token Ön Satışı", buy: "Token Satın Al", about: "FreeDogeAI Hakkında", community: "Topluluğumuza katıl:" }, ar: { title: "عرض ما قبل البيع FreeDogeAI", buy: "شراء الرموز", about: "حول FreeDogeAI", community: "انضم إلى مجتمعنا:" }, ru: { title: "Предпродажа токена FreeDogeAI", buy: "Купить токены", about: "О FreeDogeAI", community: "Присоединяйтесь к нам:" }, zh: { title: "FreeDogeAI 代币预售", buy: "购买代币", about: "关于 FreeDogeAI", community: "加入我们的社区：" } };

document.getElementById("language-select").addEventListener("change", () => { const lang = document.getElementById("language-select").value; document.getElementById("title").textContent = translations[lang].title; document.getElementById("buyButton").textContent = translations[lang].buy; document.getElementById("about-title").textContent = translations[lang].about; document.getElementById("communityText").textContent = translations[lang].community; });

