const connectBtn = document.getElementById("connectBtn");
const walletInfo = document.getElementById("walletInfo");
const walletAddressEl = document.getElementById("walletAddress");
const walletBalanceEl = document.getElementById("walletBalance");
const buyBtn = document.getElementById("buyBtn");
const bnbInput = document.getElementById("bnbInput");
const tokenAmount = document.getElementById("tokenAmount");

const TOKENS_PER_BNB = 12500000; // 12.5M FDAI per 1 BNB
const MIN_BNB = 0.035;
const PRESALE_ADDRESS = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7"; // Token Drop contract

let web3;
let userAccount = null;

// Connect Wallet
connectBtn.addEventListener("click", async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      userAccount = accounts[0];
      web3 = new Web3(window.ethereum);

      const balanceWei = await web3.eth.getBalance(userAccount);
      const balanceBNB = web3.utils.fromWei(balanceWei, "ether");

      walletAddressEl.textContent = userAccount;
      walletBalanceEl.textContent = parseFloat(balanceBNB).toFixed(4);
      walletInfo.classList.remove("hidden");
    } catch (err) {
      alert("Connection failed: " + err.message);
    }
  } else {
    alert("No wallet found. Install MetaMask or TrustWallet.");
  }
});

// BNB to Token Calculation
bnbInput.addEventListener("input", () => {
  const bnb = parseFloat(bnbInput.value);
  if (!isNaN(bnb) && bnb >= MIN_BNB) {
    const tokens = bnb * TOKENS_PER_BNB;
    tokenAmount.textContent = tokens.toLocaleString();
  } else {
    tokenAmount.textContent = "0";
  }
});

// Buy FDAI Tokens
buyBtn.addEventListener("click", async () => {
  const bnbAmount = parseFloat(bnbInput.value);
  if (!userAccount) return alert("Please connect your wallet.");
  if (isNaN(bnbAmount) || bnbAmount < MIN_BNB) return alert(`Minimum purchase is ${MIN_BNB} BNB.`);

  try {
    await web3.eth.sendTransaction({
      from: userAccount,
      to: PRESALE_ADDRESS,
      value: web3.utils.toWei(bnbAmount.toString(), "ether")
    });
    alert("Purchase successful! Tokens will be distributed automatically.");
  } catch (err) {
    alert("Transaction failed: " + err.message);
  }
});

// Language Switcher
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
