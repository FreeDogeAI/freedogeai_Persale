window.addEventListener("load", async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      document.getElementById("wallet").innerText = "Connected wallet: " + account;

      const message = "Sign to verify your wallet.";
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, account],
      });

      document.getElementById("signature").innerText = "Signature: " + signature;

    } catch (err) {
      console.error("Connection or signing failed:", err);
    }
  } else {
    console.log("MetaMask not available in this browser.");
  }
});
