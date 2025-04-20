l// script.js

window.onload = async function () { if (window.ethereum) { try { await window.ethereum.request({ method: 'eth_requestAccounts' }); console.log("Wallet connected automatically"); } catch (e) { console.error("Connection failed on load:", e); } } };

const tokenDropAddress = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7"; const rate = 12500000; // 1 BNB = 12.5M FDAI

function calculateFDAI() { const bnb = parseFloat(document.getElementById("bnbAmount").value || 0); const tokenAmount = bnb * rate; document.getElementById("fdaiAmount").innerText = tokenAmount.toLocaleString(); }

async function connectWallet() { if (window.ethereum) { try { const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }); alert("Wallet connected: " + accounts[0]); } catch (error) { console.error('Connection rejected:', error); } } else { alert("Please install MetaMask or WalletConnect compatible wallet."); } }

async function buyToken() { if (!window.ethereum) { alert("Wallet not connected"); return; }

const bnb = parseFloat(document.getElementById("bnbAmount").value); if (isNaN(bnb) || bnb < 0.035) { alert("Minimum 0.035 BNB required."); return; }

try { const provider = new ethers.providers.Web3Provider(window.ethereum); const signer = provider.getSigner(); const tx = await signer.sendTransaction({ to: tokenDropAddress, value: ethers.utils.parseEther(bnb.toString()) }); alert("Transaction sent! TX: " + tx.hash); } catch (e) { console.error("Transaction failed:", e); alert("Transaction failed: " + e.message); } }

const translations = { en: { title: "FreeDogeAI (FDAI) Token Presale", headline: "AI + Meme + Community", desc: "Join the next generation...", connect: "Connect Wallet", buy: "Buy FDAI Token", buyNow: "Buy Now" }, tr: { title: "FreeDogeAI (FDAI) Token Ön Satışı", headline: "Yapay Zeka + Mizah + Topluluk", desc: "BNB zincirinde...", connect: "Cüzdanı Bağla", buy: "FDAI Token Satın Al", buyNow: "Şimdi Al" }, ar: { title: "البيع المسبق...", headline: "الذكاء + الميم + المجتمع", desc: "انضم للجيل...", connect: "اتصل بالمحفظة", buy: "اشترِ FDAI", buyNow: "اشترِ الآن" }, ru: { title: "Предпродажа FreeDogeAI", headline: "ИИ + Мем + Сообщество", desc: "Присоединяйтесь...", connect: "Подключить кошелёк", buy: "Купить FDAI", buyNow: "Купить" }, zh: { title: "FreeDogeAI (FDAI) 首次销售", headline: "人工智能 + 表情包 + 社区", desc: "加入 BNB 链...", connect: "连接钱包", buy: "购买 FDAI", buyNow: "立即购买" } };

function setLang(lang) { const t = translations[lang]; document.getElementById("title").innerText = t.title; document.getElementById("headline").innerText = t.headline; document.getElementById("desc").innerText = t.desc; document.getElementById("connectBtn").innerText = t.connect; document.getElementById("buyTitle").innerText = t.buy; document.getElementById("buyBtn").innerText = t.buyNow; }

