// Mobile Wallet Connector (MetaMask/Trust Wallet)
async function connectMobileWallet() {
    if (typeof window.ethereum !== "undefined") {
        try {
            // Mobile-specific deep linking
            if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                const dappUrl = window.location.href;
                
                // Try to connect directly first
                try {
                    const accounts = await window.ethereum.request({ 
                        method: 'eth_requestAccounts' 
                    });
                    handleWalletConnection(accounts[0]);
                    return;
                } catch (directError) {
                    console.log("Direct connection failed, trying deep link");
                }

                // Deep link fallback
                if (window.ethereum.isMetaMask) {
                    window.location.href = `https://metamask.app.link/dapp/${encodeURIComponent(dappUrl)}`;
                } else if (window.ethereum.isTrust) {
                    window.location.href = `https://link.trustwallet.com/open_url?url=${encodeURIComponent(dappUrl)}`;
                } else {
                    // Generic mobile wallet handler
                    await window.ethereum.enable();
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                    if (accounts.length > 0) {
                        handleWalletConnection(accounts[0]);
                    }
                }
            } else {
                // Desktop flow
                const accounts = await window.ethereum.request({ 
                    method: 'eth_requestAccounts' 
                });
                handleWalletConnection(accounts[0]);
            }
        } catch (error) {
            console.error("Mobile connection error:", error);
            alert("Cüzdan bağlantısı başarısız: " + error.message);
        }
    } else {
        // Mobile-specific installation prompts
        if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            if (confirm("Cüzdan uygulaması yüklü değil. Yüklemek ister misiniz?")) {
                window.location.href = /iPhone|iPad|iPod/i.test(navigator.userAgent) ? 
                    "https://apps.apple.com/app/metamask/id1438144202" : 
                    "https://play.google.com/store/apps/details?id=io.metamask";
            }
        } else {
            alert("Lütfen MetaMask veya Trust Wallet yükleyin!");
        }
    }
}

// Handle successful connection
async function handleWalletConnection(address) {
    userAddress = address;
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    
    // Update UI
    document.getElementById("walletAddress").textContent = 
        `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    
    const balance = await provider.getBalance(address);
    document.getElementById("bnbBalance").textContent = 
        `${ethers.utils.formatEther(balance).substring(0, 6)} BNB`;
    
    document.getElementById("walletInfo").style.display = "block";
    document.getElementById("connectWalletBtn").textContent = "✅ Connected";
    
    // Listen for account changes
    window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
            handleWalletConnection(accounts[0]);
        } else {
            disconnectWallet();
        }
    });
    
    // Listen for chain changes
    window.ethereum.on('chainChanged', () => {
        window.location.reload();
    });
}

// Disconnect wallet
function disconnectWallet() {
    document.getElementById("walletInfo").style.display = "none";
    document.getElementById("connectWalletBtn").textContent = "🔗 Connect Wallet";
    userAddress = null;
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', () => {
    // Connect button
    document.getElementById("connectWalletBtn").addEventListener("click", connectMobileWallet);
    
    // Auto-connect if already connected
    if (typeof window.ethereum !== "undefined" && window.ethereum.selectedAddress) {
        handleWalletConnection(window.ethereum.selectedAddress);
    }
    
    // BNB input calculation
    document.getElementById("bnbAmount").addEventListener("input", updateTokenCalculation);
    
    // Buy button
    document.getElementById("buyBtn").addEventListener("click", sendTransaction);
});

// Update token amount calculation
function updateTokenCalculation() {
    const bnbAmount = parseFloat(document.getElementById("bnbAmount").value);
    if (!isNaN(bnbAmount) {
        const tokens = bnbAmount * TOKENS_PER_BNB;
        document.getElementById("fdaiAmount").textContent = tokens.toLocaleString();
        document.getElementById("calculationResult").style.display = "block";
        document.getElementById("buyBtn").disabled = false;
    } else {
        document.getElementById("calculationResult").style.display = "none";
        document.getElementById("buyBtn").disabled = true;
    }
}

// Send transaction function
async function sendTransaction() {
    if (!userAddress) {
        alert("Lütfen önce cüzdanınızı bağlayın!");
        return;
    }

    const bnbAmount = parseFloat(document.getElementById("bnbAmount").value);
    if (isNaN(bnbAmount) {
        alert("Geçersiz BNB miktarı!");
        return;
    }

    try {
        const tx = {
            to: RECEIVE_WALLET,
            value: ethers.utils.parseEther(bnbAmount.toString()),
            gasLimit: 300000
        };

        const txResponse = await signer.sendTransaction(tx);
        
        alert(`
            ✅ İşlem gönderildi!
            Miktar: ${bnbAmount} BNB
            Alıcı: ${RECEIVE_WALLET}
            TX Hash: ${txResponse.hash}
            
            Tokenler 24 saat içinde gönderilecektir.
        `);
    } catch (error) {
        console.error("Transaction error:", error);
        alert(`İşlem hatası: ${error.message}`);
    }
}
