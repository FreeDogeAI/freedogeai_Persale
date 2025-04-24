let web3; let userAddress = ""; const TOKENS_PER_BNB = 12500000;

const translations = { en: { title: "FreeDogeAI Token Presale", aboutTitle: "About FreeDogeAI", aboutText: "Don't miss out! FreeDogeAI is here to shake the memecoin market...", whitepaper: "Download Whitepaper", community: "Join our community:" }, tr: { title: "FreeDogeAI Token Ön Satışı", aboutTitle: "FreeDogeAI Hakkında", aboutText: "Kaçırma! FreeDogeAI memecoin pazarını sallamaya geliyor...", whitepaper: "Whitepaperı İndir", community: "Topluluğumuza katılın:" }, ar: { title: "عرض ما قبل البيع FreeDogeAI", aboutTitle: "حول FreeDogeAI", aboutText: "لا تفوت! FreeDogeAI هنا لتهز سوق الميمكوين...", whitepaper: "تحميل المستند التقني", community: "انضم إلى مجتمعنا:" }, ru: { title: "Предпродажа токена FreeDogeAI", aboutTitle: "О FreeDogeAI", aboutText: "Не пропустите! FreeDogeAI изменит рынок мемкойнов...", whitepaper: "Скачать Whitepaper", community: "Присоединяйтесь к сообществу:" }, zh: { title: "FreeDogeAI 令牌预售", aboutTitle: "关于 FreeDogeAI", aboutText: "不要错过！FreeDogeAI 将频狱 meme 市场...", whitepaper: "下载白皮书", community: "加入我们的社区：" } };

function translateUI(lang) { const t = translations[lang] || translations["en"]; document.getElementById("title").textContent = t.title; document.getElementById("aboutTitle").textContent = t.aboutTitle; document.getElementById("aboutText").textContent = t.aboutText; document.getElementById("whiteLink").textContent = t.whitepaper; document.getElementById("communityTitle").textContent = t.community; }

document.getElementById("languageSelector").addEventListener("change", (e) => { translateUI(e.target.value); });

translateUI("en");

async function connect(providerType) { try { if (!window.ethereum) { alert("MetaMask not installed"); return; } web3 = new Web3(window.ethereum); const accounts = await window.ethereum.request({ method: "eth_requestAccounts" }); userAddress = accounts[0]; document.getElementById("walletAddress").textContent = Connected: ${userAddress};

const balanceWei = await web3.eth.getBalance(userAddress);
const balance = web3.utils.fromWei(balanceWei, "ether");
document.getElementById("walletBalance").textContent = `BNB Balance: ${parseFloat(balance).toFixed(4)} BNB`;

const msg = "Sign this message to verify your wallet for FreeDogeAI";
await web3.eth.personal.sign(msg, userAddress);

document.getElementById("buyBtn").disabled = false;

} catch (err) { alert("Wallet connection failed"); console.error(err); } }

document.getElementById("metamaskBtn").addEventListener("click", () => connect("metamask"));

document.getElementById("trustwalletBtn").addEventListener("click", () => { window.open("https://link.trustwallet.com/open_url?coin_id=60&url=https://freedogeai.com", "_blank"); });

document.getElementById("binanceBtn").addEventListener("click", () => { window.open("https://www.binance.org/en/wallet", "_blank"); });

document.getElementById("bnbAmount").addEventListener("input", () => { const bnb = parseFloat(document.getElementById("bnbAmount").value); document.getElementById("tokenAmount").textContent = !isNaN(bnb) && bnb > 0 ? ${(bnb * TOKENS_PER_BNB).toLocaleString()} FDAI : "0 FDAI"; });

  
