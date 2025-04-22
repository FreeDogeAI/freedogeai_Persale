let web3, userAddress = "";

const TOKENS_PER_BNB = 12500000;
const MINIMUM_BNB = 0.035;
const TOKEN_DROP_ADDRESS = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7";

const providerOptions = {
  walletconnect: {
    package: window.WalletConnectProvider.default,
    options: {
      rpc: {
        56: "https://bsc-dataseed.binance.org/",
        56: "https://bsc-dataseed1.defibit.io/",
      },
      chainId: 56,
      qrcodeModalOptions: {
        mobileLinks: ["trust", "metamask", "coinbase"],
      },
    },
  },
};

const web3Modal = new window.Web3Modal.default({
  cacheProvider: false,
  providerOptions,
  theme: "dark",
});

// Connect Wallet
document.getElementById("connectBtn").addEventListener("click", async () => {
  try {
    const provider = await web3Modal.connect();
    if (!provider) throw new Error("Provider not initialized");

    web3 = new Web3(provider);
    const accounts = await web3.eth.requestAccounts();
    if (!accounts || accounts.length === 0) throw new Error("No account found");

    userAddress = accounts[0];
    document.getElementById("walletAddress").textContent = `Connected: ${userAddress}`;

    const balanceWei = await web3.eth.getBalance(userAddress);
    const balance = web3.utils.fromWei(balanceWei, "ether");
    document.getElementById("walletBalance").textContent = `BNB Balance: ${parseFloat(balance).toFixed(4)} BNB`;

    // Provider events
    provider.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        userAddress = accounts[0];
        document.getElementById("walletAddress").textContent = `Connected: ${userAddress}`;
      } else {
        userAddress = "";
        document.getElementById("walletAddress").textContent = "Wallet disconnected.";
      }
    });

    provider.on("chainChanged", (chainId) => {
      if (parseInt(chainId) !== 56) {
        alert("Please switch to Binance Smart Chain!");
      }
    });
  } catch (error) {
    console.error("Connection error:", error);
    let errorMessage = "Connection failed.";
    if (error.code === 4001) {
      errorMessage = "User rejected the request.";
    } else if (error.code === -32002) {
      errorMessage = "Request already pending in wallet.";
    }
    document.getElementById("walletAddress").textContent = errorMessage;
  }
});

// Calculate FDAI
document.getElementById("bnbAmount").addEventListener("input", () => {
  const bnb = parseFloat(document.getElementById("bnbAmount").value);
  document.getElementById("tokenAmount").textContent = !isNaN(bnb) && bnb > 0 ? `${(bnb * TOKENS_PER_BNB).toLocaleString()} FDAI` : "0 FDAI";
});

// Buy Tokens
document.getElementById("buyBtn").addEventListener("click", async () => {
  const bnb = parseFloat(document.getElementById("bnbAmount").value);
  if (!userAddress) return alert("Please connect your wallet first.");
  if (isNaN(bnb) || bnb < MINIMUM_BNB) return alert(`Minimum is ${MINIMUM_BNB} BNB`);

  try {
    const chainId = await web3.eth.getChainId();
    if (chainId !== 56) {
      alert("Please switch to Binance Smart Chain!");
      return;
    }

    const value = web3.utils.toWei(bnb.toString(), "ether");
    const transactionParameters = {
      from: userAddress,
      to: TOKEN_DROP_ADDRESS,
      value: value,
      gas: web3.utils.toHex(210000),
      gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()),
    };

    await web3.eth
      .sendTransaction(transactionParameters)
      .on("transactionHash", (hash) => {
        console.log("Transaction hash:", hash);
        alert("Transaction sent! Hash: " + hash);
      })
      .on("error", (error) => {
        console.error("Transaction error:", error);
        alert("Transaction failed: " + error.message);
      });
  } catch (err) {
    console.error("Transaction error:", err);
    alert("Transaction failed: " + err.message);
  }
});

// Translations
const translations = {
  en: {
    title: "FreeDogeAI Token Presale",
    connect: "Connect Wallet",
    notconnected: "Wallet not connected",
    buy: "Buy Tokens",
    about: "About FreeDogeAI",
    aboutdesc: "FreeDogeAI is a meme-powered token combining AI hype and the spirit of Dogecoin.",
    readwhite: "Download Whitepaper",
    community: "Join our community for updates",
  },
  tr: {
    title: "FreeDogeAI Token Ön Satışı",
    connect: "Cüzdanı Bağla",
    notconnected: "Cüzdan bağlı değil",
    buy: "Token Satın Al",
    about: "FreeDogeAI Hakkında",
    aboutdesc: "FreeDogeAI, Dogecoin ruhu ve yapay zeka hype'ını birleştiren mizahi bir tokendir.",
    readwhite: "Whitepaper'ı İndir",
    community: "Topluluğumuza katılın",
  },
  az: {
    title: "FreeDogeAI Token Əvvəl Satışı",
    connect: "Cüzdanı Bağla",
    notconnected: "Cüzdan bağlı deyil",
    buy: "Token Al",
    about: "FreeDogeAI Haqqında",
    aboutdesc: "FreeDogeAI Dogecoin ruhunu və süni intellekt trendini birləşdirən zarafatlı bir tokendir.",
    readwhite: "Whitepaper Yüklə",
    community: "Yeniləmələr üçün icmamıza qoşulun",
  },
  ar: {
    title: "عرض ما قبل البيع FreeDogeAI",
    connect: "اتصل بالمحفظة",
    notconnected: "المحفظة غير متصلة",
    buy: "شراء الرموز",
    about: "حول FreeDogeAI",
    aboutdesc: "FreeDogeAI هو رمز يمزج بين الذكاء الاصطناعي و Dogecoin.",
    readwhite: "تحميل المستند التقني",
    community: "انضم إلى مجتمعنا للتحديثات",
  },
};

// Language switch
document.getElementById("languageSelect").addEventListener("change", () => {
  const lang = document.getElementById("languageSelect").value;
  console.log("Selected language:", lang);
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    } else {
      console.warn(`Translation missing for key: ${key} in language: ${lang}`);
    }
  });
});
