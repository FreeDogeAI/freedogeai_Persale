const tokenDropAddress = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7";
const rate = 12500000; // 1 BNB = 12.5M FDAI

window.onload = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (e) {
      console.log("Wallet not connected:", e);
    }
  }
};

function calculateFDAI() {
  const bnb = parseFloat(document.getElementById("bnbAmount").value || 0);
  document.getElementById("fdaiAmount").innerText = (bnb * rate).toLocaleString();
}

async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      alert("Wallet connected: " + accounts[0]);
    } catch (e) {
      alert("Connection failed: " + e.message);
    }
  } else {
    alert("Please install a wallet like MetaMask or TrustWallet.");
  }
}

async function buyToken() {
  const bnb = parseFloat(document.getElementById("bnbAmount").value);
  if (isNaN(bnb) || bnb < 0.035) {
    alert("Minimum purchase is 0.035 BNB");
    return;
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const tx = await signer.sendTransaction({
      to: tokenDropAddress,
      value: ethers.utils.parseEther(bnb.toString())
    });
    alert("Transaction sent: " + tx.hash);
  } catch (e) {
    alert("Transaction error: " + e.message);
  }
}

const translations = {
  en: {
    title: "FreeDogeAI (FDAI) Token Presale",
    headline: "AI + Meme + Community",
    desc: "Join the next generation of meme-powered AI token.",
    connect: "Connect Wallet",
    buy: "Buy FDAI Token",
    buyNow: "Buy Now",
    community: "Community"
  },
  tr: {
    title: "FreeDogeAI (FDAI) Token Ön Satışı",
    headline: "Yapay Zeka + Mizah + Topluluk",
    desc: "Yeni nesil yapay zeka memecoin projesine katıl!",
    connect: "Cüzdanı Bağla",
    buy: "FDAI Token Satın Al",
    buyNow: "Şimdi Al",
    community: "Topluluk"
  }
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
}
