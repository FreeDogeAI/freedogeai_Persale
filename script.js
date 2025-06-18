async function connectWallet() {
    // TÜM BEKLEYEN İSTEKLERİ SIFIRLA
    if (window.ethereum?._state) {
        window.ethereum._state.accounts = null;
        window.ethereum._state.isConnected = false;
    }
    
    try {
        // YENİ BİR İSTEK BAŞLAT
        const accounts = await new Promise((resolve, reject) => {
            window.ethereum.request({
                method: 'eth_requestAccounts'
            }).then(resolve).catch(reject);
            
            // 15 SANİYE ZAMAN AŞIMI
            setTimeout(() => reject(new Error("Timeout")), 15000);
        });
        
        alert("Connected: " + accounts[0].slice(0,6) + "...");
    } catch (error) {
        alert("Error: " + (error.message || "Connection failed"));
    }
}
