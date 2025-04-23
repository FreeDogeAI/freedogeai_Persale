const metaBtn = document.getElementById("connectMeta");
const trustBtn = document.getElementById("connectTrust");

metaBtn.addEventListener("click", () => {
  const deepLink = "metamask://dapp/freedogeai.github.io/freedogeai_Persale/";
  window.location.href = deepLink;
});

trustBtn.addEventListener("click", () => {
  const deepLink = "trust://browser_enable?url=https://freedogeai.github.io/freedogeai_Persale/";
  window.location.href = deepLink;
});

// Cüzdan bağlıysa adres ve bakiye göster
window.addEventListener("load", async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const userAddress = accounts[0];
      document.getElementById("walletAddress").textContent = `Connected: ${userAddress}`;
      
      const balanceWei = await web3.eth.getBalance(userAddress);
      const balance = web3.utils.fromWei(balanceWei, "ether");
      document.getElementById("walletBalance").textContent = `BNB Balance: ${parseFloat(balance).toFixed(4)} BNB`;
    } catch (err) {
      console.error("Wallet error:", err);
    }
  }
});
