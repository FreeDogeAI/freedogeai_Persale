let selectedAddress = "";
let web3;

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

document.getElementById("metamaskBtn").addEventListener("click", async () => {
  try {
    const provider = await web3Modal.connectTo("injected");
    await connectWallet(provider);
  } catch (err) {
    console.error("MetaMask error:", err);
  }
});

document.getElementById("trustwalletBtn").addEventListener("click", async () => {
  try {
    const provider = await web3Modal.connectTo("walletconnect");
    await connectWallet(provider);
  } catch (err) {
    console.error("TrustWallet error:", err);
  }
});

document.getElementById("binanceBtn").addEventListener("click", () => {
  window.open("https://www.binance.org/en/wallet", "_blank");
});

async function connectWallet(provider) {
  web3 = new Web3(provider);
  const accounts = await web3.eth.requestAccounts();
  selectedAddress = accounts[0];

  const message = "FreeDogeAI Verification";
  await web3.eth.personal.sign(message, selectedAddress);

  document.getElementById("walletAddress").textContent = selectedAddress;

  const balanceWei = await web3.eth.getBalance(selectedAddress);
  const balance = web3.utils.fromWei(balanceWei, "ether");
  document.getElementById("walletBalance").textContent = `BNB Balance: ${parseFloat(balance).toFixed(4)} BNB`;
}

// Dil çeviri sistemi
const translations = {
  en: {
    title: "About FreeDogeAI",
    aboutText: "Don't miss out! FreeDogeAI is here to shake the memecoin market...",
    download: "Download Whitepaper"
  },
  tr: {
    title: "FreeDogeAI Hakkında",
    aboutText: "Kaçırma! FreeDogeAI memecoin pazarını sallamaya geliyor...",
    download: "Whitepaper İndir"
  },
  ar: {
    title: "حول FreeDogeAI",
    aboutText: "لا تفوت! FreeDogeAI هنا لتهز سوق الميمكوين...",
    download: "تحميل الورقة البيضاء"
  },
  ru: {
    title: "О FreeDogeAI",
    aboutText: "Не пропустите! FreeDogeAI изменит рынок мемкойнов...",
    download: "Скачать Whitepaper"
  },
  zh: {
    title: "关于 FreeDogeAI",
    aboutText: "不要错过！FreeDogeAI 将颠覆 meme 币市场...",
    download: "下载白皮书"
  }
};

document.getElementById("languageSelector").addEventListener("change", (e) => {
  const lang = e.target.value;
  document.getElementById("aboutTitle").textContent = translations[lang].title;
  document.getElementById("aboutText").textContent = translations[lang].aboutText;
  document.getElementById("whiteLink").textContent = translations[lang].download;
});
