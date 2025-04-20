// Language translations in JSON format
const translations = {
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
    // Add more languages here if needed
};

// Function to update page content based on selected language
function updateContent(lang) {
    console.log("Updating language to: " + lang);
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

// Event listener for language selection
document.getElementById("languageSelect").addEventListener("change", function() {
    const selectedLang = this.value;
    console.log("Selected language: " + selectedLang);
    updateContent(selectedLang);
});

// Set default language to English
updateContent("en");

// Web3 and MetaMask Connection
let web3;
let userAccount;
const TOKEN_ADDRESS = "0x8161698A74F2ea0035B9912ED60140893Ac0f39C";
const TOKEN_SALE_ADDRESS = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7";
const OWNER_ADDRESS = "0xd924e01c7d319c5b23708cd622bd1143cd4fb360";
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

// Connect Wallet button event listener
document.getElementById("connectWallet").addEventListener("click", async () => {
    console.log("Connect Wallet button clicked.");
    if (typeof window.ethereum !== "undefined") {
        console.log("Ethereum provider detected.");
        web3 = new Web3(window.ethereum);
        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            userAccount = accounts[0];
            console.log("Connected account: " + userAccount);
            document.getElementById("connectWallet").innerText = `Connected: ${userAccount.slice(0, 6)}...${userAccount.slice(-4)}`;
        } catch (error) {
            console.error("Failed to connect wallet: ", error);
            alert("Failed to connect wallet: " + error.message);
        }
    } else {
        console.error("Ethereum provider not found. Please install MetaMask.");
        alert("Please install MetaMask!");
    }
});

// Calculate FDAI based on BNB amount
const RATE = 12500000; // 1 BNB = 12,500,000 FDAI
document.getElementById("bnbAmount").addEventListener("input", function() {
    const bnb = this.value;
    const fdai = bnb * RATE;
    document.getElementById("fdaiAmount").innerText = fdai.toLocaleString();
});

// Buy Now button event listener
document.getElementById("buyButton").addEventListener("click", async () => {
    console.log("Buy Now button clicked.");
    if (!userAccount) {
        console.error("No wallet connected.");
        alert("Please connect your wallet first!");
        return;
    }

    const bnbAmount = document.getElementById("bnbAmount").value;
    if (bnbAmount < 0.035) {
        console.error("BNB amount below minimum: " + bnbAmount);
        alert("Minimum purchase is 0.035 BNB!");
        return;
    }

    try {
        console.log("Initiating BNB transfer...");
        // Send BNB to owner address
        await web3.eth.sendTransaction({
            from: userAccount,
            to: OWNER_ADDRESS,
            value: web3.utils.toWei(bnbAmount, "ether")
        });
        console.log("BNB transfer successful.");

        // Send FDAI tokens to user (via smart contract)
        const tokenContract = new web3.eth.Contract(TOKEN_ABI, TOKEN_ADDRESS);
        const fdaiAmount = (bnbAmount * RATE).toString() + "000000000000000000"; // 18 decimals
        console.log("Initiating FDAI transfer...");
        await tokenContract.methods.transfer(userAccount, fdaiAmount).send({ from: OWNER_ADDRESS });
        console.log("FDAI transfer successful.");

        alert("Purchase successful! FDAI tokens have been sent to your wallet.");
    } catch (error) {
        console.error("Transaction failed: ", error);
        alert("Transaction failed: " + error.message);
    }
});
