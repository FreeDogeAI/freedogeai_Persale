// Cüzdan Bağlantısı
document.getElementById("connectWallet").addEventListener("click", async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      alert("Cüzdan bağlandı: " + accounts[0].substring(0, 6) + "...");
      document.getElementById("buyTokens").disabled = false;
    } catch (error) {
      console.error("Kullanıcı reddetti:", error);
    }
  } else {
    alert("Lütfen MetaMask veya Trust Wallet yükleyin!");
  }
});

// Satın Alma Butonu
document.getElementById("buyTokens").addEventListener("click", () => {
  const recipient = "0xd924e01c7d319c5b23708cd622bd1143cd4fb360"; // Alıcı cüzdan
  const amount = "0.035"; // Minimum BNB miktarı (değiştirilebilir)
  
  if (window.ethereum) {
    window.ethereum.request({
      method: "eth_sendTransaction",
      params: [{
        to: recipient,
        value: web3.utils.toWei(amount, "ether"),
      }]
    })
    .then(txHash => {
      alert("İşlem başarılı! FDAI token'ları otomatik gönderilecek.\nTX Hash: " + txHash);
    })
    .catch(error => {
      console.error("İşlem hatası:", error);
    });
  }
});

// Kontrat Adreslerini Kopyala
document.getElementById("copyToken").addEventListener("click", () => {
  navigator.clipboard.writeText("0x8161698A74F2ea0035B9912ED60140893Ac0f39C");
  alert("Token kontratı kopyalandı!");
});

document.getElementById("copyDrop").addEventListener("click", () => {
  navigator.clipboard.writeText("0x45583DB8b6Db50311Ba8e7303845ACc6958589B7");
  alert("Drop kontratı kopyalandı!");
});
