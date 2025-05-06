// Constants
const FDAI_PER_BNB = 120000000000; // 120 billion FDAI per 1 BNB
const FDAI_TOKEN_ADDRESS = "0x8161698A74F2ea0035B9912ED60140893Ac0f39C";
const BNB_RECEIVER_ADDRESS = "0xd924e01c7d319c5b23708cd622bd1143cd4fb360";

// DOM Elements
const languageBtn = document.getElementById('languageBtn');
const languageDropdown = document.getElementById('languageDropdown');
const currentLanguage = document.getElementById('currentLanguage');
const connectWalletBtn = document.getElementById('connectWalletBtn');
const walletInfo = document.getElementById('walletInfo');
const walletAddress = document.getElementById('walletAddress');
const bnbBalance = document.getElementById('bnbBalance');
const purchasedFdai = document.getElementById('purchasedFdai');
const bnbAmountInput = document.getElementById('bnbAmount');
const calculationResult = document.getElementById('calculationResult');
const fdaiAmount = document.getElementById('fdaiAmount');
const buyBtn = document.getElementById('buyBtn');
const tokenOwnership = document.getElementById('tokenOwnership');
const ownedTokens = document.getElementById('ownedTokens');
const whitepaperBtn = document.getElementById('whitepaperBtn');
const walletModal = document.getElementById('walletModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const metamaskOption = document.getElementById('metamaskOption');
const trustwalletOption = document.getElementById('trustwalletOption');

// State
let isWalletConnected = false;
let userAddress = '';
let userFdaiBalance = 0;

// Language translations
const translations = {
    en: {
        title: "Presale Ends Soon",
        subtitle: "Don't miss your chance to participate in the FreeDogeAI presale",
        connectWallet: "Connect Wallet",
        walletInfo: "Wallet Information",
        enterBnb: "Enter BNB Amount:",
        youWillReceive: "You will receive:",
        buyTokens: "Buy Tokens",
        youOwn: "You Own:",
        tokenNote: "Your tokens will be reflected in your wallet after the presale ends.",
        downloadWhitepaper: "Download Whitepaper",
        joinCommunity: "Join Our Community",
        communityDesc: "Stay updated and connected with the FreeDogeAI community",
        connectModalTitle: "Connect Wallet"
    },
    tr: {
        title: "Ön Satış Yakında Bitiyor",
        subtitle: "FreeDogeAI ön satışına katılma şansını kaçırma",
        connectWallet: "Cüzdan Bağla",
        walletInfo: "Cüzdan Bilgisi",
        enterBnb: "BNB Miktarı Girin:",
        youWillReceive: "Alacaksınız:",
        buyTokens: "Token Satın Al",
        youOwn: "Sahip Olduğunuz:",
        tokenNote: "Tokenleriniz ön satış sona erdikten sonra cüzdanınıza yansıtılacaktır.",
        downloadWhitepaper: "Whitepaper İndir",
        joinCommunity: "Topluluğumuza Katılın",
        communityDesc: "FreeDogeAI topluluğuyla güncel kalın ve bağlantıda olun",
        connectModalTitle: "Cüzdan Bağla"
    },
    ja: {
        title: "プレセール終了間近",
        subtitle: "FreeDogeAIプレセールに参加するチャンスをお見逃しなく",
        connectWallet: "ウォレットを接続",
        walletInfo: "ウォレット情報",
        enterBnb: "BNB数量を入力:",
        youWillReceive: "受け取ります:",
        buyTokens: "トークンを購入",
        youOwn: "所有している:",
        tokenNote: "トークンはプレセール終了後にウォレットに反映されます。",
        downloadWhitepaper: "ホワイトペーパーをダウンロード",
        joinCommunity: "コミュニティに参加",
        communityDesc: "FreeDogeAIコミュニティとつながり、最新情報を入手しましょう",
        connectModalTitle: "ウォレットを接続"
    },
    zh: {
        title: "预售即将结束",
        subtitle: "不要错过参与FreeDogeAI预售的机会",
        connectWallet: "连接钱包",
        walletInfo: "钱包信息",
        enterBnb: "输入BNB数量:",
        youWillReceive: "你将收到:",
        buyTokens: "购买代币",
        youOwn: "你拥有:",
        tokenNote: "预售结束后，代币将反映在你的钱包中。",
        downloadWhitepaper: "下载白皮书",
        joinCommunity: "加入我们的社区",
        communityDesc: "与FreeDogeAI社区保持联系并获取最新信息",
        connectModalTitle: "连接钱包"
    },
    ru: {
        title: "Предпродажа скоро закончится",
        subtitle: "Не упустите шанс принять участие в предпродаже FreeDogeAI",
        connectWallet: "Подключить кошелек",
        walletInfo: "Информация о кошельке",
        enterBnb: "Введите количество BNB:",
        youWillReceive: "Вы получите:",
        buyTokens: "Купить токены",
        youOwn: "В вашем владении:",
        tokenNote: "Ваши токены будут отражены в вашем кошельке после окончания предпродажи.",
        downloadWhitepaper: "Скачать Whitepaper",
        joinCommunity: "Присоединяйтесь к нашему сообществу",
        communityDesc: "Будьте в курсе и оставайтесь на связи с сообществом FreeDogeAI",
        connectModalTitle: "Подключить кошелек"
    }
};

// Set initial language
let currentLang = 'en';
updateLanguage(currentLang);

// Event Listeners
languageBtn.addEventListener('click', () => {
    languageDropdown.classList.toggle('show');
});

document.querySelectorAll('.language-option').forEach(option => {
    option.addEventListener('click', () => {
        const lang = option.getAttribute('data-lang');
        currentLang = lang;
        currentLanguage.textContent = option.textContent;
        languageDropdown.classList.remove('show');
        updateLanguage(lang);
    });
});

// Close language dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!languageBtn.contains(e.target) && !languageDropdown.contains(e.target)) {
        languageDropdown.classList.remove('show');
    }
});

connectWalletBtn.addEventListener('click', () => {
    walletModal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
    walletModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === walletModal) {
        walletModal.style.display = 'none';
    }
});

metamaskOption.addEventListener('click', connectMetaMask);
trustwalletOption.addEventListener('click', connectTrustWallet);

bnbAmountInput.addEventListener('input', calculateFdai);

buyBtn.addEventListener('click', buyTokens);

whitepaperBtn.addEventListener('click', () => {
    // In a real implementation, this would link to your actual whitepaper PDF
    alert('Downloading Whitepaper...');
    // window.location.href = 'path/to/whitepaper.pdf';
});

// Functions
function updateLanguage(lang) {
    const texts = translations[lang];
    
    document.getElementById('mainTitle').textContent = texts.title;
    document.getElementById('mainSubtitle').textContent = texts.subtitle;
    connectWalletBtn.textContent = texts.connectWallet;
    document.querySelector('.wallet-info h3').textContent = texts.walletInfo;
    document.getElementById('bnbAmountLabel').textContent = texts.enterBnb;
    document.getElementById('buyBtn').textContent = texts.buyTokens;
    document.getElementById('ownershipText').textContent = texts.youOwn;
    document.getElementById('tokenNote').textContent = texts.tokenNote;
    document.getElementById('whitepaperText').textContent = texts.downloadWhitepaper;
    document.getElementById('communityTitle').textContent = texts.joinCommunity;
    document.getElementById('communityDesc').textContent = texts.communityDesc;
    document.getElementById('modalTitle').textContent = texts.connectModalTitle;
    
    // Update calculation text
    if (calculationResult.style.display !== 'none') {
        calculationResult.innerHTML = `${texts.youWillReceive} <span id="fdaiAmount">0</span> FDAI`;
    }
}

async function connectMetaMask() {
    if (typeof window.ethereum === 'undefined') {
        alert('MetaMask is not installed! Please install it first.');
        return;
    }
    
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        userAddress = accounts[0];
        handleWalletConnection(userAddress);
        
        // Listen for account changes
        window.ethereum.on('accountsChanged', (newAccounts) => {
            if (newAccounts.length === 0) {
                // Wallet disconnected
                handleWalletDisconnection();
            } else {
                // Account changed
                userAddress = newAccounts[0];
                updateWalletInfo(userAddress);
            }
        });
        
        // Listen for chain changes
        window.ethereum.on('chainChanged', () => {
            window.location.reload();
        });
        
        walletModal.style.display = 'none';
    } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        alert('Failed to connect to MetaMask: ' + error.message);
    }
}

async function connectTrustWallet() {
    if (window.trustwallet) {
        // Trust Wallet browser
        try {
            const accounts = await window.trustwallet.request({ method: 'eth_requestAccounts' });
            userAddress = accounts[0];
            handleWalletConnection(userAddress);
            walletModal.style.display = 'none';
        } catch (error) {
            console.error('Error connecting to Trust Wallet:', error);
            alert('Failed to connect to Trust Wallet: ' + error.message);
        }
    } else if (window.ethereum) {
        // Trust Wallet mobile (via WalletConnect)
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAddress = accounts[0];
            handleWalletConnection(userAddress);
            walletModal.style.display = 'none';
        } catch (error) {
            console.error('Error connecting to Trust Wallet:', error);
            alert('Failed to connect to Trust Wallet: ' + error.message);
        }
    } else {
        alert('Trust Wallet is not detected!');
    }
}

function handleWalletConnection(address) {
    isWalletConnected = true;
    userAddress = address;
    
    // Update UI
    connectWalletBtn.textContent = translations[currentLang].connectWallet + ' ✔';
    walletInfo.style.display = 'block';
    walletAddress.textContent = address;
    buyBtn.disabled = false;
    
    // In a real implementation, you would fetch these from the blockchain
    bnbBalance.textContent = '0.0 BNB';
    purchasedFdai.textContent = '0 FDAI';
    
    // Show token ownership if they have any
    if (userFdaiBalance > 0) {
        tokenOwnership.style.display = 'block';
        ownedTokens.textContent = `${userFdaiBalance} FDAI`;
    }
}

function handleWalletDisconnection() {
    isWalletConnected = false;
    userAddress = '';
    
    // Update UI
    connectWalletBtn.textContent = translations[currentLang].connectWallet;
    walletInfo.style.display = 'none';
    buyBtn.disabled = true;
    calculationResult.style.display = 'none';
    bnbAmountInput.value = '';
}

function updateWalletInfo(address) {
    walletAddress.textContent = address;
    // In a real implementation, you would update the balance here
}

function calculateFdai() {
    const bnbAmount = parseFloat(bnbAmountInput.value);
    
    if (isNaN(bnbAmount)) {
        calculationResult.style.display = 'none';
        return;
    }
    
    const fdai = bnbAmount * FDAI_PER_BNB;
    fdaiAmount.textContent = formatNumber(fdai);
    calculationResult.style.display = 'block';
}

function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(2) + 'B';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(2) + 'K';
    }
    return num.toFixed(2);
}

async function buyTokens() {
    if (!isWalletConnected) {
        alert('Please connect your wallet first!');
        return;
    }
    
    const bnbAmount = parseFloat(bnbAmountInput.value);
    
    if (isNaN(bnbAmount)) {
        alert('Please enter a valid BNB amount');
        return;
    }
    
    // In a real implementation, this would send a transaction to your smart contract
    try {
        buyBtn.disabled = true;
        buyBtn.textContent = 'Processing...';
        
        // Simulate transaction delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Calculate purchased FDAI
        const purchased = bnbAmount * FDAI_PER_BNB;
        userFdaiBalance += purchased;
        
        // Update UI
        purchasedFdai.textContent = `${userFdaiBalance} FDAI`;
        tokenOwnership.style.display = 'block';
        ownedTokens.textContent = `${userFdaiBalance} FDAI`;
        
        // Reset form
        bnbAmountInput.value = '';
        calculationResult.style.display = 'none';
        
        alert(`Successfully purchased ${purchased} FDAI tokens!`);
    } catch (error) {
        console.error('Error purchasing tokens:', error);
        alert('Failed to purchase tokens: ' + error.message);
    } finally {
        buyBtn.disabled = false;
        buyBtn.textContent = translations[currentLang].buyTokens;
    }
}

// Check if wallet is already connected on page load
window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                userAddress = accounts[0];
                handleWalletConnection(userAddress);
            }
        } catch (error) {
            console.error('Error checking connected accounts:', error);
        }
    }
});
