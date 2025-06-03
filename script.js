document.addEventListener("DOMContentLoaded", () => {
    const connectButton = document.getElementById("connectWallet");
    const walletAddressDisplay = document.getElementById("walletAddress");

    connectButton.addEventListener("click", async () => {
        if (window.ethereum) {
            try {
                // MetaMask'e bağlan ve hesap adresini al
                const accounts = await window.ethereum.request({ 
                    method: "eth_requestAccounts" 
                });
                const walletAddress = accounts[0];
                walletAddressDisplay.textContent = `Bağlı Cüzdan: ${walletAddress}`;
                
                // İmza isteği örneği (Opsiyonel)
                const message = "FreeDogeAI'ye giriş için imza atın";
                const signature = await window.ethereum.request({
                    method: "personal_sign",
                    params: [message, walletAddress],
                });
                console.log("İmza alındı:", signature);

                alert("Cüzdan başarıyla bağlandı!");
            } catch (error) {
                console.error("Bağlantı hatası:", error);
                alert("Bağlantı reddedildi veya bir hata oluştu.");
            }
        } else {
            alert("Lütfen MetaMask yükleyin: https://metamask.io/");
            window.open("https://metamask.io/download.html", "_blank");
        }
    });
});
