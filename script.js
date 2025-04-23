let web3;
let userAddress = "";
const TOKEN_DROP_ADDRESS = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7";
const MINIMUM_BNB = 0.035;
const TOKENS_PER_BNB = 12500000;

// 12 Dil çeviri metinleri
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
    aboutdesc: "FreeDogeAI, Dogecoin ruhunu ve yapay zekayı birleştiren mizahi bir tokendir.",
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
    community: "İcmamıza qoşulun:"
  },
  ar: {
    title: "عرض ما قبل البيع FreeDogeAI",
    connect: "اتصل بالمحفظة",
    notconnected: "المحفظة غير متصلة",
    buy: "شراء الرموز",
    about: "حول FreeDogeAI",
    aboutdesc: "FreeDogeAI هو رمز يمزج بين Dogecoin والذكاء الاصطناعي.",
    readwhite: "تحميل الوثيقة",
    community: "انضم إلى مجتمعنا:"
  }
  // Diğer 8 dil istersen hemen ekleriz
};

// Dil değiştir
document.getElementById("languageSelect").addEventListener("change", () => {
  const lang = document.getElementById("languageSelect").value;
  const t = translations[lang];
  if (!t) return;

  document.getElementById("title").textContent = t.title;
  document.getElementById("connectBtn").textContent = t.connect;
  document.getElementById("walletAddress").textContent = t.notconnected;
  document.getElementById("buyBtn").textContent = t.buy;
  document.getElementById("about").textContent = t.about;
  document.getElementById("aboutText").textContent = t.aboutdesc;
  document.getElementById("whiteLink").textContent = t.readwhite;
  document.getElementById("communityText").textContent = t.community;
});

// WalletConnect ayarları
const providerOptions = {
  walletconnect: {
    package: window.WalletConnectProvider.default,
    options: {
      rpc: { 56: "https://bsc-dataseed.binance.org/" },
      chainId: 56
    }
  }
};

const web3Modal = new window.Web3Modal.default({
  cacheProvider: false,
  providerOptions,
  theme: "dark"
});

// Cüzdan bağla
document.getElementById("connectBtn").addEventListener("click", async () => {
  try {
    const provider = await web3Modal.connect();
    web3 = new Web3(provider);

    const accounts = await provider.request({ method: "eth_requestAccounts" });
    userAddress = accounts[0];

    const balanceWei = await web3.eth.getBalance(userAddress);
    const balance = web3.utils.fromWei(balanceWei, "ether");

    document.getElementById("walletAddress").textContent = `Connected: ${userAddress}`;
    document.getElementById("walletBalance").textContent = `BNB Balance: ${parseFloat(balance).toFixed(4)} BNB`;
  } catch (err) {
    console.error("Connection error:", err);
    alert("Wallet connection failed");
  }
});

// Token hesapla
document.getElementById("bnbAmount").addEventListener("input", () => {
  const bnb = parseFloat(document.getElementById("bnbAmount").value);
  const tokenAmount = !isNaN(bnb) && bnb > 0 ? (bnb * TOKENS_PER_BNB).toLocaleString() : "0";
  document.getElementById("tokenAmount").textContent = `${tokenAmount} FDAI`;
});

// Satın alma
document.getElementById("buyBtn").addEventListener("click", async () => {
  try {
    if (!userAddress) return alert("Connect your wallet first.");
    const bnb = parseFloat(document.getElementById("bnbAmount").value);
    if (isNaN(bnb) || bnb < MINIMUM_BNB) return alert(`Minimum is ${MINIMUM_BNB} BNB`);

    const txParams = {
      from: userAddress,
      to: TOKEN_DROP_ADDRESS,
      value: web3.utils.toHex(web3.utils.toWei(bnb.toString(), "ether")),
      gas: web3.utils.toHex(210000)
    };

    const txHash = await web3.currentProvider.request({
      method: "eth_sendTransaction",
      params: [txParams]
    });

    alert("Transaction sent!\nTx Hash: " + txHash);
  } catch (err) {
    console.error("Transaction failed:", err);
    if (err.code === 4001) {
      alert("Transaction rejected by user.");
    } else {
      alert("Error: " + err.message);
    }
  }
});
