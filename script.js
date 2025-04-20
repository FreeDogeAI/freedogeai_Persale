const tokenDropAddress = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7";
const ownerWallet = "0xd924e01c7d319c5b23708cd622bd1143cd4fb360";
const rate = 12500000;

async function connectWallet() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Wallet connected");
    } catch (e) {
      alert("Connection error: " + e.message);
    }
  } else {
    window.open("https://metamask.io/download", "_blank");
  }
}

function calculateFDAI() {
  const bnb = parseFloat(document.getElementById("bnbAmount").value || 0);
  document.getElementById("fdaiAmount").innerText = (bnb * rate).toLocaleString();
}

async function buyToken() {
  const bnb = parseFloat(document.getElementById("bnbAmount").value);
  if (!window.ethereum) return alert("Please install a compatible wallet.");
  if (bnb < 0.035) return alert("Minimum purchase is 0.035 BNB");

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const tx = await signer.sendTransaction({
      to: ownerWallet,
      value: ethers.utils.parseEther(bnb.toString())
    });
    alert("Transaction sent! TX: " + tx.hash);
  } catch (err) {
    alert("Transaction failed: " + err.message);
  }
}

const translations = {
  en: {
    title: "FreeDogeAI (FDAI) Token Presale",
    headline: "AI + Meme + Community",
    desc: "Join the next generation of meme-powered AI token on BNB Chain.",
    connect: "Connect Wallet",
    buy: "Buy FDAI Token",
    buyNow: "Buy Now",
    community: "Community",
    about: "About",
    aboutText: "Free Doge AI (FDAI) is a 100% tax-free, meme-powered AI token launched on BNB Chain. Don’t miss the presale – FOMO is real."
  },
  tr: {
    title: "FreeDogeAI (FDAI) Token Ön Satışı",
    headline: "Yapay Zeka + Mizah + Topluluk",
    desc: "BNB Zinciri üzerinde yeni nesil meme destekli yapay zeka token'ı.",
    connect: "Cüzdan Bağla",
    buy: "FDAI Token Satın Al",
    buyNow: "Şimdi Satın Al",
    community: "Topluluk",
    about: "Hakkında",
    aboutText: "Free Doge AI (FDAI), BNB Zinciri üzerinde başlatılan %100 vergisiz, mizah + yapay zeka destekli bir tokendir. Ön satışı kaçırma – FOMO gerçektir."
  },
  // Diğer 18 dil daha buraya eklenebilir...
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
  document.getElementById("about").innerText = t.about;
  document.getElementById("aboutText").innerText = t.aboutText;
}
