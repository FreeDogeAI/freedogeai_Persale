// script.js — FreeDogeAI Token Satış Sistemi
let provider, signer, userAddress;
const CONTRACT_ADDRESS = "0xd924e01c7d319c5b23708cd622bd1143cd4fb360"; // BNB gönderilecek adres
const TOKEN_CONTRACT = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7"; // FDAI Token adresi
const TOKEN_PRICE = 12500000; // 1 BNB = 12.5M FDAI
const MIN_BNB = 0.035; // Minimum satın alma miktarı
const EXPECTED_CHAIN_ID = 56; // Binance Smart Chain (mainnet)

// Akıllı sözleşme ABI'si
const CONTRACT_ABI = [
  "function buyTokens() public payable"
];

// MetaMask veya diğer Web3 cüzdan bağlantısı
async function connectMetaMask() {
  try {
    const isMobile = /Android|iPhone/i.test(navigator.userAgent);

    if (isMobile && typeof window.ethereum === "undefined") {
      window.location.href = "https://metamask.app.link/dapp/freedogeai.com";
      return;
    }

    // ethereum geldiyse çalıştır
    const waitForEthereum = async () => {
      return new Promise((resolve, reject) => {
        let attempts = 0;
        const interval = setInterval(() => {
          if (window.ethereum) {
            clearInterval(interval);
            resolve(window.ethereum);
          }
          attempts++;
          if (attempts > 10) {
            clearInterval(interval);
            reject("MetaMask provider not found.");
          }
        }, 300); // her 300ms kontrol et, 3 saniye toplam
      });
    };

    const eth = await waitForEthereum();
    provider = new ethers.providers.Web3Provider(eth);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();

    const network = await provider.getNetwork();
    if (network.chainId !== EXPECTED_CHAIN_ID) {
      alert("Please switch to Binance Smart Chain!");
      return;
    }

    await updateInfo();
  } catch (err) {
    console.error("MetaMask connection error:", err);
    alert(`Connection failed: ${err}`);
  }
}

// TrustWallet bağlantısı
async function connectTrustWallet() {
  try {
    if (!window.ethereum) {
      const site = encodeURIComponent(window.location.href);
      window.location.href = `https://link.trustwallet.com/open_url?coin_id=60&url=${site}`;
      return;
    }
    await connectMetaMask(); // TrustWallet Web3 enjeksiyonu varsa MetaMask gibi bağlan
  } catch (err) {
    console.error("TrustWallet connection error:", err);
    alert(`TrustWallet connection failed: ${err.message}`);
  }
}

// Arayüzü güncelleme
async function updateInfo() {
  const elements = {
    wallet: document.getElementById("walletAddress"),
    bnbBalance: document.getElementById("bnbBalance"),
    input: document.getElementById("bnbAmount"),
    output: document.getElementById("fdaiAmount"),
    buyBtn: document.getElementById("buyButton"),
    warning: document.getElementById("insufficientFunds")
  };

  if (!Object.values(elements).every(el => el)) {
    console.error("One or more DOM elements not found:", elements);
    alert("Error: UI elements missing!");
    return;
  }

  elements.wallet.textContent = `Connected: ${userAddress}`;
  const balanceWei = await provider.getBalance(userAddress);
  const bnb = parseFloat(ethers.utils.formatEther(balanceWei));
  elements.bnbBalance.textContent = `BNB: ${bnb.toFixed(4)}`;

  // Input olay dinleyicisini sıfırla ve bağla
  elements.input.oninput = null;
  elements.input.oninput = () => {
    const val = parseFloat(elements.input.value);
    const tokens = isNaN(val) ? 0 : val * TOKEN_PRICE;
    elements.output.textContent = `${tokens.toLocaleString()} FDAI`;
    elements.buyBtn.disabled = val < MIN_BNB || val > bnb;
    elements.warning.style.display = val > bnb ? "block" : "none";
  };
}

// Token satın alma işlemi
async function buyTokens() {
  try {
    const input = document.getElementById("bnbAmount");
    if (!input) {
      console.error("BNB amount input not found");
      alert("Error: Input field not found!");
      return;
    }

    const val = parseFloat(input.value);
    if (isNaN(val) || val < MIN_BNB) {
      alert(`Minimum purchase is ${MIN_BNB} BNB!`);
      return;
    }

    const contract = new ethers.Contract(TOKEN_CONTRACT, CONTRACT_ABI, signer);
    const tx = await contract.buyTokens({
      value: ethers.utils.parseEther(val.toString()),
      gasLimit: 200000
    });

    await tx.wait();
    alert("Tokens purchased successfully!");
    await updateInfo();
  } catch (err) {
    console.error("Buy tokens error:", err);
    alert(`Transaction failed: ${err.message}`);
  }
}

// Olay dinleyicilerini bağlama
function initializeEventListeners() {
  const elements = {
    metaMaskBtn: document.getElementById("connectMetaMask"),
    trustWalletBtn: document.getElementById("connectTrustWallet"),
    buyBtn: document.getElementById("buyButton")
  };

  if (!Object.values(elements).every(el => el)) {
    console.error("One or more button elements not found:", elements);
    alert("Error: Button elements missing!");
    return;
  }

  elements.metaMaskBtn.onclick = connectMetaMask;
  elements.trustWalletBtn.onclick = connectTrustWallet;
  elements.buyBtn.onclick = buyTokens;
}

// Başlatma
document.addEventListener("DOMContentLoaded", () => {
  try {
    initializeEventListeners();
  } catch (err) {
    console.error("Initialization error:", err);
    alert("Error initializing application!");
  }
});
