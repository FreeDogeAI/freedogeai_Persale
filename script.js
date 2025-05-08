// Bağlantı için gerekli global değişkenler
let provider, signer, userAddress;

// Dil açma
document.getElementById("languageBtn").addEventListener("click", () => {
  document.getElementById("languageDropdown").classList.toggle("show");
});

// Modal aç-kapat
document.getElementById("connectWalletBtn").addEventListener("click", () => {
  document.getElementById("walletModal").style.display = "flex";
});
document.getElementById("closeModalBtn").addEventListener("click", () => {
  document.getElementById("walletModal").style.display = "none";
});

// MetaMask bağlantısı
document.getElementById("metamaskOption").addEventListener("click", async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      userAddress = await signer.getAddress();
      document.getElementById("walletAddress").innerText = userAddress;

      const balance = await provider.getBalance(userAddress);
      document.getElementById("bnbBalance").innerText = `${ethers.utils.formatEther(balance)} BNB`;

      document.getElementById("walletInfo").style.display = "block";
      document.getElementById("walletModal").style.display = "none";
    } catch (error) {
      alert("Connection failed!");
    }
  } else {
    alert("MetaMask not found. Please install MetaMask.");
  }
});

// BNB girildiğinde FDAI hesapla
document.getElementById("bnbAmount").addEventListener("input", () => {
  const bnb = parseFloat(document.getElementById("bnbAmount").value);
  if (bnb > 0) {
    const tokenAmount = bnb * 120000000000;
    document.getElementById("fdaiAmount").innerText = tokenAmount.toLocaleString();
    document.getElementById("calculationResult").style.display = "block";
    document.getElementById("buyBtn").disabled = false;
  } else {
    document.getElementById("calculationResult").style.display = "none";
    document.getElementById("buyBtn").disabled = true;
  }
});

// Whitepaper indir
document.getElementById("whitepaperBtn").addEventListener("click", () => {
  window.open("whitepaper.pdf", "_blank");
});
