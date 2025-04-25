const CONTRACT_ADDRESS = "0xd924e01c7d319c5b23708cd622bd1143cd4fb360";
const TOKEN_CONTRACT = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7";
const TOKEN_PRICE = 12500000;
const MIN_BNB = 0.035;
const CHAIN_ID = 56;

let provider, signer, userAddress;

// Modal aç/kapat
document.getElementById("connectWallet").onclick = () => {
  document.getElementById("walletModal").style.display = "block";
};

document.getElementsByClassName("close")[0].onclick = () => {
  document.getElementById("walletModal").style.display = "none";
};

// MetaMask bağlantısı
document.getElementById("connectMetaMask").onclick = async () => {
  const isMobile = /Android|iPhone/i.test(navigator.userAgent);

  if (typeof window.ethereum === "undefined") {
    if (isMobile) {
      window.location.href = "https://metamask.app.link/dapp/freedogeai.github.io";
    } else {
      alert("Please install MetaMask.");
    }
    return;
  }

  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();
    await updateUI();
  } catch (err) {
    console.error("MetaMask error:", err);
    alert("MetaMask connection failed.");
  }
};

// TrustWallet bağlantısı
document.getElementById("connectTrustWallet").onclick = () => {
  const url = encodeURIComponent(window.location.href);
  window.location.href = `https://link.trustwallet.com/open_url?url=${url}`;
};

// BNB inputu güncelle
document.getElementById("bnbAmount").oninput = () => {
  const bnb = parseFloat(document.getElementById("bnbAmount").value);
  const tokens = isNaN(bnb) ? 0 : bnb * TOKEN_PRICE;
  document.getElementById("fdaiAmount").innerText = `YOU WILL RECEIVE: ${tokens.toLocaleString()} FDAI`;
  document.getElementById("buyButton").disabled = bnb < MIN_BNB;
  document.getElementById("insufficientFunds").style.display = bnb > 100 ? "block" : "none"; // İsteğe bağlı: çok büyük girişlerde uyarı
};

// Satın alma işlemi
document.getElementById("buyButton").onclick = async () => {
  try {
    const bnbVal = parseFloat(document.getElementById("bnbAmount").value);
    const contract = new ethers.Contract(TOKEN_CONTRACT, ["function buyTokens() public payable"], signer);
    const tx = await contract.buyTokens({ value: ethers.utils.parseEther(bnbVal.toString()) });
    await tx.wait();
    alert("Token purchase successful!");
    await updateUI();
  } catch (err) {
    console.error("Transaction failed:", err);
    alert("Transaction failed.");
  }
};

// Cüzdan bağlanınca bilgileri güncelle
async function updateUI() {
  document.getElementById("walletModal").style.display = "none";
  document.getElementById("walletAddress").innerText = `Connected: ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
  const balance = await provider.getBalance(userAddress);
  const bnb = ethers.utils.formatEther(balance);
  document.getElementById("bnbBalance").innerText = `BNB BALANCE: ${parseFloat(bnb).toFixed(4)}`;
}

// Dil seçimi (EN / ZH)
document.getElementById("languageSelect").addEventListener("change", (e) => {
  const lang = e.target.value;

  if (lang === "zh") {
    document.getElementById("title").innerText = "Free Doge AI (FDAI) 是下一个狗狗币，不要错过预售";
    document.getElementById("connectWallet").innerText = "连接钱包";
    document.getElementById("modalTitle").innerText = "连接您的钱包";
    document.getElementById("connectMetaMask").innerText = "MetaMask";
    document.getElementById("connectTrustWallet").innerText = "TrustWallet";
    document.getElementById("walletAddress").innerText = "钱包未连接";
    document.getElementById("bnbBalance").innerText = "BNB 余额：--";
    document.getElementById("bnbAmount").placeholder = "输入 BNB 金额";
    document.getElementById("fdaiAmount").innerText = "您将收到：0 FDAI";
    document.getElementById("buyButton").innerText = "购买代币";
    document.getElementById("insufficientFunds").innerText = "⚠ 余额不足";
    document.querySelector("h2").innerText = "关于";
    document.querySelector("p").innerText = "Free Doge AI 是终极迷因币革命——预售正在进行中！现在加入吧！";
    document.querySelector(".community h3").innerText = "社区";
  } else {
    document.getElementById("title").innerText = "Free Doge AI (FDAI) is next doge – don't miss pre sale!";
    document.getElementById("connectWallet").innerText = "Connect Wallet";
    document.getElementById("modalTitle").innerText = "Connect Your Wallet";
    document.getElementById("connectMetaMask").innerText = "MetaMask";
    document.getElementById("connectTrustWallet").innerText = "TrustWallet";
    document.getElementById("walletAddress").innerText = "WALLET NOT CONNECTED";
    document.getElementById("bnbBalance").innerText = "BNB BALANCE: --";
    document.getElementById("bnbAmount").placeholder = "Enter BNB amount";
    document.getElementById("fdaiAmount").innerText = "YOU WILL RECEIVE: 0 FDAI";
    document.getElementById("buyButton").innerText = "Buy Tokens";
    document.getElementById("insufficientFunds").innerText = "⚠ Insufficient funds";
    document.querySelector("h2").innerText = "About";
    document.querySelector("p").innerText = "The future doesn’t wait! Free Doge AI (FDAI) is the ultimate memecoin revolution. Get in early before the rocket launches!";
    document.querySelector(".community h3").innerText = "Community";
  }
});
