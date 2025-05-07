// Sabitler
const PRESALE_END_DATE = new Date("2025-08-05T00:00:00"); // Ön satış bitiş tarihi (90 gün sonrası)
const PRESALE_WALLET_ADDRESS = "0xd924e01c7d319c5b23708cd622bd1143cd4fb360"; // BNB gönderilecek cüzdan adresi
const BSC_CHAIN_ID = "0x38"; // BSC Mainnet
const FDAI_PER_BNB = 120000000000; // 1 BNB = 120 milyar FDAI
const WHITEPAPER_URL = "whitepaper.pdf"; // PDF dosyasının yolu

// DOM Elemanları
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
const progressText = document.getElementById('progressText');
const raisedText = document.getElementById('raisedText');
const progressFill = document.querySelector('.progress-fill');
const whitepaperBtn = document.getElementById('whitepaperBtn');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

// Token Info Elemanları (statik metinlerin çevrilebilmesi için)
const tokenRows = document.querySelectorAll('.token-row');
const nameLabel = tokenRows[0].querySelector('.token-label'); // "Name:"
const symbolLabel = tokenRows[1].querySelector('.token-label'); // "Symbol:"
const targetLabel = tokenRows[2].querySelector('.token-label'); // "Total Target:"
const bnbToFdaiLabel = tokenRows[3].querySelector('.token-label'); // "1 BNB ="

// Ethers.js kurulumu
let provider, signer, userAddress;
let currentLang = 'tr'; // Varsayılan dil

// Dil yönetimi
const translations = {
    en: {
        mainTitle: "FreeDogeAI",
        mainSubtitle: "The Future of AI-Powered Meme Coins<br>Join the revolution with FDAI - where meme culture meets artificial intelligence",
        presaleTitle: "Presale Information",
        presaleDesc: "Don't miss your chance to be part of the FreeDogeAI revolution. Send BNB to the address below, and FDAI tokens will be sent to you manually.",
        connectText: "Connect Wallet",
        bnbLabel: "Enter BNB Amount:",
        buyText: "Buy FDAI Tokens",
        receiveText: "You will receive:",
        telegramText: "Telegram",
        twitterText: "Twitter",
        whitepaperText: "Download Whitepaper",
        modalTitle: "Connect Wallet",
        daysLabel: "Days",
        hoursLabel: "Hours",
        minutesLabel: "Minutes",
        secondsLabel: "Seconds",
        nameLabel: "Name:",
        symbolLabel: "Symbol:",
        targetLabel: "Total Target:",
        bnbToFdaiLabel: "1 BNB =",
        addressLabel: "Address:",
        balanceLabel: "Balance:",
        sendingText: "Sending...",
        presaleEndedText: "Presale Ended",
        copyText: "Copy"
    },
    tr: {
        mainTitle: "FreeDogeAI",
        mainSubtitle: "Yapay Zeka Destekli Meme Coin’lerin Geleceği<br>FDAI ile devrime katıl - meme kültürü yapay zeka ile buluşuyor",
        presaleTitle: "Ön Satış Bilgisi",
        presaleDesc: "FreeDogeAI devriminin bir parçası olma şansını kaçırma. Aşağıdaki adrese BNB gönder, FDAI tokenları manuel olarak gönderilecektir.",
        connectText: "Cüzdanı Bağla",
        bnbLabel: "BNB Miktarı Gir:",
        buyText: "FDAI Token Satın Al",
        receiveText: "Alacağın miktar:",
        telegramText: "Telegram",
        twitterText: "Twitter",
        whitepaperText: "Beyaz Kağıdı İndir",
        modalTitle: "Cüzdanı Bağla",
        daysLabel: "Gün",
        hoursLabel: "Saat",
        minutesLabel: "Dakika",
        secondsLabel: "Saniye",
        nameLabel: "Ad:",
        symbolLabel: "Sembol:",
        targetLabel: "Toplam Hedef:",
        bnbToFdaiLabel: "1 BNB =",
        addressLabel: "Adres:",
        balanceLabel: "Bakiye:",
        sendingText: "Gönderiliyor...",
        presaleEndedText: "Ön Satış Sona Erdi",
        copyText: "Kopyala"
    },
    zh: {
        mainTitle: "FreeDogeAI",
        mainSubtitle: "人工智能驱动的迷因币的未来<br>加入FDAI革命 - 迷因文化与人工智能的结合",
        presaleTitle: "预售信息",
        presaleDesc: "不要错过加入FreeDogeAI革命的机会。向下面的地址发送BNB，FDAI代币将手动发送给您。",
        connectText: "连接钱包",
        bnbLabel: "输入BNB数量：",
        buyText: "购买FDAI代币",
        receiveText: "您将收到：",
        telegramText: "Telegram",
        twitterText: "Twitter",
        whitepaperText: "下载白皮书",
        modalTitle: "连接钱包",
        daysLabel: "天",
        hoursLabel: "小时",
        minutesLabel: "分钟",
        secondsLabel: "秒",
        nameLabel: "名称：",
        symbolLabel: "符号：",
        targetLabel: "总目标：",
        bnbToFdaiLabel: "1 BNB =",
        addressLabel: "地址：",
        balanceLabel: "余额：",
        sendingText: "发送中...",
        presaleEndedText: "预售已结束",
        copyText: "复制"
    },
    ja: {
        mainTitle: "FreeDogeAI",
        mainSubtitle: "AIを活用したミームコインの未来<br>FDAIで革命に参加しよう - ミーム文化と人工知能が融合",
        presaleTitle: "プレセール情報",
        presaleDesc: "FreeDogeAI革命に参加するチャンスを逃さないでください。以下のアドレスにBNBを送ると、FDAIトークンが手動で送られます。",
        connectText: "ウォレットを接続",
        bnbLabel: "BNB数量を入力：",
        buyText: "FDAIトークンを購入",
        receiveText: "受け取る数量：",
        telegramText: "Telegram",
        twitterText: "Twitter",
        whitepaperText: "ホワイトペーパーをダウンロード",
        modalTitle: "ウォレットを接続",
        daysLabel: "日",
        hoursLabel: "時間",
        minutesLabel: "分",
        secondsLabel: "秒",
        nameLabel: "名前：",
        symbolLabel: "シンボル：",
        targetLabel: "総目標：",
        bnbToFdaiLabel: "1 BNB =",
        addressLabel: "アドレス：",
        balanceLabel: "残高：",
        sendingText: "送信中...",
        presaleEndedText: "プレセール終了",
        copyText: "コピー"
    }
};

function updateLanguage(lang) {
    currentLang = lang;
    currentLanguage.textContent = languageDropdown.querySelector(`[data-lang="${lang}"]`).textContent;
    document.getElementById('mainTitle').innerHTML = translations[lang].mainTitle;
    document.getElementById('mainSubtitle').innerHTML = translations[lang].mainSubtitle;
    document.getElementById('presaleTitle').textContent = translations[lang].presaleTitle;
    document.getElementById('presaleDesc').textContent = translations[lang].presaleDesc;
    document.getElementById('connectText').textContent = translations[lang].connectText;
    document.getElementById('bnbLabel').textContent = translations[lang].bnbLabel;
    document.getElementById('buyText').textContent = translations[lang].buyText;
    document.getElementById('receiveText').textContent = translations[lang].receiveText;
    document.getElementById('telegramText').textContent = translations[lang].telegramText;
    document.getElementById('twitterText').textContent = translations[lang].twitterText;
    document.getElementById('whitepaperText').textContent = translations[lang].whitepaperText;
    document.getElementById('modalTitle').textContent = translations[lang].modalTitle;
    document.getElementById('daysLabel').textContent = translations[lang].daysLabel;
    document.getElementById('hoursLabel').textContent = translations[lang].hoursLabel;
    document.getElementById('minutesLabel').textContent = translations[lang].minutesLabel;
    document.getElementById('secondsLabel').textContent = translations[lang].secondsLabel;
    nameLabel.textContent = translations[lang].nameLabel;
    symbolLabel.textContent = translations[lang].symbolLabel;
    targetLabel.textContent = translations[lang].targetLabel;
    bnbToFdaiLabel.textContent = translations[lang].bnbToFdaiLabel;

    // Cüzdan bilgileri varsa güncelle
    if (userAddress) {
        walletAddress.textContent = `${translations[lang].addressLabel} ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
        const balance = ethers.utils.formatEther(provider.getBalance(userAddress));
        bnbBalance.textContent = `${translations[lang].balanceLabel} ${balance} BNB`;
    }

    // İlerleme çubuğu metinlerini güncelle
    updatePresaleProgress();
}

languageBtn.addEventListener('click', () => {
    languageDropdown.classList.toggle('show');
});

languageDropdown.addEventListener('click', (e) => {
    if (e.target.classList.contains('language-option')) {
        const lang = e.target.dataset.lang;
        updateLanguage(lang);
        languageDropdown.classList.remove('show');
    }
});

// Geri sayım zamanlayıcısı
function updateCountdown() {
    const now = new Date();
    const timeLeft = PRESALE_END_DATE.getTime() - now.getTime();
    if (timeLeft <= 0) {
        daysElement.textContent = '00';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        buyBtn.disabled = true;
        buyBtn.textContent = translations[currentLang].presaleEndedText;
        return;
    }
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    daysElement.textContent = days.toString().padStart(2, '0');
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
}
setInterval(updateCountdown, 1000);
updateCountdown(); // İlk çalıştırmada hemen güncelle

// BSC Mainnet'e geçiş
async function switchToBSC() {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: BSC_CHAIN_ID }]
        });
    } catch (switchError) {
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: BSC_CHAIN_ID,
                        chainName: 'Binance Smart Chain Mainnet',
                        rpcUrls: ['https://bsc-dataseed.binance.org/'],
                        nativeCurrency: {
                            name: 'BNB',
                            symbol: 'BNB',
                            decimals: 18
                        },
                        blockExplorerUrls: ['https://bscscan.com']
                    }]
                });
            } catch (addError) {
                console.error("Ağ ekleme başarısız:", addError);
                alert("BSC Mainnet ağı eklenemedi. Lütfen manuel olarak ekleyin.");
            }
        } else {
            console.error("Ağ değiştirme hatası:", switchError);
            alert("Ağ değiştirme başarısız. Lütfen BSC Mainnet'e manuel olarak geçin.");
        }
    }
}

// Cüzdan bağlantısı (MetaMask ve Trust Wallet)
async function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
        alert("Lütfen MetaMask veya Trust Wallet kurun.");
        return;
    }

    try {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        await switchToBSC(); // BSC Mainnet'e geçiş
        signer = provider.getSigner();
        userAddress = await signer.getAddress();

        // Arayüzü güncelle
        walletAddress.textContent = `${translations[currentLang].addressLabel} ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
        const balance = await provider.getBalance(userAddress);
        bnbBalance.textContent = `${translations[currentLang].balanceLabel} ${ethers.utils.formatEther(balance)} BNB`;
        walletInfo.style.display = 'block';
        connectWalletBtn.textContent = translations[currentLang].connectText === "Cüzdanı Bağla" ? "Bağlandı" : "Connected";
        connectWalletBtn.disabled = true;
        buyBtn.disabled = false;
        walletModal.style.display = 'none';

        // Ön satış cüzdan adresini göster
        const presaleDesc = document.getElementById('presaleDesc');
        presaleDesc.innerHTML = translations[currentLang].presaleDesc + `<br><br>BNB Gönderilecek Adres: <strong>${PRESALE_WALLET_ADDRESS}</strong> <button onclick="copyAddress()">${translations[currentLang].copyText}</button>`;
    } catch (error) {
        console.error("Cüzdan bağlantısı başarısız:", error);
        alert("Cüzdan bağlanamadı: " + (error.message || "Bilinmeyen bir hata oluştu. Lütfen BSC Mainnet ağında olduğunuzdan emin olun."));
    }
}

// Cüzdan adresini kopyala
function copyAddress() {
    navigator.clipboard.writeText(PRESALE_WALLET_ADDRESS).then(() => {
        alert("Cüzdan adresi kopyalandı!");
    }).catch(() => {
        alert("Adres kopyalanamadı, lütfen manuel olarak kopyalayın.");
    });
}

connectWalletBtn.addEventListener('click', () => {
    walletModal.style.display = 'flex';
});

metamaskOption.addEventListener('click', connectWallet);
trustwalletOption.addEventListener('click', connectWallet);
closeModalBtn.addEventListener('click', () => {
    walletModal.style.display = 'none';
});

// BNB miktarına göre FDAI tahmini (Otomatik Hesaplama)
bnbAmountInput.addEventListener('input', () => {
    const bnbAmount = parseFloat(bnbAmountInput.value);
    if (isNaN(bnbAmount) || bnbAmount <= 0) {
        calculationResult.style.display = 'none';
        buyBtn.disabled = true;
        return;
    }
    const fdai = bnbAmount * FDAI_PER_BNB;
    fdaiAmount.textContent = fdai.toLocaleString();
    calculationResult.style.display = 'block';
    buyBtn.disabled = false;
});

// BNB gönderme işlemi (Gerçek İşlem - Satın Al Butonu)
buyBtn.addEventListener('click', async () => {
    if (!signer || !userAddress) {
        alert("Lütfen önce cüzdanınızı bağlayın.");
        return;
    }

    const bnbAmount = parseFloat(bnbAmountInput.value);
    if (isNaN(bnbAmount) || bnbAmount <= 0) {
        alert("Lütfen geçerli bir BNB miktarı girin.");
        return;
    }

    try {
        const balance = await provider.getBalance(userAddress);
        const balanceInEther = ethers.utils.formatEther(balance);
        if (parseFloat(balanceInEther) < bnbAmount) {
            alert("Yetersiz BNB bakiyesi! Mevcut bakiye: " + balanceInEther + " BNB");
            return;
        }

        const bnbValue = ethers.utils.parseEther(bnbAmount.toString());
        const gasPrice = await provider.getGasPrice();
        const gasLimit = 21000; // Basit transfer için standart gas limiti

        const tx = await signer.sendTransaction({
            to: PRESALE_WALLET_ADDRESS,
            value: bnbValue,
            gasPrice: gasPrice,
            gasLimit: gasLimit
        });

        buyBtn.disabled = true;
        buyBtn.textContent = translations[currentLang].sendingText;
        
        const receipt = await tx.wait();
        alert(`BNB başarıyla gönderildi!\nTx Hash: ${receipt.transactionHash}\nFDAI tokenları manuel olarak gönderilecektir.`);

        bnbAmountInput.value = '';
        calculationResult.style.display = 'none';
        buyBtn.disabled = false;
        buyBtn.textContent = translations[currentLang].buyText;

        // Bakiyeyi güncelle
        const updatedBalance = await provider.getBalance(userAddress);
        bnbBalance.textContent = `${translations[currentLang].balanceLabel} ${ethers.utils.formatEther(updatedBalance)} BNB`;
    } catch (error) {
        console.error("BNB gönderimi başarısız:", error);
        let errorMessage = "BNB gönderimi başarısız.";
        if (error.code === 4001) {
            errorMessage = "İşlem kullanıcı tarafından reddedildi.";
        } else if (error.message.includes("insufficient funds")) {
            errorMessage = "Yetersiz bakiye. Lütfen cüzdanınızda yeterli BNB olduğundan emin olun.";
        } else {
            errorMessage += " Hata: " + (error.message || "Bilinmeyen bir hata oluştu.");
        }
        alert(errorMessage);
        buyBtn.disabled = false;
        buyBtn.textContent = translations[currentLang].buyText;
    }
});

// Whitepaper indirme
whitepaperBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = WHITEPAPER_URL;
    link.download = 'whitepaper.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Ön satış ilerlemesi (statik)
function updatePresaleProgress() {
    const raisedBNB = 364.44;
    const targetBNB = 1041.26;
    const progress = (raisedBNB / targetBNB) * 100;

    progressText.textContent = `${translations[currentLang].progressText || 'Progress'}: ${progress.toFixed(2)}%`;
    raisedText.textContent = `${translations[currentLang].raisedText || 'Raised'}: ${raisedBNB.toFixed(2)} BNB / ${targetBNB.toFixed(2)} BNB`;
    progressFill.style.width = `${progress}%`;
}

// Başlat
updateLanguage('tr');
updateCountdown();
updatePresaleProgress();
