// Dil çevirileri (JSON formatında)
const translations = {
    tr: {
        title: "FreeDogeAI (FDAI) Token Ön Satışı",
        description: "BNB Chain üzerinde yeni nesil meme destekli AI token'a katılın. %100 vergisiz, merkeziyetsiz ve topluluk tarafından yönlendiriliyor.",
        connectWallet: "Cüzdanı Bağla",
        buyLabel: "FDAI Token Satın Al",
        buyButton: "Şimdi Satın Al",
        community: "Topluluk",
        telegram: "Telegram",
        twitter: "Twitter (X)",
        about: "Hakkında",
        aboutDescription: "Free Doge AI (FDAI), BNB Chain (BEP-20) üzerinde inşa edilmiş, vergisiz, topluluk odaklı bir meme + AI token'ıdır. Kaçırmayın – FOMO gerçek ve roket fırlıyor. Bugün devrimin bir parçası olun!",
        whitepaper: "Whitepaper İndir (PDF)"
    },
    en: {
        title: "FreeDogeAI (FDAI) Token Presale",
        description: "Join the next generation of meme-powered AI token on BNB Chain. 100% tax-free, decentralized and driven by community.",
        connectWallet: "Connect Wallet",
        buyLabel: "Buy FDAI Token",
        buyButton: "Buy Now",
        community: "Community",
        telegram: "Telegram",
        twitter: "Twitter (X)",
        about: "About",
        aboutDescription: "Free Doge AI (FDAI) is a tax-free, community-driven meme + AI token built on the BNB Chain (BEP-20). Don’t miss out – FOMO is real and the rocket is launching. Be a part of the revolution today!",
        whitepaper: "Download Whitepaper (PDF)"
    },
    ar: {
        title: "بيع مسبق لتوكن FreeDogeAI (FDAI)",
        description: "انضم إلى الجيل القادم من التوكنات الممية المدعومة بالذكاء الاصطناعي على سلسلة BNB. خالٍ من الضرائب بنسبة 100%، لامركزي ومدفوع من المجتمع.",
        connectWallet: "ربط المحفظة",
        buyLabel: "شراء توكن FDAI",
        buyButton: "اشترِ الآن",
        community: "المجتمع",
        telegram: "تيليجرام",
        twitter: "تويتر (X)",
        about: "عن",
        aboutDescription: "Free Doge AI (FDAI) هو توكن ممي + ذكاء اصطناعي خالٍ من الضرائب، مدفوع من المجتمع ومبني على سلسلة BNB (BEP-20). لا تفوت – الخوف من التفويت حقيقي والصاروخ ينطلق. كن جزءًا من الثورة اليوم!",
        whitepaper: "تحميل الورقة البيضاء (PDF)"
    }
    // Diğer diller buraya eklenebilir
};

// Dil değiştirme fonksiyonu
function updateContent(lang) {
    console.log("Dil güncelleniyor: " + lang);
    document.getElementById("title").innerText = translations[lang].title;
    document.getElementById("description").innerText = translations[lang].description;
    document.getElementById("connectWallet").innerText = translations[lang].connectWallet;
    document.getElementById("buyLabel").innerText = translations[lang].buyLabel;
    document.getElementById("buyButton").innerText = translations[lang].buyButton;
    document.getElementById("community").innerText = translations[lang].community;
    document.getElementById("telegram").innerText = translations[lang].telegram;
    document.getElementById("twitter").innerText = translations[lang].twitter;
    document.getElementById("about").innerText = translations[lang].about;
    document.getElementById("aboutDescription").innerText = translations[lang].aboutDescription;
    document.getElementById("whitepaper").innerText = translations[lang].whitepaper;
}

// Dil değiştirme olayı
document.getElementById("languageSelect").addEventListener("change", function() {
    const selectedLang = this.value;
    console.log("Seçilen dil: " + selectedLang);
    updateContent(selectedLang);
});

// Varsayılan dil olarak Türkçe'yi ayarla
updateContent("tr");

// Web3 ve MetaMask Bağlantısı
let web3;
let kullaniciHesabi;
const TOKEN_ADRESI = "0x8161698A74F2ea0035B9912ED60140893Ac0f39C";
const TOKEN_SATIS_ADRESI = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7";
const SAHIP_ADRESI = "0xd924e01c7d319c5b23708cd622bd1143cd4fb360";
const TOKEN_ABI = [
    {
        "constant": false,
        "inputs": [
            { "name": "_to", "type": "address" },
            { "name": "_value", "type": "uint256" }
        ],
        "name": "transfer",
        "outputs": [{ "name": "", "type": "bool" }],
        "type": "function"
    }
];

document.getElementById("connectWallet").addEventListener("click", async () => {
    console.log("Cüzdan bağla butonuna tıklandı.");
    if (typeof window.ethereum !== "undefined") {
        console.log("Ethereum sağlayıcısı tespit edildi.");
        web3 = new Web3(window.ethereum);
        try {
            const hesaplar = await window.ethereum.request({ method: "eth_requestAccounts" });
            kullaniciHesabi = hesaplar[0];
            console.log("Bağlanan hesap: " + kullaniciHesabi);
            document.getElementById("connectWallet").innerText = `Bağlandı: ${kullaniciHesabi.slice(0, 6)}...${kullaniciHesabi.slice(-4)}`;
        } catch (hata) {
            console.error("Cüzdan bağlama başarısız: ", hata);
            alert("Cüzdan bağlama başarısız: " + hata.message);
        }
    } else {
        console.error("Ethereum sağlayıcısı bulunamadı. Lütfen MetaMask yükleyin.");
        alert("Lütfen MetaMask yükleyin!");
    }
});

// BNB Miktarına Göre FDAI Hesaplama
const ORAN = 12500000; // 1 BNB = 12,500,000 FDAI
document.getElementById("bnbAmount").addEventListener("input", function() {
    const bnb = this.value;
    const fdai = bnb * ORAN;
    document.getElementById("fdaiAmount").innerText = fdai.toLocaleString();
});

// Satın Alma İşlemi
document.getElementById("buyButton").addEventListener("click", async () => {
    console.log("Şimdi satın al butonuna tıklandı.");
    if (!kullaniciHesabi) {
        console.error("Cüzdan bağlı değil.");
        alert("Lütfen önce cüzdanınızı bağlayın!");
        return;
    }

    const bnbMiktari = document.getElementById("bnbAmount").value;
    if (bnbMiktari < 0.035) {
        console.error("BNB miktarı minimumdan az: " + bnbMiktari);
        alert("Minimum satın alma 0.035 BNB!");
        return;
    }

    try {
        console.log("BNB transferi başlatılıyor...");
        // BNB Gönderme
        await web3.eth.sendTransaction({
            from: kullaniciHesabi,
            to: SAHIP_ADRESI,
            value: web3.utils.toWei(bnbMiktari, "ether")
        });
        console.log("BNB transferi başarılı.");

        // FDAI Gönderme (Akıllı Sözleşme ile)
        const tokenSozlesmesi = new web3.eth.Contract(TOKEN_ABI, TOKEN_ADRESI);
        const fdaiMiktari = (bnbMiktari * ORAN).toString() + "000000000000000000"; // 18 desimal
        console.log("FDAI transferi başlatılıyor...");
        await tokenSozlesmesi.methods.transfer(kullaniciHesabi, fdaiMiktari).send({ from: SAHIP_ADRESI });
        console.log("FDAI transferi başarılı.");

        alert("Satın alma başarılı! FDAI token'ları cüzdanınıza gönderildi.");
    } catch (hata) {
        console.error("İşlem başarısız: ", hata);
        alert("İşlem başarısız: " + hata.message);
    }
});
