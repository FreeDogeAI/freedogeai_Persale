let web3;
let selectedWallet = "";
let userAddress = "";
const connectButtons = {
  metamask: document.getElementById("connectMetaMask"),
  trustwallet: document.getElementById("connectTrustWallet"),
  binance: document.getElementById("connectBinanceWallet"),
};

async function connectWallet(wallet) {
  try {
    let provider;
    if (wallet === "metamask" && window.ethereum && window.ethereum.isMetaMask) {
      provider = window.ethereum;
      selectedWallet = "metamask";
    } else if (wallet === "trustwallet" && window.ethereum && window.ethereum.isTrust) {
      provider = window.ethereum;
      selectedWallet = "trustwallet";
    } else if (wallet === "binance" && window.BinanceChain) {
      provider = window.BinanceChain;
      selectedWallet = "binance";
    } else {
      alert("Please install the wallet app first.");
      return;
    }

    await provider.request({ method: "eth_requestAccounts" });
    web3 = new Web3(provider);

    const accounts = await web3.eth.getAccounts();
    userAddress = accounts[0];

    const message = "Sign in to FreeDogeAI";
    await web3.eth.personal.sign(message, userAddress);

    document.getElementById("walletAddress").textContent = userAddress;

    const balanceWei = await web3.eth.getBalance(userAddress);
    const balanceBNB = web3.utils.fromWei(balanceWei, "ether");
    document.getElementById("walletBalance").textContent = `BNB Balance: ${balanceBNB}`;

    document.getElementById("buyBtn").disabled = false;
  } catch (error) {
    console.error("Wallet connection error:", error);
    alert("Failed to connect wallet.");
  }
}

connectButtons.metamask.onclick = () => connectWallet("metamask");
connectButtons.trustwallet.onclick = () => connectWallet("trustwallet");
connectButtons.binance.onclick = () => connectWallet("binance");

document.getElementById("bnbAmount").addEventListener("input", () => {
  const bnbValue = parseFloat(document.getElementById("bnbAmount").value);
  if (!isNaN(bnbValue)) {
    const tokens = bnbValue * 12500000;
    document.getElementById("tokenAmount").textContent = `${tokens} FDAI`;
  } else {
    document.getElementById("tokenAmount").textContent = "0 FDAI";
  }
});
