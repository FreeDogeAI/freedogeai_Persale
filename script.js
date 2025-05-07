// Constants
const FDAI_PER_BNB = 120000000000; // 120 billion FDAI per 1 BNB
const PRESALE_END_DATE = new Date();
PRESALE_END_DATE.setDate(PRESALE_END_DATE.getDate() + 90); // 90 days from now

// DOM Elements
const languageBtn = document.getElementById('languageBtn');
const currentLanguage = document.getElementById('currentLanguage');
const languageDropdown = document.getElementById('languageDropdown');
const connectWalletBtn = document.getElementById('connectWalletBtn');
const walletInfo = document.getElementById('walletInfo');
const walletAddress = document.getElementById('walletAddress');
const bnbBalance = document.getElementById('bnbBalance');
const bnbAmountInput = document.getElementById('bnbAmount');
const calculationResult = document.getElementById('calculationResult');
const fdaiAmount = document.getElementById('fdaiAmount');
const buyBtn = document.getElementById('buyBtn');
const walletModal = document.getElementById('walletModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const metamaskOption = document.getElementById('metamaskOption');
const trustwalletOption = document.getElementById('trustwalletOption');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const daysLabel = document.getElementById('daysLabel');
const hoursLabel = document.getElementById('hoursLabel');
const minutesLabel = document.getElementById('minutesLabel');
const secondsLabel = document.getElementById('secondsLabel');

// Language translations
const translations = {
    en: {
        mainTitle: "FreeDogeAI",
        mainSubtitle: "The Future of AI-Powered Meme Coins<br>Join the revolution with FDAI - where meme culture meets artificial intelligence",
        presaleTitle: "Presale Information",
        presaleDesc: "Don't miss your chance to be part of the FreeDogeAI revolution. Our presale offers exclusive early access to FDAI tokens at a special price.",
        nameLabel: "Name:",
        symbolLabel: "Symbol:",
        targetLabel: "Total Target:",
        telegramText: "Telegram",
        twitterText: "Twitter",
        whitepaperText: "Download Whitepaper",
        connectText: "Connect Wallet",
        bnbLabel: "Enter BNB Amount:",
        receiveText: "You will receive:",
        buyText: "Buy FDAI Tokens",
        progressText: "Progress: 35%",
        raisedText: "Raised: 364.44 BNB / 1041.26 BNB",
        modalTitle: "Connect Wallet",
        daysLabel: "Days",
        hoursLabel: "Hours",
        minutesLabel: "Minutes",
        secondsLabel: "Seconds"
    },
    tr: {
        mainTitle: "FreeDogeAI",
        mainSubtitle: "AI Destekli Meme Coinlerin Geleceği<br>FDAI ile devrime katılın - meme kültürü ile yapay zekanın buluşma noktası",
        presaleTitle: "Ön Satış Bilgileri",
        presaleDesc: "FreeDogeAI devriminin bir parçası olma şansını kaçırmayın. Ön satışımız, FDAI token'larına özel bir fiyatla erken erişim sağlar.",
        nameLabel: "İsim:",
        symbolLabel: "Sembol:",
        targetLabel: "Toplam Hedef:",
        telegramText: "Telegram",
        twitterText: "Twitter",
        whitepaperText: "Whitepaper İndir",
        connectText: "Cüzdan Bağla",
        bnbLabel: "BNB Miktarı Girin:",
        receiveText: "Alacaksınız:",
        buyText: "FDAI Token Satın Al",
        progressText: "İlerleme: %35",
        raisedText: "Toplanan: 364.44 BNB / 1041.26 BNB",
        modalTitle: "Cüzdan Bağla",
        daysLabel: "Gün",
        hoursLabel: "Saat",
        minutesLabel: "Dakika",
        secondsLabel: "Saniye"
    },
    ru: {
        mainTitle: "FreeDogeAI",
        mainSubtitle: "Будущее мемных монет с ИИ<br>Присоединяйтесь к революции с FDAI - где мем-культура встречает искусственный интеллект",
        presaleTitle: "Информация о предпродаже",
        presaleDesc: "Не упустите шанс стать частью революции FreeDogeAI. Наша предпродажа предлагает эксклюзивный ранний доступ к токенам FDAI по специальной цене.",
        nameLabel: "Название:",
        symbolLabel: "Символ:",
        targetLabel: "Общая цель:",
        telegramText: "Telegram",
        twitterText: "Twitter",
        whitepaperText: "Скачать Whitepaper",
        connectText: "Подключить кошелек",
        bnbLabel: "Введите сумму BNB:",
        receiveText: "Вы получите:",
        buyText: "Купить токены FDAI",
        progressText: "Прогресс: 35%",
        raisedText: "Собрано: 364.44 BNB / 1041.26 BNB",
        modalTitle: "Подключить кошелек",
        daysLabel: "Дней",
        hoursLabel: "Часов",
        minutesLabel: "Минут",
        secondsLabel: "Секунд"
    },
    ja: {
        mainTitle: "FreeDogeAI",
        mainSubtitle: "AI搭載ミームコインの未来<br>FDAIで革命に参加しましょう - ミーム文化と人工知能の出会い",
        presaleTitle: "プレセール情報",
        presaleDesc: "FreeDogeAI革命の一員になるチャンスをお見逃しなく。私たちのプレセールでは、特別価格でFDAIトークンに早期アクセスできます。",
        nameLabel: "名前:",
        symbolLabel: "シンボル:",
        targetLabel: "総目標:",
        telegramText: "Telegram",
        twitterText: "Twitter",
        whitepaperText: "ホワイトペーパーをダウンロード",
        connectText: "ウォレットを接続",
        bnbLabel: "BNB数量を入力:",
        receiveText: "受け取る数量:",
        buyText: "FDAIトークンを購入",
        progressText: "進捗: 35%",
        raisedText: "調達済み: 364.44 BNB / 1041.26 BNB",
        modalTitle: "ウォレットを接続",
        daysLabel: "日",
        hoursLabel: "時間",
        minutesLabel: "分",
        secondsLabel: "秒"
    },
    zh: {
        mainTitle: "FreeDogeAI",
        mainSubtitle: "AI驱动的模因币的未来<br>加入FDAI革命 - 模因文化与人工智能的相遇",
        presaleTitle: "预售信息",
        presaleDesc: "不要错过成为FreeDogeAI革命一部分的机会。我们的预售以特殊价格提供FDAI代币的独家早期访问权限。",
        nameLabel: "名称:",
        symbolLabel: "符号:",
        targetLabel: "总目标:",
        telegramText: "电报",
        twitterText: "推特",
        whitepaperText: "下载白皮书",
        connectText: "连接钱包",
        bnbLabel: "输入BNB数量:",
        receiveText: "您将获得:",
        buyText: "购买FDAI代币",
        progressText: "进度: 35%",
        raisedText: "已筹集: 364.44 BNB / 1041.26 BNB",
        modalTitle: "连接钱包",
        daysLabel: "天",
        hoursLabel: "小时",
        minutesLabel: "分钟",
        secondsLabel: "秒"
    },
    ur: {
        mainTitle: "FreeDogeAI",
        mainSubtitle: "AI سے چلنے والے میم سکوں کا مستقبل<br>FDAI کے ساتھ انقلاب میں شامل ہوں - جہاں میم کلچر اور مصنوعی ذہانت ملتے ہیں",
        presaleTitle: "پری سیل معلومات",
        presaleDesc: "FreeDogeAI انقلاب کا حصہ بننے کا موقع مت چھوڑیں۔ ہماری پری سیل FDAI ٹوکنز تک خصوصی قیمت پر خصوصی ابتدائی رسائی فراہم کرتی ہے۔",
        nameLabel: "نام:",
        symbolLabel: "علامت:",
        targetLabel: "کل ہدف:",
        telegramText: "ٹیلی گرام",
        twitterText: "ٹویٹر",
        whitepaperText: "وائٹ پیپر ڈاؤن لوڈ کریں",
        connectText: "والیٹ سے رابطہ کریں",
        bnbLabel: "BNB رقم درج کریں:",
        receiveText: "آپ کو ملے گا:",
        buyText: "FDAI ٹوکنز خریدیں",
        progressText: "ترقی: 35%",
        raisedText: "جمع شدہ: 364.44 BNB / 1041.26 BNB",
        modalTitle: "والیٹ سے رابطہ کریں",
        daysLabel: "دن",
        hoursLabel: "گھنٹے",
        minutesLabel: "منٹ",
        secondsLabel: "سیکنڈ"
    }
};

// Current language
let currentLang = 'en';

// Initialize the page
function init() {
    // Set up event listeners
    languageBtn.addEventListener('click', toggleLanguageDropdown);
    document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', () => changeLanguage(option.dataset.lang));
    });
    
    connectWalletBtn.addEventListener('click', openWalletModal);
    closeModalBtn.addEventListener('click', closeWalletModal);
    metamaskOption.addEventListener('click', () => connectWallet('metamask'));
    trustwalletOption.addEventListener('click', () => connectWallet('trustwallet'));
    
    bnbAmountInput.addEventListener('input', calculateFDAI);
    buyBtn.addEventListener('click', buyFDAI);
    
    // Start countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === walletModal) {
            closeWalletModal();
        }
    });
}

// Toggle language dropdown
function toggleLanguageDropdown() {
    languageDropdown.classList.toggle('show');
}

// Change language
function changeLanguage(lang) {
    currentLang = lang;
    currentLanguage.textContent = document.querySelector(`.language-option[data-lang="${lang}"]`).textContent;
    
    // Update all text elements
    for (const [key, value] of Object.entries(translations[lang])) {
        const element = document.getElementById(key);
        if (element) {
            if (key === 'mainSubtitle') {
                element.innerHTML = value;
            } else {
                element.textContent = value;
            }
        }
    }
    
    // Close dropdown
    languageDropdown.classList.remove('show');
}

// Open wallet modal
function openWalletModal() {
    walletModal.style.display = 'flex';
}

// Close wallet modal
function closeWalletModal() {
    walletModal.style.display = 'none';
}

// Connect wallet (simulated)
function connectWallet(walletType) {
    // In a real implementation, this would connect to the actual wallet
    console.log(`Connecting to ${walletType}...`);
    
    // Simulate connection
    setTimeout(() => {
        walletAddress.textContent = '0x71C7...3e5A';
        bnbBalance.textContent = 'BNB Balance: 1.25';
        walletInfo.style.display = 'block';
        connectWalletBtn.textContent = translations[currentLang].connectText + ' ✔';
        buyBtn.disabled = false;
        closeWalletModal();
    }, 1000);
}

// Calculate FDAI amount
function calculateFDAI() {
    const bnbAmount = parseFloat(bnbAmountInput.value);
    
    if (bnbAmount && bnbAmount > 0) {
        const fdai = bnbAmount * FDAI_PER_BNB;
        fdaiAmount.textContent = fdai.toLocaleString();
        calculationResult.style.display = 'block';
    } else {
        calculationResult.style.display = 'none';
    }
}

// Buy FDAI (simulated)
function buyFDAI() {
    const bnbAmount = parseFloat(bnbAmountInput.value);
    
    if (bnbAmount && bnbAmount > 0) {
        alert(`${translations[currentLang].buyText} ${bnbAmount} BNB! (Simulated transaction)`);
    }
}

// Update countdown
function updateCountdown() {
    const now = new Date();
    const diff = PRESALE_END_DATE - now;
    
    if (diff <= 0) {
        // Presale has ended
        daysElement.textContent = '00';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    daysElement.textContent = days.toString().padStart(2, '0');
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
}

// Initialize the page when loaded
window.addEventListener('DOMContentLoaded', init);
