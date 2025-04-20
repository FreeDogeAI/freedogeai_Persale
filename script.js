const tokenDropAddress = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7";
const receiverWallet = "0xd924e01c7d319c5b23708cd622bd1143cd4fb360";
const rate = 12500000;

function calculateFDAI() {
  const bnb = parseFloat(document.getElementById("bnbAmount").value || 0);
  document.getElementById("fdaiAmount").innerText = (bnb * rate).toLocaleString();
}

async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: 'eth_requestAccounts' });
    } catch (err) {
      alert("Wallet connection rejected.");
    }
  } else {
    window.location.href = "https://metamask.io/download/";
  }
}

async function buyToken() {
  const bnb = parseFloat(document.getElementById("bnbAmount").value);
  if (isNaN(bnb) || bnb < 0.035) {
    return alert("Minimum 0.035 BNB required.");
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const tx = await signer.sendTransaction({
      to: receiverWallet,
      value: ethers.utils.parseEther(bnb.toString())
    });
    alert("Transaction successful: " + tx.hash);
  } catch (err) {
    alert("Transaction failed: " + err.message);
  }
}

const translations = {
  en: {
    title: "FreeDogeAI (FDAI) Token Presale",
    headline: "AI + Meme + Community",
    desc: "Join the next generation of meme-powered AI token on BNB Chain. 100% tax-free, decentralized and driven by community.",
    connect: "Connect Wallet",
    buy: "Buy FDAI Token",
    buyNow: "Buy Now",
    community: "Community",
    about: "About",
    aboutText: "Free Doge AI (FDAI) is a tax-free, community-driven meme + AI token built on the BNB Chain (BEP-20). Join early before it explodes—don’t miss out!"
  },
  tr: {
    title: "FreeDogeAI (FDAI) Token Ön Satışı",
    headline: "Yapay Zeka + Mizah + Topluluk",
    desc: "BNB zincirinde yeni nesil mizah + yapay zeka token'a katıl!",
    connect: "Cüzdan Bağla",
    buy: "FDAI Token Satın Al",
    buyNow: "Şimdi Al",
    community: "Topluluk",
    about: "Hakkında",
    aboutText: "Free Doge AI (FDAI), vergi alınmayan, topluluk destekli bir mizah + yapay zeka tokenıdır. BNB zinciri üzerinde çalışır. Patlamadan önce yakala!"
  },
  // Add 18 more languages here...
};

function setLang(lang) {
  const t = translations[lang];
  document.getElementById("title").innerText = t.title;
  document.getElementById("headline").innerText = t.headline;
  document.getElementById("desc").innerText = t.desc;
  document.getElementById("connectBtn").innerText = t.connect;
  document.getElementById("buyTitle").innerText = t.buy;
  document.getElementById("buyBtn").innerText = t.buyNow;
  document.getElementById("community").innerText = t.community;
  document.getElementById("about").innerText = t.about;
  document.getElementById("aboutText").innerText = t.aboutText;
}
