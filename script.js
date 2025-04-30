
// Dil Desteği
const translations = {
    tr: {
        title: "FreeDogeAI (FDAI) Token Satışı",
        connectText: "Cüzdanı Bağla",
        addBNBText: "BNB Ağını Ekle (ChainList)",
        buyTitle: "FDAI Satın Al",
        buyText: "Satın Al",
        expectedFDaiLabel: "Alacağınız FDAI:",
        paymentAddressLabel: "BNB Gönderim Adresi:",
        paymentWarning: "⚠️ Sadece yukarıdaki adrese BNB gönderin!",
        tokenContractLabel: "Token Kontratı:",
        tokenPriceLabel: "Fiyat:",
        minBuyLabel: "Minimum Alım:"
    },
    en: {
        title: "FreeDogeAI (FDAI) Token Sale",
        connectText: "Connect Wallet",
        addBNBText: "Add BNB Network (ChainList)",
        buyTitle: "Buy FDAI",
        buyText: "Buy Now",
        expectedFDaiLabel: "Expected FDAI:",
        paymentAddressLabel: "Payment Address:",
        paymentWarning: "⚠️ Send BNB only to the above address!",
        tokenContractLabel: "Token Contract:",
        tokenPriceLabel: "Price:",
        minBuyLabel: "Minimum Buy:"
    },
    ru: {
        title: "FreeDogeAI (FDAI) Продажа токенов",
        connectText: "Подключить кошелек",
        addBNBText: "Добавить сеть BNB (ChainList)",
        buyTitle: "Купить FDAI",
        buyText: "Купить",
        expectedFDaiLabel: "Получите FDAI:",
        paymentAddressLabel: "Адрес для оплаты:",
        paymentWarning: "⚠️ Отправляйте BNB только на этот адрес!",
        tokenContractLabel: "Контракт токена:",
        tokenPriceLabel: "Цена:",
        minBuyLabel: "Минимальная покупка:"
    },
    zh: {
        title: "FreeDogeAI (FDAI) 代币销售",
        connectText: "连接钱包",
        addBNBText: "添加BNB网络 (ChainList)",
        buyTitle: "购买FDAI",
        buyText: "立即购买",
        expectedFDaiLabel: "预计获得FDAI:",
        paymentAddressLabel: "付款地址:",
        paymentWarning: "⚠️ 仅向上述地址发送BNB！",
        tokenContractLabel: "代币合约:",
        tokenPriceLabel: "价格:",
        minBuyLabel: "最低购买:"
    }
};

function changeLanguage(lang) {
    const elements = document.querySelectorAll('[id]');
    elements.forEach(el => {
        if (translations[lang] && translations[lang][el.id]) {
            el.textContent = translations[lang][el.id];
        }
    });
}

// MetaMask Bağlantısı
document.getElementById('connectWallet').addEventListener('click', async () => {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Connected:", accounts[0]);
            checkNetwork();
        } catch (error) {
            console.error("User rejected request:", error);
        }
    } else {
        alert("MetaMask yüklü değil! Lütfen yükleyin.");
    }
});

// BNB Ağ Kontrolü
async function checkNetwork() {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (chainId !== "0x38") { // BNB Chain ID: 56 (0x38)
        document.getElementById('addBNB').style.display = 'block';
    }
}

// ChainList'e Yönlendirme
document.getElementById('addBNB').addEventListener('click', () => {
    window.open("https://chainlist.org/chain/56", "_blank");
});

// FDAI Hesaplama
document.getElementById('bnbAmount').addEventListener('input', (e) => {
    const bnbAmount = parseFloat(e.target.value);
    if (!isNaN(bnbAmount)) {
        const fdaiAmount = bnbAmount * 12500000;
        document.getElementById('fdaicalc').textContent = fdaiAmount.toLocaleString();
    } else {
        document.getElementById('fdaicalc').textContent = "0";
    }
});

// Varsayılan Dil
changeLanguage('tr');
