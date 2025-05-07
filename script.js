// 1. Web3 Provider Ayarları
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask yüklü!');
    window.web3 = new Web3(window.ethereum);
} else {
    console.error('Web3 provider bulunamadı! Lütfen MetaMask yükleyin');
    alert('Lütfen MetaMask veya Trust Wallet yükleyin!');
}

// 2. Kontrat ABI ve Adresi (ÖRNEK - Kendi kontratınızı ekleyin)
const CONTRACT_ADDRESS = '0x123456789...'; // FDAI kontrat adresi
const CONTRACT_ABI = [
    {
        "inputs": [],
        "name": "buyTokens",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }
];

// 3. Gerçek Cüzdan Bağlantısı
async function connectWallet() {
    try {
        const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
        });
        
        const account = accounts[0];
        const balance = await web3.eth.getBalance(account);
        const bnbBalance = web3.utils.fromWei(balance, 'ether');
        
        document.getElementById('walletAddress').textContent = 
            `${account.substring(0, 6)}...${account.substring(38)}`;
        document.getElementById('bnbBalance').textContent = 
            `BNB Balance: ${parseFloat(bnbBalance).toFixed(4)}`;
        
        return account;
    } catch (error) {
        console.error("Bağlantı hatası:", error);
        alert("Cüzdan bağlantısı başarısız: " + error.message);
    }
}

// 4. Gerçek Token Satın Alma
async function buyTokens() {
    const bnbAmount = parseFloat(document.getElementById('bnbAmount').value);
    const account = await web3.eth.getAccounts();
    
    if (!bnbAmount || bnbAmount <= 0) {
        alert("Geçersiz miktar!");
        return;
    }

    try {
        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        const weiAmount = web3.utils.toWei(bnbAmount.toString(), 'ether');
        
        await contract.methods.buyTokens()
            .send({
                from: account[0],
                value: weiAmount,
                gas: 300000 // Gas limit ayarı
            })
            .on('transactionHash', (hash) => {
                console.log("TX Hash:", hash);
                alert(`İşlem gönderildi! Hash: ${hash}`);
            })
            .on('receipt', (receipt) => {
                alert("Satın alma başarılı!");
            })
            .on('error', (error) => {
                throw error;
            });
    } catch (error) {
        console.error("Satın alma hatası:", error);
        alert("İşlem başarısız: " + error.message);
    }
}

// 5. Token Bakiyesi Sorgulama
async function checkBalance() {
    const account = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    
    const balance = await contract.methods.balanceOf(account[0]).call();
    console.log("Token bakiyesi:", balance);
    return balance;
}

// 6. Event Listener'lar
document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
document.getElementById('buyBtn').addEventListener('click', buyTokens);

// 7. BNB/FDAI Hesaplama
document.getElementById('bnbAmount').addEventListener('input', function() {
    const bnbAmount = parseFloat(this.value);
    if (bnbAmount > 0) {
        const fdaiAmount = bnbAmount * FDAI_PER_BNB;
        document.getElementById('fdaiAmount').textContent = fdaiAmount.toLocaleString();
    }
});
