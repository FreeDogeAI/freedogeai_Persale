
window.addEventListener("load", async () => {
  // MetaMask varsa imza al
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const account = accounts[0];
      document.getElementById("wallet-address").innerText = "Connected: " + account;

      const message = "Sign this message to confirm you're real.";
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, account],
      });

      document.getElementById("signature").innerText = "Signature: " + signature;
    } catch (err) {
      console.error("Error or user rejected:", err);
    }
  } else {
    // MetaMask yoksa yönlendirme yapma, uyarı da gösterme
    console.log("MetaMask not detected in this browser.");
  }
});
