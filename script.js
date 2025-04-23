let web3;
let userAddress = "";

// MetaMask bağlantısı
async function connectMetaMask() {
  if (typeof window.ethereum !== "undefined") {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      userAddress = accounts[0];
      web3 = new Web3(window.ethereum);
      updateUI();
    } catch (err) {
      alert("Connection failed: " + err.message);
    }
  } else {
    // MetaMask uygulaması yoksa mobilde aç
    window.location.href = "https://metamask.app.link/dapp/freedogeai.github.io/freedogeai_Persale/";
  }
}

// TrustWallet bağlantısı
async function connectTrustWallet() {
  const trustWalletLink = "https://link.trustwallet.com/open_url?coin_id=20000714&url=https://freedogeai.github.io/freedogeai_Persale/";
  window.location.href = trustWalletLink;
}

// Arayüzü güncelle
async function updateUI() {
  document.getElementById("walletAddress").textContent = `Connected: ${userAddress}`;
  const balanceWei = await web3.eth.getBalance(userAddress);
  const balance = web3.utils.fromWei(balanceWei, "ether");
  document.getElementById("walletBalance").textContent = `BNB Balance: ${parseFloat(balance).toFixed(4)} BNB`;
}

// BNB girilince FDAI hesaplama
document.getElementById("bnbAmount").addEventListener("input", () => {
  const bnb = parseFloat(document.getElementById("bnbAmount").value);
  const FDAI = bnb * 12500000;
  document.getElementById("tokenAmount").textContent =
    !isNaN(FDAI) && FDAI > 0 ? `${FDAI.toLocaleString()} FDAI` : "0 FDAI";
});
