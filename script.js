const tokenDropAddress = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7"; // Token Drop contract address
const bnbToFDAIRate = 12500000;
const minBNB = 0.035;

// Try to auto-connect on load
window.addEventListener("load", async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      document.getElementById("connectBtn").innerText = "Wallet Connected";
    } catch (err) {
      console.warn("Wallet connection skipped.");
    }
  }
});

async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      document.getElementById("connectBtn").innerText = accounts[0].slice(0, 6) + "..." + accounts[0].slice(-4);
    } catch (error) {
      alert("Wallet connection rejected.");
    }
  } else {
    alert("Install MetaMask or a compatible wallet.");
    window.open("https://metamask.io/download/", "_blank");
  }
}

function calculateFDAI() {
  const bnb = parseFloat(document.getElementById("bnbAmount").value || 0);
  document.getElementById("fdaiAmount").innerText = isNaN(bnb) ? "0" : (bnb * bnbToFDAIRate).toLocaleString();
}

async function buyToken() {
  if (!window.ethereum) {
    alert("Please install MetaMask or a compatible wallet.");
    return;
  }

  const bnb = parseFloat(document.getElementById("bnbAmount").value);
  if (isNaN(bnb) || bnb < minBNB) {
    alert(`Minimum purchase is ${minBNB} BNB.`);
    return;
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const tx = await signer.sendTransaction({
      to: tokenDropAddress,
      value: ethers.utils.parseEther(bnb.toString())
    });

    alert("Transaction sent! Hash: " + tx.hash);
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
    aboutText: "Free Doge AI (FDAI) is a tax-free, community-driven meme + AI token built on the BNB Chain (BEP-20). Don’t miss out on the future – act now!"
  },
  tr: {
    title: "FreeDogeAI (FDAI) Token Ön Satışı",
    headline: "Yapay Zeka + Mizah + Topluluk",
    desc: "BNB Zincirinde yeni nesil mizah + yapay zeka token'a katıl! %100 vergi yok, topluluk odaklı.",
    connect: "Cüzdan Bağla",
    buy: "FDAI Token Satın Al",
    buyNow: "Şimdi Al",
    community: "Topluluk",
    about: "Hakkında",
    aboutText: "Free Doge AI (FDAI), BNB Zinciri üzerinde oluşturulmuş vergi içermeyen, topluluk odaklı bir meme + yapay zeka tokenıdır. Geç kalma, şimdi harekete geç!"
  },
  // Add 18 more translations below as { code: {title, headline...} } format...
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
