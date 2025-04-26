// MOBİL CÜZDAN BAĞLANTISI (DIRECT)
async function connectWallet(walletType) {
  try {
    // 1. Önce window.ethereum kontrolü
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      userAddress = await signer.getAddress();
      updateWalletInfo();
      return;
    }

    // 2. Mobil uygulama deep linkleri
    let deepLink;
    if (walletType === "metamask") {
      deepLink = `metamask://wc?uri=${encodeURIComponent(window.location.href)}`;
    } else {
      deepLink = `trust://wc?uri=${encodeURIComponent(window.location.href)}`;
    }

    // 3. Direkt uygulamayı aç
    window.location.href = deepLink;
    
    // 4. 3 saniye bekleyip kontrol et
    setTimeout(() => {
      if (!window.ethereum) {
        alert("Cüzdan uygulaması açılmadı! Lütfen manuel olarak bağlayın.");
      }
    }, 3000);

  } catch (err) {
    console.error("Bağlantı hatası:", err);
    alert("Bağlantı başarısız: " + err.message);
  }
}

// CÜZDAN BİLGİLERİNİ GÜNCELLE
async function updateWalletInfo() {
  if (!window.ethereum) return;
  
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const accounts = await provider.listAccounts();
  
  if (accounts.length > 0) {
    userAddress = accounts[0];
    const balance = await provider.getBalance(userAddress);
    const bnbBalance = ethers.utils.formatEther(balance);
    
    document.getElementById("walletAddress").textContent = 
      `Connected: ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
    document.getElementById("bnbBalance").textContent = 
      `BNB Balance: ${parseFloat(bnbBalance).toFixed(4)}`;
  }
}

// SAYFA YÜKLENDİĞİNDE
window.addEventListener("DOMContentLoaded", () => {
  // Cüzdan değişikliklerini dinle
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", updateWalletInfo);
    window.ethereum.on("chainChanged", () => window.location.reload());
  }
  
  // Buton eventleri
  document.getElementById("connectMetaMask").addEventListener("click", 
    () => connectWallet("metamask"));
  document.getElementById("connectTrustWallet").addEventListener("click", 
    () => connectWallet("trustwallet"));
});
