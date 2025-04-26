// CONFIG
const tokenDropAddress = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7";
const yourWalletAddress = "0xd924e01c7d319c5b23708cd622bd1143cd4fb360";
const tokenRatePerBNB = 12500000;
const minBNB = 0.035;

let provider;
let signer;
let userAddress;
let currentLang = "en";

// Connect Wallet
async function connectWallet() {
    try {
        if (typeof window.ethereum !== 'undefined') {
            provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            await provider.send("eth_requestAccounts", []);
            signer = provider.getSigner();
            userAddress = await signer.getAddress();
            document.getElementById("join-button").innerText = translations[currentLang].walletConnected;
            document.getElementById("buy-button").disabled = false;
        } else {
            if (/Android|iPhone/i.test(navigator.userAgent)) {
                window.location.href = "https://metamask.app.link/dapp/" + window.location.hostname;
            } else {
                alert(translations[currentLang].noWalletFound);
            }
        }
    } catch (error) {
        console.error(error);
        alert(translations[currentLang].walletConnectionFailed);
    }
}

// Calculate Tokens
function calculateTokens() {
    const bnbAmount = parseFloat(document.getElementById("bnb-amount").value);
    if (!isNaN(bnbAmount)) {
        const tokens = bnbAmount * tokenRatePerBNB;
        document.getElementById("token-amount").innerText = `${translations[currentLang].youWillReceive} ${tokens.toLocaleString()} FDAI`;
    } else {
        document.getElementById("token-amount").innerText = `${translations[currentLang].youWillReceive} 0 FDAI`;
    }
}

// Buy Tokens
async function buyTokens() {
    const bnbAmount = parseFloat(document.getElementById("bnb-amount").value);
    if (isNaN(bnbAmount) || bnbAmount < minBNB) {
        alert(translations[currentLang].minPurchaseWarning);
        return;
    }
    if (!provider || !signer) {
        alert(translations[currentLang].pleaseConnectWallet);
        return;
    }
    try {
        const tx = await signer.sendTransaction({
            to: yourWalletAddress,
            value: ethers.utils.parseEther(bnbAmount.toString())
        });
        await tx.wait();
        alert(translations[currentLang].paymentSuccessful);

        const abi = [
            "function claimTo(address receiver, uint256 quantity) public"
        ];
        const tokenDropContract = new ethers.Contract(tokenDropAddress, abi, signer);
        const tokenAmount = bnbAmount * tokenRatePerBNB;
        await tokenDropContract.claimTo(userAddress, tokenAmount);

        alert(translations[currentLang].tokensSent);
    } catch (error) {
        console.error(error);
        alert(translations[currentLang].transactionFailed);
    }
}

// Translations
const translations = {
    en: {
        mainTitle: "Join the FDAI Presale!",
        subtitle: "Secure your future with FreeDogeAI (FDAI)!",
        joinButton: "Connect Wallet",
        walletConnected: "Wallet Connected!",
        noWalletFound: "Wallet not found! Please install MetaMask or TrustWallet.",
        walletConnectionFailed: "Wallet connection failed!",
        buyTitle: "Buy FDAI Tokens",
        buyDesc: "Send BNB to purchase FDAI tokens. Tokens will be delivered automatically.",
        buyButton: "Buy FDAI Tokens",
        minimumWarning: "Minimum purchase: 0.035 BNB",
        youWillReceive: "You will receive:",
        howToTitle: "How to Buy FDAI?",
        howToList: [
            "Connect your MetaMask or TrustWallet.",
            "Enter the amount of BNB you want to invest.",
            "FDAI tokens will be sent automatically to your wallet."
        ],
        roadmapTitle: "Our Roadmap",
        roadmapList: [
            "Community created, website launched, presale started, PancakeSwap listing will happen, surprise CEX listing coming.",
            "Expansion of FreeDogeAI Marketplace, exclusive NFT collections, launch of our own Swap Platform.",
            "Artificial Intelligence integration: AI chatbots, analytics, and consulting services for FDAI holders.",
            "Launch of Play2Earn games, in-game NFT purchasing with FDAI, global tournaments.",
            "Worldwide seminars, sponsorships at major blockchain events, opening FreeDogeAI Academy.",
            "Creation of FreeDogeAI Foundation, DAO governance system, global payment integration."
        ],
        whitepaperTitle: "Download Whitepaper",
        whitepaperButton: "Download Whitepaper",
        communityTitle: "Join Our Community",
        communityDesc: "Stay connected and follow FreeDogeAI updates!",
        pleaseConnectWallet: "Please connect your wallet first!",
        minPurchaseWarning: "Minimum purchase is 0.035 BNB!",
        paymentSuccessful: "Payment successful! FDAI tokens are being sent...",
        tokensSent: "FDAI tokens have been sent to your wallet!",
        transactionFailed: "Transaction failed. Please try again."
    },
    // tr, ru, zh çevirileri BURAYA EKLENECEK! (birazdan yazıyorum)
};

// Set Language
function setLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];

    document.getElementById("main-title").innerText = t.mainTitle;
    document.getElementById("subtitle").innerText = t.subtitle;
    document.getElementById("join-button").innerText = t.joinButton;
    document.getElementById("buy-title").innerText = t.buyTitle;
    document.getElementById("buy-desc").innerText = t.buyDesc;
    document.getElementById("buy-button").innerText = t.buyButton;
    document.getElementById("minimum-warning").innerText = t.minimumWarning;
    document.getElementById("how-to-title").innerText = t.howToTitle;
    document.getElementById("whitepaper-title").innerText = t.whitepaperTitle;
    document.getElementById("whitepaper-button").innerText = t.whitepaperButton;
    document.getElementById("community-title").innerText = t.communityTitle;
    document.getElementById("community-desc").innerText = t.communityDesc;

    // Update How-to list
    const howToList = document.getElementById("how-to-list");
    howToList.innerHTML = "";
    t.howToList.forEach(item => {
        const li = document.createElement("li");
        li.innerText = item;
        howToList.appendChild(li);
    });

    // Update Roadmap list
    const roadmapList = document.getElementById("roadmap-list");
    roadmapList.innerHTML = "";
    t.roadmapList.forEach(item => {
        const li = document.createElement("li");
        li.innerText = item;
        roadmapList.appendChild(li);
    });
}

// Set default language
setLanguage("en");
