let provider, signer, userAddress;
const CONTRACT_ADDRESS = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7";
const FDAI_PER_BNB = 12500000;
const MIN_BNB = 0.035;

// MetaMask bağlantısı
async function connectMetaMask() {
  if (!window.ethereum) return alert("MetaMask not detected.");
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();
    await signer.signMessage("Verify connection to FreeDogeAI");
    updateWalletInfo();
  } catch (err) {
    alert("MetaMask error: " + err.message);
  }
}

// TrustWallet yönlendirme
function connectTrustWallet() {
  const siteURL = encodeURIComponent("https://freedogeai.com/");
  window.location.href = `https://link.trustwallet.com/open_url?coin_id=60&url=${siteURL}`;
}

// Cüzdan bilgileri ve bakiye gösterimi
async function updateWalletInfo() {
  document.getElementById("walletAddress").textContent = `Connected: ${userAddress}`;
  const balanceWei = await provider.getBalance(userAddress);
  const bnb = parseFloat(ethers.utils.formatEther(balanceWei));
  document.getElementById("bnbBalance").textContent = `BNB Balance: ${bnb.toFixed(4)}`;
  updateBuyButton(bnb);
}

// Hesaplama ve buton aktifliği
function updateBuyButton(bnbBalance) {
  const inputField = document.getElementById("bnbAmount");
  const tokenDisplay = document.getElementById("fdaiAmount");
  const buyButton = document.getElementById("buyButton");
  const insufficient = document.getElementById("insufficientFunds");

  inputField.addEventListener("input", () => {
    const val = parseFloat(inputField.value);
    const tokenAmount = isNaN(val) ? 0 : val * FDAI_PER_BNB;
    tokenDisplay.textContent = `${tokenAmount.toLocaleString()} FDAI`;
    const hasEnough = val <= bnbBalance;
    buyButton.disabled = isNaN(val) || val < MIN_BNB || !hasEnough;
    insufficient.style.display = hasEnough ? "none" : "block";
  });
}

// Satın alma
async function buyTokens() {
  try {
    const amount = parseFloat(document.getElementById("bnbAmount").value);
    if (isNaN(amount) || amount < MIN_BNB) return alert(`Minimum is ${MIN_BNB} BNB`);
    const tx = await signer.sendTransaction({
      to: CONTRACT_ADDRESS,
      value: ethers.utils.parseEther(amount.toString())
    });
    await tx.wait();
    alert("Transaction complete!");
  } catch (e) {
    alert("Transaction failed: " + e.message);
  }
}

document.getElementById("connectMetaMask").onclick = connectMetaMask;
document.getElementById("connectTrustWallet").onclick = connectTrustWallet;
document.getElementById("buyButton").onclick = buyTokens;
