const TOKENS_PER_BNB = 12500000;
const MIN_BNB = 0.035;
const PRESALE_ADDRESS = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7";

let web3Modal, provider, web3, userAccount;

// WalletConnect, TrustWallet, MetaMask desteği
const providerOptions = {
  walletconnect: {
    package: window.WalletConnectProvider.default,
    options: {
      rpc: { 56: "https://bsc-dataseed.binance.org/" },
      chainId: 56,
      qrcodeModalOptions: {
        mobileLinks: ["trust", "metamask"]
      }
    }
  }
};

// Web3Modal başlat
window.addEventListener("load", () => {
  web3Modal = new window.Web3Modal.default({
    cacheProvider: false,
    providerOptions,
    theme: "dark"
  });

  // Cüzdan bağlama butonu
  const btn = document.getElementById("connectWalletBtn");
  if (btn) {
    btn.addEventListener("click", async () => {
      try {
        provider = await web3Modal.connect();
        web3 = new Web3(provider);

        const accounts = await web3.eth.getAccounts();
        userAccount = accounts[0];

        const balanceWei = await web3.eth.getBalance(userAccount);
        const balance = web3.utils.fromWei(balanceWei, "ether");

        document.getElementById("walletAddress").textContent = userAccount;
        document.getElementById("walletBalance").textContent = parseFloat(balance).toFixed(4);
        document.getElementById("walletInfo").classList.remove("hidden");
      } catch (err) {
        alert("Connection failed: " + err.message);
      }
    });
  }
});

// BNB -> FDAI hesapla
document.getElementById("bnbInput").addEventListener("input", () => {
  const bnb = parseFloat(document.getElementById("bnbInput").value);
  if (!isNaN(bnb) && bnb >= MIN_BNB) {
    const tokens = bnb * TOKENS_PER_BNB;
    document.getElementById("tokenAmount").textContent = tokens.toLocaleString();
  } else {
    document.getElementById("tokenAmount").textContent = "0";
  }
});

// Satın alma
document.getElementById("buyBtn").addEventListener("click", async () => {
  const bnbAmount = parseFloat(document.getElementById("bnbInput").value);
  if (!userAccount) return alert("Please connect your wallet.");
  if (isNaN(bnbAmount) || bnbAmount < MIN_BNB) return alert(`Minimum: ${MIN_BNB} BNB`);

  try {
    await web3.eth.sendTransaction({
      from: userAccount,
      to: PRESALE_ADDRESS,
      value: web3.utils.toWei(bnbAmount.toString(), "ether")
    });
    alert("Purchase successful! Tokens will be sent automatically.");
  } catch (err) {
    alert("Transaction failed: " + err.message);
  }
});

// Dil desteği (seçilen dilde çeviri)
const translations = {
  en: {
    title: "Buy FreeDogeAI Token (FDAI)",
    bnbLabel: "Enter BNB amount:",
    footerText: "Join our community for updates",
    buyBtn: "Buy FDAI"
  },
  tr: {
    title: "FreeDogeAI Token (FDAI) Satın Al",
    bnbLabel: "BNB miktarını girin:",
    footerText: "Güncellemeler için topluluğumuza katılın",
    buyBtn: "FDAI Satın Al"
  },
  ar: {
    title: "شراء رمز FreeDogeAI (FDAI)",
    bnbLabel: "أدخل كمية BNB:",
    footerText: "انضم إلى مجتمعنا للتحديثات",
    buyBtn: "شراء FDAI"
  },
  ru: {
    title: "Купить FreeDogeAI Token (FDAI)",
    bnbLabel: "Введите сумму BNB:",
    footerText: "Присоединяйтесь к нашему сообществу для обновлений",
    buyBtn: "Купить FDAI"
  },
  zh: {
    title: "购买 FreeDogeAI 代币 (FDAI)",
    bnbLabel: "输入 BNB 数量:",
    footerText: "加入我们的社区以获取更新",
    buyBtn: "购买 FDAI"
  }
};

document.getElementById("languageSelector").addEventListener("change", (e) => {
  const lang = e.target.value;
  document.getElementById("title").textContent = translations[lang].title;
  document.getElementById("bnbLabel").textContent = translations[lang].bnbLabel;
  document.getElementById("footerText").textContent = translations[lang].footerText;
  document.getElementById("buyBtn").textContent = translations[lang].buyBtn;
});
