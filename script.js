// script.js

let selectedAccount;

const connectWalletBtn = document.getElementById("connectWalletBtn"); const walletAddressSpan = document.getElementById("walletAddress"); const walletInfo = document.getElementById("walletInfo"); const bnbBalanceSpan = document.getElementById("bnbBalance"); const purchasedFdaiSpan = document.getElementById("purchasedFdai"); const bnbInput = document.getElementById("bnbAmount"); const calculatedTokens = document.getElementById("calculatedTokens"); const buyBtn = document.getElementById("buyBtn");

const FDAI_PER_BNB = 120000000000; const TOKEN_CONTRACT = "0x8161698A74F2ea0035B9912ED60140893Ac0f39C"; const RECEIVER_WALLET = "0xd924e01c7d319c5b23708cd622bd1143cd4fb360";

async function connectWallet() { if (typeof window.ethereum !== 'undefined') { try { const accounts = await ethereum.request({ method: 'eth_requestAccounts' }); selectedAccount = accounts[0]; walletAddressSpan.textContent = selectedAccount; walletInfo.style.display = "block"; getBnbBalance(); } catch (error) { alert("Connection failed"); } } else { alert("Please install MetaMask"); } }

async function getBnbBalance() { const provider = new ethers.providers.Web3Provider(window.ethereum); const balance = await provider.getBalance(selectedAccount); const bnb = ethers.utils.formatEther(balance); bnbBalanceSpan.textContent = parseFloat(bnb).toFixed(4) + " BNB"; }

bnbInput?.addEventListener("input", () => { const bnbValue = parseFloat(bnbInput.value); if (!isNaN(bnbValue)) { const tokenAmount = bnbValue * FDAI_PER_BNB; calculatedTokens.textContent = tokenAmount.toLocaleString() + " FDAI"; } else { calculatedTokens.textContent = "0 FDAI"; } });

buyBtn?.addEventListener("click", async () => { const amount = bnbInput.value; if (!amount || parseFloat(amount) <= 0) return alert("Please enter a valid BNB amount");

const valueInWei = ethers.utils.parseEther(amount);
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

try {
    const tx = await signer.sendTransaction({
        to: RECEIVER_WALLET,
        value: valueInWei
    });
    await tx.wait();
    alert("Transaction successful!");
    getBnbBalance();
    updatePurchasedTokens(amount);
} catch (err) {
    alert("Transaction failed");
}

});

function updatePurchasedTokens(amount) { const tokens = parseFloat(amount) * FDAI_PER_BNB; purchasedFdaiSpan.textContent = tokens.toLocaleString() + " FDAI"; }

connectWalletBtn?.addEventListener("click", connectWallet);

