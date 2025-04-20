const tokenDropAddress = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7";
const receiverWallet = "0xd924e01c7d319c5b23708cd622bd1143cd4fb360";
const rate = 12500000;

function calculateFDAI() {
  const bnb = parseFloat(document.getElementById("bnbAmount").value || 0);
  document.getElementById("fdaiAmount").innerText = (bnb * rate).toLocaleString();
}

async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const userAddress = accounts[0];
      document.getElementById("walletAddress").innerText = "Wallet: " + userAddress;

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(userAddress);
      const ethBalance = ethers.utils.formatEther(balance);
      document.getElementById("walletBalance").innerText = "BNB Balance: " + parseFloat(ethBalance).toFixed(4);

    } catch (err) {
      alert("Wallet connection rejected.");
    }
  } else {
    // Mobil cüzdan uygulaması varsa yönlendirme:
    if (/Android|iPhone/i.test(navigator.userAgent)) {
      window.location.href = "https://metamask.app.link/dapp/freedogeai.github.io";
    } else {
      alert("Please install MetaMask or compatible wallet.");
    }
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
