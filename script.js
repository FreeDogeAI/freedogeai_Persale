// Dil desteği için çeviriler
const translations = {
    tr: {
        title: "FreeDogeAI Token Ön Satış",
        select_language: "Dil Seç",
        connect_wallet: "Cüzdanı Bağla",
        connect_button: "Cüzdanı Bağla",
        wallet_not_connected: "Cüzdan bağlı değil.",
        buy_token: "FDAI Token Satın Al",
        price_info: "1 BNB = 12,500,000 FDAI",
        min_purchase: "Minimum Alım: 0.035 BNB",
        buy_button: "Satın Al",
        sale_progress: "Satış İlerlemesi",
        progress_info: "Satış durumu yükleniyor...",
        token_info: "Token Bilgileri",
        token_name: "Token Adı",
        token_symbol: "Sembol",
        contract_address: "Kontrat Adresi",
        footer_text: "© 2025 FreeDogeAI. Tüm hakları saklıdır."
    },
    en: {
        title: "FreeDogeAI Token Presale",
        select_language: "Select Language",
        connect_wallet: "Connect Wallet",
        connect_button: "Connect Wallet",
        wallet_not_connected: "Wallet not connected.",
        buy_token: "Buy FDAI Token",
        price_info: "1 BNB = 12,500,000 FDAI",
        min_purchase: "Minimum Purchase: 0.035 BNB",
        buy_button: "Buy",
        sale_progress: "Sale Progress",
        progress_info: "Loading sale status...",
        token_info: "Token Information",
        token_name: "Token Name",
        token_symbol: "Symbol",
        contract_address: "Contract Address",
        footer_text: "© 2025 FreeDogeAI. All rights reserved."
    },
    ar: {
        title: "البيع المسبق لرمز FreeDogeAI",
        select_language: "اختر اللغة",
        connect_wallet: "ربط المحفظة",
        connect_button: "ربط المحفظة",
        wallet_not_connected: "المحفظة غير متصلة.",
        buy_token: "شراء رمز FDAI",
        price_info: "1 BNB = 12,500,000 FDAI",
        min_purchase: "الحد الأدنى للشراء: 0.035 BNB",
        buy_button: "شراء",
        sale_progress: "تقدم البيع",
        progress_info: "جارٍ تحميل حالة البيع...",
        token_info: "معلومات الرمز",
        token_name: "اسم الرمز",
        token_symbol: "الرمز",
        contract_address: "عنوان العقد",
        footer_text: "© 2025 FreeDogeAI. جميع الحقوق محفوظة."
    },
    ru: {
        title: "Предпродажа токена FreeDogeAI",
        select_language: "Выберите язык",
        connect_wallet: "Подключить кошелек",
        connect_button: "Подключить кошелек",
        wallet_not_connected: "Кошелек не подключен.",
        buy_token: "Купить токен FDAI",
        price_info: "1 BNB = 12,500,000 FDAI",
        min_purchase: "Минимальная покупка: 0.035 BNB",
        buy_button: "Купить",
        sale_progress: "Прогресс продаж",
        progress_info: "Загрузка статуса продаж...",
        token_info: "Информация о токене",
        token_name: "Название токена",
        token_symbol: "Символ",
        contract_address: "Адрес контракта",
        footer_text: "© 2025 FreeDogeAI. Все права защищены."
    },
    zh: {
        title: "FreeDogeAI 代币预售",
        select_language: "选择语言",
        connect_wallet: "连接钱包",
        connect_button: "连接钱包",
        wallet_not_connected: "钱包未连接。",
        buy_token: "购买 FDAI 代币",
        price_info: "1 BNB = 12,500,000 FDAI",
        min_purchase: "最低购买量：0.035 BNB",
        buy_button: "购买",
        sale_progress: "销售进度",
        progress_info: "正在加载销售状态...",
        token_info: "代币信息",
        token_name: "代币名称",
        token_symbol: "符号",
        contract_address: "合约地址",
        footer_text: "© 2025 FreeDogeAI。保留所有权利。"
    },
    ja: {
        title: "FreeDogeAI トークンプリセール",
        select_language: "言語を選択",
        connect_wallet: "ウォレットを接続",
        connect_button: "ウォレットを接続",
        wallet_not_connected: "ウォレットが接続されていません。",
        buy_token: "FDAI トークンを購入",
        price_info: "1 BNB = 12,500,000 FDAI",
        min_purchase: "最低購入額：0.035 BNB",
        buy_button: "購入",
        sale_progress: "販売進捗",
        progress_info: "販売状況を読み込み中...",
        token_info: "トークン情報",
        token_name: "トークン名",
        token_symbol: "シンボル",
        contract_address: "コントラクトアドレス",
        footer_text: "© 2025 FreeDogeAI。すべての権利を保有。"
    },
    ur: {
        title: "فری ڈوج ای آئی ٹوکن پری سیل",
        select_language: "زبان منتخب کریں",
        connect_wallet: "والیٹ کنیکٹ کریں",
        connect_button: "والیٹ کنیکٹ کریں",
        wallet_not_connected: "والیٹ کنیکٹ نہیں ہے۔",
        buy_token: "ایف ڈی ای آئی ٹوکن خریدیں",
        price_info: "1 BNB = 12,500,000 FDAI",
        min_purchase: "کم از کم خرید: 0.035 BNB",
        buy_button: "خریدیں",
        sale_progress: "فروخت کی پیشرفت",
        progress_info: "فروخت کی حالت لوڈ ہو رہی ہے...",
        token_info: "ٹوکن کی معلومات",
        token_name: "ٹوکن کا نام",
        token_symbol: "علامت",
        contract_address: "کنٹریکٹ ایڈریس",
        footer_text: "© 2025 FreeDogeAI۔ جملہ حقوق محفوظ ہیں۔"
    }
};

// Dil değiştirme fonksiyonu
function changeLanguage() {
    const lang = document.getElementById("language").value;
    document.querySelectorAll("[data-translate]").forEach(element => {
        const key = element.getAttribute("data-translate");
        element.textContent = translations[lang][key];
    });
    document.documentElement.lang = lang;
}

// Web3 ayarları
let web3;
let contract;
let userAccount;

const contractAddress = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7";
const recipientAddress = "0xd924e01c7d319c5b23708cd622bd1143cd4fb360";
const minPurchase = 0.035; // Minimum 0.035 BNB
const tokenRate = 12500000; // 1 BNB = 12,500,000 FDAI

// Örnek ABI (Kendi kontratınızın ABI'sini buraya ekleyin)
const contractABI = [
    {
        "inputs": [
            { "internalType": "uint256", "name": "amount", "type": "uint256" }
        ],
        "name": "buyTokens",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "tokenRate",
        "outputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSold",
        "outputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Cüzdan bağlantısı
async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            userAccount = (await web3.eth.getAccounts())[0];
            document.getElementById("walletStatus").textContent = translations[document.getElementById("language").value].wallet_connected + `: ${userAccount}`;
            document.getElementById("buyButton").disabled = false;

            // Kontrat başlatma
            contract = new web3.eth.Contract(contractABI, contractAddress);
            updateProgress();
        } catch (error) {
            console.error("Cüzdan bağlantısı başarısız:", error);
            document.getElementById("walletStatus").textContent = translations[document.getElementById("language").value].wallet_connection_failed;
        }
    } else {
        alert(translations[document.getElementById("language").value].install_wallet);
    }
}

// Token satın alma
async function buyTokens() {
    const bnbAmount = document.getElementById("bnbAmount").value;
    const transactionStatus = document.getElementById("transactionStatus");
    const lang = document.getElementById("language").value;

    if (!userAccount) {
        transactionStatus.textContent = translations[lang].connect_wallet_first;
        return;
    }

    if (bnbAmount < minPurchase) {
        transactionStatus.textContent = translations[lang].min_purchase_error.replace("{min}", minPurchase);
        return;
    }

    try {
        const bnbWei = web3.utils.toWei(bnbAmount, "ether");
        const tokenAmount = bnbAmount * tokenRate;

        transactionStatus.textContent = translations[lang].transaction_pending;

        await contract.methods.buyTokens(tokenAmount).send({
            from: userAccount,
            value: bnbWei,
            to: recipientAddress
        });

        transactionStatus.textContent = translations[lang].transaction_success;
        updateProgress();
    } catch (error) {
        console.error("Satın alma hatası:", error);
        transactionStatus.textContent = translations[lang].transaction_failed;
    }
}

// Satış ilerlemesini güncelleme
async function updateProgress() {
    if (contract) {
        try {
            const totalSold = await contract.methods.totalSold().call();
            const progressPercentage = Math.min((totalSold / (1000000000 * tokenRate)) * 100, 100); // Örnek: 1 milyar token hedef
            document.getElementById("progress").style.setProperty('--progress-width', `${progressPercentage}%`);
            document.getElementById("progressText").textContent = translations[document.getElementById("language").value].progress_updated.replace("{percentage}", progressPercentage.toFixed(2));
        } catch (error) {
            console.error("İlerleme güncelleme hatası:", error);
        }
    }
}

// Ek çeviriler için dinamik hata mesajları
translations.tr.wallet_connected = "Bağlı Cüzdan";
translations.tr.wallet_connection_failed = "Cüzdan bağlantısı başarısız.";
translations.tr.install_wallet = "Lütfen Metamask veya Trust Wallet kurun!";
translations.tr.connect_wallet_first = "Lütfen önce cüzdanı bağlayın.";
translations.tr.min_purchase_error = "Minimum alım miktarı {min} BNB'dir.";
translations.tr.transaction_pending = "İşlem gönderiliyor...";
translations.tr.transaction_success = "İşlem başarılı! FDAI token'larınız cüzdanınıza gönderildi.";
translations.tr.transaction_failed = "İşlem başarısız. Lütfen tekrar deneyin.";
translations.tr.progress_updated = "Satış ilerlemesi: %{percentage} tamamlandı.";

translations.en.wallet_connected = "Connected Wallet";
translations.en.wallet_connection_failed = "Wallet connection failed.";
translations.en.install_wallet = "Please install Metamask or Trust Wallet!";
translations.en.connect_wallet_first = "Please connect your wallet first.";
translations.en.min_purchase_error = "Minimum purchase amount is {min} BNB.";
translations.en.transaction_pending = "Transaction pending...";
translations.en.transaction_success = "Transaction successful! FDAI tokens sent to your wallet.";
translations.en.transaction_failed = "Transaction failed. Please try again.";
translations.en.progress_updated = "Sale progress: {percentage}% completed.";

// Diğer diller için benzer çeviriler eklenebilir.

// Sayfa yüklendiğinde dil ayarlarını başlat
document.addEventListener("DOMContentLoaded", () => {
    changeLanguage();
    document.getElementById("progress").style.setProperty('--progress-width', '0%');
});
