let web3, userAddress = "";
const TOKENS_PER_BNB = 12500000;
const MINIMUM_BNB = 0.035;
const TOKEN_DROP_ADDRESS = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7";

// WalletConnect ayarları
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

// Web3Modal v1 başlat
const web3Modal = new window.Web3Modal.default({
  cacheProvider: false,
  providerOptions,
  theme: "dark",
});

// Cüzdan bağlama
document.getElementById("connectBtn").addEventListener("click", async () => {
  try {
    const provider = await web3Modal.connect();
    web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    userAddress = accounts[0];

    document.getElementById("walletAddress").textContent = `Connected: ${userAddress}`;
    
    const balanceWei = await web3.eth.getBalance(userAddress);
    const balance = web3.utils.fromWei(balanceWei, "ether");
    document.getElementById("walletBalance").textContent = `BNB Balance: ${parseFloat(balance).toFixed(4)} BNB`;

    const chainId = await web3.eth.getChainId();
    if (chainId !== 56) await switchToBSC(provider);

    provider.on("accountsChanged", (accounts) => {
      userAddress = accounts.length > 0 ? accounts[0] : "";
      document.getElementById("walletAddress").textContent = userAddress ? `Connected: ${userAddress}` : "Wallet disconnected.";
    });

    provider.on("disconnect", () => {
      userAddress = "";
      document.getElementById("walletAddress").textContent = "Wallet disconnected.";
    });

  } catch (error) {
    console.error(error);
    alert("Connection failed: " + error.message);
  }
});

// BNB girince token hesaplama
document.getElementById("bnbAmount").addEventListener("input", () => {
  const bnb = parseFloat(document.getElementById("bnbAmount").value);
  document.getElementById("tokenAmount").textContent =
    !isNaN(bnb) && bnb > 0 ? `${(bnb * TOKENS_PER_BNB).toLocaleString()} FDAI` : "0 FDAI";
});

// Token satın alma
document.getElementById("buyBtn").addEventListener("click", async () => {
  try {
    if (!userAddress) return alert("Please connect your wallet first.");
    const bnb = parseFloat(document.getElementById("bnbAmount").value);
    if (isNaN(bnb) || bnb < MINIMUM_BNB) return alert(`Minimum is ${MINIMUM_BNB} BNB`);

    const chainId = await web3.eth.getChainId();
    if (chainId !== 56) await switchToBSC(web3.currentProvider);

    const tx = {
  from: userAddress,
  to: TOKEN_DROP_ADDRESS,
  value: web3.utils.toWei(bnb.toString(), "ether"),
  gas: 210000,
};

web3.eth.sendTransaction(tx)
  .on("transactionHash", function(hash) {
    alert("Transaction sent!\nHash: " + hash);
  })
  .on("error", function(error) {
    let msg = "Transaction failed.";
    if (error.code === 4001) msg = "Transaction rejected by user.";
    else if (error.message.includes("insufficient funds")) msg = "Insufficient BNB balance.";
    alert(msg + "\nDetails: " + error.message);
  });

    const txHash = await web3.eth.sendTransaction(tx);
    alert("Transaction sent!\nHash: " + txHash.transactionHash);
  } catch (error) {
    console.error(error);
    let msg = "Transaction failed.";
    if (error.code === 4001) msg = "Transaction rejected by user.";
    else if (error.code === -32002) msg = "Request already pending in wallet.";
    else if (error.message.includes("insufficient funds")) msg = "Insufficient BNB balance.";
    alert(msg + "\nDetails: " + error.message);
  }
});

// BSC ağına geçiş
async function switchToBSC(provider) {
  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x38" }],
    });
  } catch (error) {
    if (error.code === 4902) {
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
      throw error;
    }
  }
}

// Dil değiştirme
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

document.getElementById("languageSelect").addEventListener("change", () => {
  const lang = document.getElementById("languageSelect").value;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
});
