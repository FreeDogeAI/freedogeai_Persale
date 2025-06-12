<script>
document.addEventListener("DOMContentLoaded", function () {
  const connectBtn = document.getElementById("connectBtn");

  connectBtn.addEventListener("click", async function () {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const userAddress = accounts[0];
        console.log("Connected wallet:", userAddress);

        connectBtn.textContent = userAddress.slice(0, 6) + "..." + userAddress.slice(-4); // Adresi göster
      } catch (err) {
        alert("Connection rejected.");
        console.error(err);
      }
    } else {
      alert("MetaMask not found. Please install MetaMask.");
      window.open("https://metamask.io/download.html", "_blank");
    }
  });
});
</script>
