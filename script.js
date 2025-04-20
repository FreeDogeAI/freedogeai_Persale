const tokenDropAddress = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7";
const rate = 12500000;

window.addEventListener('load', async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.warn("User rejected wallet connection.");
    }
  }
});

function calculateFDAI() {
  const bnb = parseFloat(document.getElementById("bnbAmount").value || 0);
  document.getElementById("fdaiAmount").innerText = isNaN(bnb) ? "0" : (bnb * rate).toLocaleString();
}

async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      alert("Wallet connected: " + accounts[0]);
    } catch (error) {
      alert("Connection failed: " + error.message);
    }
  } else {
    alert("Please install MetaMask or a WalletConnect-compatible wallet.");
  }
}

async function buyToken() {
  if (!window.ethereum) {
    alert("Please connect your wallet.");
    return;
  }

  const bnb = parseFloat(document.getElementById("bnbAmount").value);
  if (isNaN(bnb) || bnb < 0.035) {
    alert("Minimum purchase is 0.035 BNB.");
    return;
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const tx = await signer.sendTransaction({
      to: tokenDropAddress,
      value: ethers.utils.parseEther(bnb.toString())
    });
    alert("Transaction sent! TX Hash: " + tx.hash);
  } catch (error) {
    alert("Transaction failed: " + error.message);
  }
}

const translations = {
  en: {
    title: "FreeDogeAI (FDAI) Token Presale",
    headline: "AI + Meme + Community",
    desc: "Join the meme-powered AI token revolution on BNB Chain.",
    connect: "Connect Wallet",
    buy: "Buy FDAI Token",
    buyNow: "Buy Now",
    community: "Community"
  },
  tr: {
    title: "FreeDogeAI (FDAI) Token Ön Satışı",
    headline: "Yapay Zeka + Mizah + Topluluk",
    desc: "BNB zincirinde yeni nesil yapay zekalı mizah token'ına katılın!",
    connect: "Cüzdanı Bağla",
    buy: "FDAI Token Satın Al",
    buyNow: "Şimdi Al",
    community: "Topluluk"
  },
  // Diğer 18 dili de eklenecek — gerekirse uzatırım
};

function setLang(lang) {
  const t = translations[lang];
  if (!t) return;
  document.getElementById("title").innerText = t.title;
  document.getElementById("headline").innerText = t.headline;
  document.getElementById("desc").innerText = t.desc;
  document.getElementById("connectBtn").innerText = t.connect;
  document.getElementById("buyTitle").innerText = t.buy;
  document.getElementById("buyBtn").innerText = t.buyNow;
  document.getElementById("community").innerText = t.community;
}
