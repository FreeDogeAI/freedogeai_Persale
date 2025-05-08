// Kullanıcı bilgileri
const RECEIVE_WALLET = "0xd924e01c7d319c5b23708cd622bd1143cd4fb360";
const TOKENS_PER_BNB = 120000000000;

// Web3 ve Web3Modal bağlantısı
let web3;
let userAddress = "";
let web3Modal;
let provider;

// Web3Modal yapılandırması
const providerOptions = {
    walletconnect: {
        package: window.WalletConnectProvider,
        options: {
            rpc: {
                56: "https://bsc-dataseed.binance.org/" // BSC Mainnet RPC
            },
            chainId: 56 // BSC Mainnet
        }
    }
};

// Web3Modal başlatma
function initWeb3Modal() {
    web3Modal = new Web3Modal({
        network: "binance",
        cacheProvider: true,
        providerOptions
    });
}

// Cüzdan bağlantısı
async function connectWallet() {
    try {
        provider = await web3Modal.connect();
        web3 = new Web3(provider);

        const accounts = await web3.eth.getAccounts();
        userAddress = accounts[0];

        const chainId = await web3.eth.getChainId();
        if (chainId !== 56) {
            alert("Lütfen Binance Smart Chain (BSC) ağına geçiş yapın!");
            return;
        }

        updateWalletInfo();

    } catch (error) {
        console.error("Cüzdan bağlantı hatası:", error);
        alert("Bağlantı hatası: " + error.message);
    }
}

// Cüzdan bilgilerini güncelle
async function updateWalletInfo() {
    if (!userAddress) return;

    try {
        const balance = await web3.eth.getBalance(userAddress);
        const bnbBalance = web3.utils.fromWei(balance, 'ether');

        document.getElementById('walletAddress').textContent = userAddress;
        document.getElementById('userTokenAddress').textContent = userAddress;
        document.getElementById('bnbBalance').textContent = parseFloat(bnbBalance).toFixed(4) + " BNB";
        document.getElementById('walletInfo').style.display = 'block';
        document.getElementById('connectWalletBtn').textContent = '✅ Connected';
        document.getElementById('buyBtn').disabled = false;

    } catch (error) {
        console.error("Bakiye sorgulama hatası:", error);
    }
}

// BNB gönderim fonksiyonu
async function buyTokens() {
    const bnbAmount = parseFloat(document.getElementById('bnbAmount').value);

    if (!bnbAmount || bnbAmount <= 0) {
        alert("Lütfen geçerli bir BNB miktarı girin!");
        return;
    }

    try {
        const weiAmount = web3.utils.toWei(bnbAmount.toString(), 'ether');
        const tokenAmount = bnbAmount * TOKENS_PER_BNB;

        const tx = {
            from: userAddress,
            to: RECEIVE_WALLET,
            value: weiAmount,
            gas: 300000,
            gasPrice: await web3.eth.getGasPrice()
        };

        const receipt = await web3.eth.sendTransaction(tx);

        const successMessage = `
            ✅ ${bnbAmount} BNB gönderildi!
            BNB Gönderildi: ${RECEIVE_WALLET}
            FDAI Alacak Adres: ${userAddress}
            Alacak: ${tokenAmount.toLocaleString()} FDAI
            TX Hash: ${receipt.transactionHash}
            Tokenler 24 saat içinde cüzdanınıza yansıyacaktır.
        `;
        
        alert(successMessage);

    } catch (error) {
        console.error("Gönderim hatası:", error);
        alert("İşlem başarısız: " + error.message);
    }
}

// Whitepaper butonu
function openWhitepaper() {
    window.open('https://your-whitepaper-url.com', '_blank'); // Whitepaper URL'sini güncelle
}

// Sayfa yüklendiğinde
window.addEventListener('DOMContentLoaded', () => {
    initWeb3Modal();

    document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
    document.getElementById('buyBtn').addEventListener('click', buyTokens);
    document.getElementById('whitepaperBtn').addEventListener('click', openWhitepaper);

    document.getElementById('bnbAmount').addEventListener('input', function() {
        const amount = parseFloat(this.value) || 0;
        const tokens = amount * TOKENS_PER_BNB;
        document.getElementById('fdaiAmount').textContent = tokens.toLocaleString();
    });

    if (web3Modal.cachedProvider) {
        connectWallet();
    }
});

// WalletConnect olay dinleyicileri
if (provider) {
    provider.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
            userAddress = accounts[0];
            updateWalletInfo();
        } else {
            document.getElementById('walletInfo').style.display = 'none';
            document.getElementById('connectWalletBtn').textContent = '🔗 Connect Wallet';
            document.getElementById('buyBtn').disabled = true;
        }
    });

    provider.on('chainChanged', () => {
        window.location.reload();
    });

    provider.on('disconnect', () => {
        web3Modal.clearCachedProvider();
        document.getElementById('walletInfo').style.display = 'none';
        document.getElementById('connectWalletBtn').textContent = '🔗 Connect Wallet';
        document.getElementById('buyBtn').disabled = true;
    });
}
