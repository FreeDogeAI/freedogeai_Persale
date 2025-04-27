const tokenDropAddress = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7"; // FDAI Token Drop kontrat adresin
const yourWalletAddress = "0xd924e01c7d319c5b23708cd622bd1143cd4fb360"; // BNB'yi alacağın kendi cüzdan adresin
const pricePerBNB = 12500000; // 1 BNB = 12,500,000 FDAI

let provider;
let signer;
let userAddress;

async function connectWallet() {
  if (window.ethereum) {
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    userAddress = await signer.getAddress();
    document.getElementById("walletAddress").innerText = "Address: " + userAddress;
    const balance = await provider.getBalance(userAddress);
    document.getElementById("walletBalance").innerText = "Balance: " + ethers.formatEther(balance) + " BNB";
    document.getElementById("walletInfo").style.display = "block";
  } else {
    alert("Please install MetaMask or Trust Wallet!");
  }
}

async function buyTokens() {
  const bnbAmount = document.getElementById("bnbAmount").value;
  if (bnbAmount < 0.035) {
    alert("Minimum 0.035 BNB required!");
    return;
  }

  const tx = {
    to: yourWalletAddress,
    value: ethers.parseEther(bnbAmount.toString())
  };

  try {
    const transaction = await signer.sendTransaction(tx);
    await transaction.wait();
    alert("BNB sent successfully! You will receive your FDAI tokens shortly.");
  } catch (err) {
    console.error(err);
    alert("Transaction failed!");
  }
}

document.getElementById("connectWallet").addEventListener("click", connectWallet);
document.getElementById("buyTokens").addEventListener("click", buyTokens);
