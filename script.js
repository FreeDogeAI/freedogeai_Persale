// betik.js

const tokenDropAddress = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7"; const rate = 12500000; // 1 BNB = 12.5M FDAI

function calculateFDAI() { const bnb = parseFloat(document.getElementById("bnbAmount").value || 0); document.getElementById("fdaiAmount").innerText = isNaN(bnb) ? "0" : (bnb * rate).toLocaleString(); }

async function connectWallet() { if (typeof window.ethereum !== "undefined") { try { const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }); if (accounts.length > 0) alert("Wallet connected!"); } catch (e) { alert("Connection failed: " + e.message); } } else { alert("Please install MetaMask or another compatible wallet."); } }

async function buyToken() { if (!window.ethereum) return alert("Wallet not connected!"); const bnb = parseFloat(document.getElementById("bnbAmount").value); if (isNaN(bnb) || bnb < 0.035) return alert("Minimum 0.035 BNB required");

const provider = new ethers.providers.Web3Provider(window.ethereum); const signer = provider.getSigner();

try { const tx = await signer.sendTransaction({ to: tokenDropAddress, value: ethers.utils.parseEther(bnb.toString()) }); alert("Transaction sent! TX: " + tx.hash); } catch (e) { alert("Transaction failed: " + e.message); } }

const translations = { en: { title: "FreeDogeAI (FDAI) Token Presale", headline: "AI + Meme + Community", desc: "Join the next generation of meme-powered AI token on BNB Chain. 100% tax-free, decentralized and driven by community.", connect: "Connect Wallet", buy: "Buy FDAI Token", buyNow: "Buy Now", community: "Community" }, tr: { title: "FreeDogeAI (FDAI) Token Ön Satışı", headline: "Yapay Zeka + Mizah + Topluluk", desc: "BNB zincirinde, %100 vergi̇siz ve topluluk odaklı yapay zekalı mizah token'ına katıl!", connect: "Cüzdanı Bağla", buy: "FDAI Token Satın Al", buyNow: "Şimdi Al", community: "Topluluk" }, ar: { title: "البيع المسبق لرمز FreeDogeAI (FDAI)", headline: "الذكاء الصناعي + الميم + المجتمع", desc: "انضم إلى الجيل القادم من رموز الذكاء الصناعي في سلسلة BNB.", connect: "اتصل بالمحفظة", buy: "اشتري FDAI", buyNow: "اشتري الآن", community: "المجتمع" }, ru: { title: "Предпродажа FreeDogeAI (FDAI)", headline: "ИИ + Мем + Сообщество", desc: "Присоединитесь к новому поколению AI-токенов.", connect: "Подключить кошелек", buy: "Купить FDAI", buyNow: "Купить", community: "Сообщество" }, zh: { title: "FreeDogeAI (FDAI) 首次销售", headline: "人工智能 + 表情包 + 社区", desc: "加入新一代在BNB链上的AI社区引擎的表情包代币!", connect: "链接钱包", buy: "购买 FDAI", buyNow: "立即购买", community: "社区" } };

function setLang(lang) { const t = translations[lang]; document.getElementById("title").innerText = t.title; document.getElementById("headline").innerText = t.headline; document.getElementById("desc").innerText = t.desc; document.getElementById("connectBtn").innerText = t.connect; document.getElementById("buyTitle").innerText = t.buy; document.getElementById("buyBtn").innerText = t.buyNow; document.getElementById("community").innerText = t.community; }

