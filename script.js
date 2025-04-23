let web3;
let userAddress = "";
const TOKEN_DROP_ADDRESS = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7";
const MINIMUM_BNB = 0.035;
const TOKENS_PER_BNB = 12500000;

// WalletConnect + MetaMask uyumlu
const providerOptions = {
  walletconnect: {
    package: window.WalletConnectProvider.default,
    options: {
      rpc: { 56: "https://bsc-dataseed.binance.org/" },
      chainId: 56,
      qrcodeModalOptions: {
        mobileLinks: ["metamask", "trust", "coinbase"],
      },
    },
  },
};

const web3Modal = new window.Web3Modal.default({
  cacheProvider: false,
  providerOptions,
  theme: "dark",
});

// Cüzdan Bağla
document.getElementById("connectBtn").addEventListener("click", async () => {
  try {
    const provider = await web3Modal.connect();
    web3 = new Web3(provider);

    const accounts = await web3.eth.requestAccounts();
    userAddress = accounts[0];

    const balanceWei = await web3.eth.getBalance(userAddress);
    const balance = web3.utils.fromWei(balanceWei, "ether");

    document.getElementById("walletAddress").textContent = `Connected: ${userAddress}`;
    document.getElementById("walletBalance").textContent = `BNB Balance: ${parseFloat(balance).toFixed(4)} BNB`;

    const chainId = await web3.eth.getChainId();
    if (chainId !== 56) await switchToBSC(provider);

    provider.on("accountsChanged", (accounts) => {
      userAddress = accounts[0] || "";
      document.getElementById("walletAddress").textContent = userAddress
        ? "Connected: " + userAddress
        : "Wallet disconnected";
    });

    provider.on("disconnect", () => {
      userAddress = "";
      document.getElementById("walletAddress").textContent = "Wallet disconnected";
      document.getElementById("walletBalance").textContent = "";
    });

  } catch (err) {
    console.error("Connection failed:", err);
    alert("Wallet connection failed");
  }
});

// BNB girilince token hesapla
document.getElementById("bnbAmount").addEventListener("input", () => {
  const bnb = parseFloat(document.getElementById("bnbAmount").value);
  document.getElementById("tokenAmount").textContent =
    !isNaN(bnb) && bnb > 0 ? `${(bnb * TOKENS_PER_BNB).toLocaleString()} FDAI` : "0 FDAI";
});

// Satın Al
document.getElementById("buyBtn").addEventListener("click", async () => {
  try {
    if (!userAddress) return alert("Connect wallet first");

    const bnb = parseFloat(document.getElementById("bnbAmount").value);
    if (isNaN(bnb) || bnb < MINIMUM_BNB) return alert(`Minimum is ${MINIMUM_BNB} BNB`);

    const tx = {
      from: userAddress,
      to: TOKEN_DROP_ADDRESS,
      value: web3.utils.toHex(web3.utils.toWei(bnb.toString(), "ether")),
      gas: web3.utils.toHex(210000),
    };

    const txHash = await web3.currentProvider.request({
      method: "eth_sendTransaction",
      params: [tx],
    });

    alert("Transaction sent!\nHash: " + txHash);
  } catch (err) {
    console.error(err);
    alert("Transaction failed:\n" + err.message);
  }
});

// Ağ geçişi
async function switchToBSC(provider) {
  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x38" }],
    });
  } catch (err) {
    if (err.code === 4902) {
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [{
          chainId: "0x38",
          chainName: "Binance Smart Chain",
          rpcUrls: ["https://bsc-dataseed.binance.org/"],
          nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
          blockExplorerUrls: ["https://bscscan.com"],
        }],
      });
    } else {
      throw err;
      const translations = {
  en: {
    title: "FreeDogeAI Token Presale",
    connect: "Connect Wallet",
    notconnected: "Wallet not connected",
    buy: "Buy Tokens",
    about: "About FreeDogeAI",
    aboutdesc: "FreeDogeAI is a meme-powered token combining AI hype and the spirit of Dogecoin.",
    readwhite: "Download Whitepaper",
    community: "Join our community:"
  },
  tr: {
    title: "FreeDogeAI Token Ön Satışı",
    connect: "Cüzdanı Bağla",
    notconnected: "Cüzdan bağlı değil",
    buy: "Token Satın Al",
    about: "FreeDogeAI Hakkında",
    aboutdesc: "FreeDogeAI, Dogecoin ruhu ve yapay zekayı birleştiren bir memecoin’dir.",
    readwhite: "Whitepaper'ı İndir",
    community: "Topluluğumuza katılın:"
  },
  az: {
    title: "FreeDogeAI Token Əvvəl Satışı",
    connect: "Cüzdanı Bağla",
    notconnected: "Cüzdan bağlı deyil",
    buy: "Token Al",
    about: "FreeDogeAI Haqqında",
    aboutdesc: "FreeDogeAI Dogecoin ruhunu və süni intellekti birləşdirən zarafatlı bir tokendir.",
    readwhite: "Whitepaper Yüklə",
    community: "İcma üçün qoşulun:"
  },
  ar: {
    title: "عرض ما قبل البيع FreeDogeAI",
    connect: "اتصل بالمحفظة",
    notconnected: "المحفظة غير متصلة",
    buy: "شراء الرموز",
    about: "حول FreeDogeAI",
    aboutdesc: "FreeDogeAI هو رمز يمزج بين الذكاء الاصطناعي و Dogecoin.",
    readwhite: "تحميل المستند التقني",
    community: "انضم إلى المجتمع:"
  },
  zh: {
    title: "FreeDogeAI 代币预售",
    connect: "连接钱包",
    notconnected: "钱包未连接",
    buy: "购买代币",
    about: "关于 FreeDogeAI",
    aboutdesc: "FreeDogeAI 是结合 AI 热潮和狗狗币精神的迷因代币。",
    readwhite: "下载白皮书",
    community: "加入我们的社区："
  },
  ru: {
    title: "Предпродажа токенов FreeDogeAI",
    connect: "Подключить кошелек",
    notconnected: "Кошелек не подключен",
    buy: "Купить токены",
    about: "О FreeDogeAI",
    aboutdesc: "FreeDogeAI — это мем-токен, объединяющий ИИ и дух Dogecoin.",
    readwhite: "Скачать Whitepaper",
    community: "Присоединяйтесь к нашему сообществу:"
  },
  ku: {
    title: "Pêşfirotina Token FreeDogeAI",
    connect: "Girêdanê Qezencê",
    notconnected: "Qezenc girêdayî nîne",
    buy: "Token bikire",
    about: "Derbarê FreeDogeAI",
    aboutdesc: "FreeDogeAI tokenekî memeyê ku zêrekîya makîneyê û xuyakariya Dogecoin tê de hevre dike ye.",
    readwhite: "Whitepaper daxîne",
    community: "Bi civakê me re be:"
  },
  ja: {
    title: "FreeDogeAI トークンプレセール",
    connect: "ウォレット接続",
    notconnected: "ウォレット未接続",
    buy: "トークン購入",
    about: "FreeDogeAIについて",
    aboutdesc: "FreeDogeAIはAIの話題とドージコインの精神を融合したミームトークンです。",
    readwhite: "ホワイトペーパーをダウンロード",
    community: "コミュニティに参加："
  },
  fr: {
    title: "Prévente de FreeDogeAI Token",
    connect: "Connecter le portefeuille",
    notconnected: "Portefeuille non connecté",
    buy: "Acheter des Tokens",
    about: "À propos de FreeDogeAI",
    aboutdesc: "FreeDogeAI est un token basé sur les memes combinant l'IA et l'esprit Dogecoin.",
    readwhite: "Télécharger le Whitepaper",
    community: "Rejoignez notre communauté :"
  },
  de: {
    title: "FreeDogeAI Token Vorverkauf",
    connect: "Wallet verbinden",
    notconnected: "Wallet nicht verbunden",
    buy: "Token kaufen",
    about: "Über FreeDogeAI",
    aboutdesc: "FreeDogeAI ist ein Meme-Token, der KI-Hype und den Geist von Dogecoin verbindet.",
    readwhite: "Whitepaper herunterladen",
    community: "Tritt unserer Community bei:"
  },
  ur: {
    title: "FreeDogeAI ٹوکن پری سیل",
    connect: "والیٹ سے جڑیں",
    notconnected: "والیٹ متصل نہیں ہے",
    buy: "ٹوکن خریدیں",
    about: "FreeDogeAI کے بارے میں",
    aboutdesc: "FreeDogeAI ایک meme token ہے جو AI hype اور Dogecoin کی روح کو ملاتا ہے۔",
    readwhite: "وائٹ پیپر ڈاؤن لوڈ کریں",
    community: "ہماری کمیونٹی میں شامل ہوں:"
  },
  hi: {
    title: "FreeDogeAI टोकन प्रीसेल",
    connect: "वॉलेट कनेक्ट करें",
    notconnected: "वॉलेट कनेक्ट नहीं है",
    buy: "टोकन खरीदें",
    about: "FreeDogeAI के बारे में",
    aboutdesc: "FreeDogeAI एक मीम टोकन है जो AI के उत्साह और Dogecoin की भावना को जोड़ता है।",
    readwhite: "वाइटपेपर डाउनलोड करें",
    community: "हमारे समुदाय से जुड़ें:"
  },
};

document.getElementById("languageSelect").addEventListener("change", () => {
  const lang = document.getElementById("languageSelect").value;
  const t = translations[lang];
  if (!t) return;

  document.querySelector("h1").textContent = t.title;
  document.getElementById("connectBtn").textContent = t.connect;
  document.getElementById("walletAddress").textContent = t.notconnected;
  document.getElementById("buyBtn").textContent = t.buy;
  document.querySelector("h2").textContent = t.about;
  document.querySelector("h2 + p").textContent = t.aboutdesc;
  document.querySelector("a[href$='whitepaper.pdf']").textContent = t.readwhite;
  document.querySelector("footer p").textContent = t.community;
});
    }
  }
}
