// CONFIGURATION
const tokenDropAddress = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7";
const yourWalletAddress = "0xd924e01c7d319c5b23708cd622bd1143cd4fb360";
const tokenRatePerBNB = 12500000;
const minBNB = 0.035;

let provider;
let signer;
let userAddress;
let currentLang = "en";

// CONNECT WALLET + MOBILE SIGNATURE
async function connectWallet() {
    try {
        if (typeof window.ethereum !== 'undefined') {
            provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            await provider.send("eth_requestAccounts", []);
            signer = provider.getSigner();
            userAddress = await signer.getAddress();
            document.getElementById("connect-wallet").innerText = translations[currentLang].walletConnected;
            document.getElementById("buy-button").disabled = false;

            // SIGNATURE
            const message = "Sign to confirm your wallet connection to FreeDogeAI!";
            await signer.signMessage(message);

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

// BNB TO FDAI CALCULATION
function calculateTokens() {
    const bnbAmount = parseFloat(document.getElementById("bnb-amount").value);
    if (!isNaN(bnbAmount)) {
        const tokens = bnbAmount * tokenRatePerBNB;
        document.getElementById("token-amount").innerText = `${translations[currentLang].youWillReceive} ${tokens.toLocaleString()} FDAI`;
    } else {
        document.getElementById("token-amount").innerText = `${translations[currentLang].youWillReceive} 0 FDAI`;
    }
}

// BUY TOKENS
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

// TRANSLATIONS
const translations = {
    en: {
        mainTitle: "Join FreeDogeAI Presale!",
        subtitle: "The future of meme coins powered by Artificial Intelligence!",
        connectWallet: "Connect Wallet",
        walletConnected: "Wallet Connected!",
        noWalletFound: "Wallet not found! Please install MetaMask or TrustWallet.",
        walletConnectionFailed: "Wallet connection failed!",
        buyTitle: "Buy FDAI Tokens",
        buyDescription: "Send BNB to purchase FDAI tokens instantly. Tokens will be delivered automatically after transaction confirmation.",
        buyButton: "Buy Tokens",
        minimumWarning: "Minimum purchase: 0.035 BNB",
        youWillReceive: "You will receive:",
        howToTitle: "How to Buy?",
        howToList: [
            "Connect your MetaMask or TrustWallet first.",
            "Enter the amount of BNB you want to invest.",
            "Click Buy Tokens and complete the transaction.",
            "Tokens will be sent automatically to your wallet."
        ],
        roadmapTitle: "Our Roadmap",
        roadmap: [
            {
                phase: "Phase 1: Building the Foundation",
                description: "Community creation, website launch, presale initiation, PancakeSwap listing, surprise CEX listing."
            },
            {
                phase: "Phase 2: Expanding the Ecosystem",
                description: "Development of FDAI Marketplace, release of AI-driven NFT collections, launch of Swap platform."
            },
            {
                phase: "Phase 3: Artificial Intelligence Integration",
                description: "Deployment of AI chatbots, creation of investment analytics tools, launch of AI consulting services for holders."
            },
            {
                phase: "Phase 4: Gaming Universe",
                description: "Launch of Play-to-Earn blockchain games, in-game NFT asset upgrades via FDAI tokens, organization of global tournaments."
            },
            {
                phase: "Phase 5: Global Events and Expansion",
                description: "Hosting worldwide seminars, sponsoring major blockchain summits, establishment of FreeDogeAI Academy."
            },
            {
                phase: "Phase 6: Infinite Growth",
                description: "Creation of FreeDogeAI Foundation, implementation of DAO governance system, integration with global payment systems."
            }
        ],
        whitepaperTitle: "Download Whitepaper",
        whitepaperButton: "Download Now",
        communityTitle: "Join Our Community",
        communityDescription: "Stay connected and follow our latest updates!",
        pleaseConnectWallet: "Please connect your wallet first!",
        minPurchaseWarning: "Minimum purchase is 0.035 BNB!",
        paymentSuccessful: "Payment successful! FDAI tokens are being sent...",
        tokensSent: "FDAI tokens have been sent to your wallet!",
        transactionFailed: "Transaction failed. Please try again."
    }
    // Turkish, Russian, Chinese translations will follow after this if needed.
};

// SET LANGUAGE
function setLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];

    document.getElementById("main-title").innerText = t.mainTitle;
    document.getElementById("subtitle").innerText = t.subtitle;
    document.getElementById("connect-wallet").innerText = t.connectWallet;
    document.getElementById("buy-title").innerText = t.buyTitle;
    document.getElementById("buy-description").innerText = t.buyDescription;
    document.getElementById("buy-button").innerText = t.buyButton;
    document.getElementById("minimum-warning").innerText = t.minimumWarning;
    document.getElementById("whitepaper-title").innerText = t.whitepaperTitle;
    document.getElementById("whitepaper-button").innerText = t.whitepaperButton;
    document.getElementById("community-title").innerText = t.communityTitle;
    document.getElementById("community-description").innerText = t.communityDescription;

    // How to buy list
    const howToList = document.getElementById("how-to-list");
    howToList.innerHTML = "";
    t.howToList.forEach(item => {
        const li = document.createElement("li");
        li.innerText = item;
        howToList.appendChild(li);
    });

    // Roadmap steps
    const roadmapContent = document.getElementById("roadmap-steps");
    roadmapContent.innerHTML = "";
    t.roadmap.forEach(item => {
        const h3 = document.createElement("h3");
        h3.className = "phase-title";
        h3.innerText = item.phase;
        roadmapContent.appendChild(h3);

        const p = document.createElement("p");
        p.className = "phase-description";
        p.innerText = item.description;
        roadmapContent.appendChild(p);
    });
}

// Default language
setLanguage('en');
