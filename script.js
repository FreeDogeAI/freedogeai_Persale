// Mobil cüzdan bağlantı fonksiyonu (direkt yönlendirme)
async function connectWalletWithRedirect() {
    // Mobil tarayıcı kontrolü
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const dappUrl = encodeURIComponent(window.location.href);

    if (isMobile) {
        // MetaMask için universal link
        const metamaskDeepLink = `https://metamask.app.link/dapp/${dappUrl}`;
        
        // Trust Wallet için universal link
        const trustWalletDeepLink = `https://link.trustwallet.com/open_url?url=${dappUrl}`;
        
        // 3 saniye içinde bağlanmazsa yönlendir
        setTimeout(() => {
            if (!window.ethereum || !window.ethereum.isConnected()) {
                // Hangi cüzdanın yüklü olduğunu tespit et
                if (navigator.userAgent.match(/TrustWallet/i)) {
                    window.location.href = trustWalletDeepLink;
                } else {
                    // Varsayılan olarak MetaMask'e yönlendir
                    window.location.href = metamaskDeepLink;
                }
            }
        }, 3000);

        // Önce normal bağlantıyı dene
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ 
                    method: 'eth_requestAccounts' 
                });
                handleWalletConnection(accounts[0]);
                return;
            } catch (error) {
                console.log("Direct connect failed, redirecting...");
            }
        }
        
        // Yönlendirme yap
        if (navigator.userAgent.match(/TrustWallet/i)) {
            window.location.href = trustWalletDeepLink;
        } else {
            window.location.href = metamaskDeepLink;
        }
    } else {
        // Masaüstü için normal bağlantı
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });
            handleWalletConnection(accounts[0]);
        } else {
            // Masaüstünde cüzdan yoksa resmi siteye yönlendir
            window.open("https://metamask.io/download.html", "_blank");
        }
    }
}

// Bağlantı butonunu güncelle
document.getElementById('connectWalletBtn').addEventListener('click', connectWalletWithRedirect);
