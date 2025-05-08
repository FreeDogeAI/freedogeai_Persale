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
      web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      userAddress = accounts[0];

      const balance = await web3.eth.getBalance(userAddress);
      const bnbBalance = web3.utils.fromWei(balance, 'ether');

      document.getElementById("walletAddress").innerText = userAddress;
      document.getElementById("bnbBalance").innerText = `${parseFloat(bnbBalance).toFixed(4)} BNB`;
      document.getElementById("userTokenAddress").innerText = userAddress;
      document.getElementById("walletInfo").style.display = "block";
      document.getElementById("walletModal").style.display = "none";
    } catch (error) {
      alert("MetaMask connection failed!");
    }
  } else {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = "https://metamask.app.link/dapp/freedogeai.com";
    } else {
      alert("MetaMask not found. Please install it.");
    }
  }
});

// Trust Wallet bağlantısı (mobil yönlendirme)
document.getElementById("trustwalletOption").addEventListener("click", () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    window.location.href = "https://link.trustwallet.com/open_url?coin_id=20000714&url=https://freedogeai.com";
  } else {
    alert("Trust Wallet is only available on mobile browsers.");
  }
});
// 

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
