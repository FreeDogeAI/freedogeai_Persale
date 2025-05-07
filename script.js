// KONFİGÜRASYON
const RECEIVE_WALLET = "0xd924e01c7d319c5b23708cd622bd1143cd4fb360"; // BNB'lerin gideceği adres
const TOKENS_PER_BNB = 120000000000; // 1 BNB = 120 Milyar FDAI

// WEB3 DEĞİŞKENLERİ
let web3;
let userAddress = "";

// MOBİL CÜZDAN YÖNLENDİRME
async function connectWallet() {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const dappUrl = window.location.href;

    // MOBİL YÖNLENDİRME
    if (isMobile) {
        const metamaskLink = `https://metamask.app.link/dapp/${encodeURIComponent(dappUrl)}`;
        const trustWalletLink = `https://link.trustwallet.com/open_url?url=${encodeURIComponent(dappUrl)}`;

        // Önce doğrudan bağlantı dene
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ 
                    method: 'eth_requestAccounts' 
                });
                handleWalletConnection(accounts[0]);
                return;
            } catch (error) {
                console.log("Doğrudan bağlantı başarısız, yönlendiriliyor...");
            }
        }

        // UserAgent'a göre uygun cüzdana yönlendir
        if (navigator.userAgent.match(/TrustWallet/i)) {
            window.location.href = trustWalletLink;
        } else {
            window.location.href = metamaskLink;
        }
    } 
    // MASAÜSTÜ BAĞLANTI
    else if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });
            handleWalletConnection(accounts[0]);
        } catch (error) {
            alert("Bağlantı hatası: " + error.message);
        }
    } else {
        window.open("https://metamask.io/download.html", "_blank");
    }
}

// CÜZDAN BAĞLANTI SONRASI
async function handleWalletConnection(address) {
    userAddress = address;
    web3 = new Web3(window.ethereum);
    
    // BSC AĞ KONTROLÜ
    const chainId = await web3.eth.getChainId();
    if (chainId !== 56) {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x38' }] // BSC Mainnet
            });
        } catch (error) {
            alert("Lütfen BSC ağına geçiş yapın!");
            return;
        }
    }

    // UI GÜNCELLEME
    document.getElementById('walletAddress').textContent = 
        `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    
    const balance = await web3.eth.getBalance(address);
    document.getElementById('bnbBalance').textContent = 
        `${parseFloat(web3.utils.fromWei(balance)).toFixed(4)} BNB`;
    
    document.getElementById('walletInfo').style.display = 'block';
    document.getElementById('connectWalletBtn').textContent = '✅ Connected';
    document.getElementById('userTokenAddress').textContent = address;
}

// BNB GÖNDERİM FONKSİYONU
async function sendBNB() {
    const bnbAmount = parseFloat(document.getElementById('bnbAmount').value);
    
    if (!bnbAmount || bnbAmount <= 0) {
        alert("Geçersiz miktar!");
        return;
    }

    try {
        const weiAmount = web3.utils.toWei(bnbAmount.toString(), 'ether');
        
        const tx = {
            from: userAddress,
            to: RECEIVE_WALLET, // BNB'lerin gideceği adres
            value: weiAmount,
            gas: 300000,
            gasPrice: await web3.eth.getGasPrice()
        };

        const receipt = await web3.eth.sendTransaction(tx);
        
        alert(`
            ✅ ${bnbAmount} BNB başarıyla gönderildi!
            ► Alıcı: ${RECEIVE_WALLET}
            ► TX Hash: ${receipt.transactionHash}
            ► Alacak: ${(bnbAmount * TOKENS_PER_BNB).toLocaleString()} FDAI
            (Tokenler 24 saat içinde gönderilecektir)
        `);
        
    } catch (error) {
        console.error("Gönderim hatası:", error);
        alert("İşlem başarısız: " + error.message);
    }
}

// SAYFA YÜKLENİNCE
window.addEventListener('DOMContentLoaded', () => {
    // Otomatik bağlanılmışsa
    if (window.ethereum?.selectedAddress) {
        handleWalletConnection(window.ethereum.selectedAddress);
    }
    
    // Event Listener'lar
    document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
    document.getElementById('buyBtn').addEventListener('click', sendBNB);
    document.getElementById('bnbAmount').addEventListener('input', function() {
        const amount = parseFloat(this.value) || 0;
        document.getElementById('fdaiAmount').textContent = 
            (amount * TOKENS_PER_BNB).toLocaleString();
    });
});

// CÜZDAN DEĞİŞİKLİK TAKİBİ
if (window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
            handleWalletConnection(accounts[0]);
        } else {
            document.getElementById('walletInfo').style.display = 'none';
            document.getElementById('connectWalletBtn').textContent = '🔗 Connect Wallet';
        }
    });
    
    window.ethereum.on('chainChanged', () => window.location.reload());
                       }
