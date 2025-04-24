// script.js — FreeDogeAI Token Satış Sistemi
let provider, signer, userAddress;
const CONTRACT_ADDRESS = "0xd924e01c7d319c5b23708cd622bd1143cd4fb360"; // BNB gönderilecek adres
const TOKEN_CONTRACT = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7"; // FDAI Token adresi
const TOKEN_PRICE = 12500000; // 1 BNB = 12.5M FDAI
const MIN_BNB = 0.035; // Minimum satın alma miktarı
const EXPECTED_CHAIN_ID = 56; // Binance Smart Chain (mainnet)

// Akıllı sözleşme ABI'si (buyTokens fonksiyonu için)
const CONTRACT_ABI = [
  "function buyTokens() public payable"
];

// MetaMask veya diğer Web3 cüzdan bağlantısı
async function connectMetaMask() {
  try {
    if (!window.ethereum) {
      alert("Please install a Web3 wallet like MetaMask!");
      return;
    }

    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();

    // Zincir kontrolü (Binance Smart Chain)
    const network = await provider.getNetwork();
    if (network.chainId !== EXPECTED_CHAIN_ID) {
      alert("Please switch to Binance Smart Chain!");
      return;
    }

    await updateInfo();
  } catch (err) {
    alert(`Connection failed: ${err.message}`);
  }
}

// TrustWallet bağlantısı (Web3 entegrasyonu)
async function connectTrustWallet() {
  try {
    if (!window.ethereum) {
      // TrustWallet derin bağlantısı
      const site = encodeURIComponent("https://freedogeai.com/");
      window.location.href = `https://link.trustwallet.com/open_url?coin_id=60&url=${site}`;
      return;
    }
    // TrustWallet zaten enjekte edilmişse MetaMask gibi bağlan
    await connectMetaMask();
  } catch (err) {
    alert(`TrustWallet connection failed: ${err.message}`);
  }
}

// Arayüzü güncelleme
async function updateInfo() {
  // DOM elemanlarını kontrol et
  const wallet = document.getElementById("walletAddress");
  const bnbBalance = document.getElementById("bnbBalance");
  const input = document.getElementById("bnbAmount");
  const output = document.getElementById("fdaiAmount");
  const buyBtn = document.getElementById("buyButton");
  const warning = document.getElementById("insufficientFunds");

  if (!wallet || !bnbBalance || !input || !output || !buyBtn || !warning) {
    console.error("One or more DOM elements not found");
    alert("Error: UI elements missing!");
    return;
  }

  wallet.textContent = `Connected: ${userAddress}`;
  const balanceWei = await provider.getBalance(userAddress);
  const bnb = parseFloat(ethers.utils.formatEther(balanceWei));
  bnbBalance.textContent = `BNB: ${bnb.toFixed(4)}`;

  // Input olay dinleyicisini sıfırla ve bağla
  input.oninput = null;
  input.oninput = () => {
    const val = parseFloat(input.value);
    const tokens = isNaN(val) ? 0 : val * TOKEN_PRICE;
    output.textContent = `${tokens.toLocaleString()} FDAI`;
    buyBtn.disabled = val < MIN_BNB || val > bnb;
    warning.style.display = val > bnb ? "block" : "none";
  };
}

// Token satın alma işlemi
async function buyTokens() {
  try {
    const input = document.getElementById("bnbAmount");
    if (!input) {
      alert("Error: Input field not found!");
      return;
    }

    const val = parseFloat(input.value);
    if (isNaN(val) || val < MIN_BNB) {
      alert(`Minimum purchase is ${MIN_BNB} BNB!`);
      return;
    }

    // Akıllı sözleşme ile etkileşim
    const contract = new ethers.Contract(TOKEN_CONTRACT, CONTRACT_ABI, signer);
    const tx = await contract.buyTokens({
      value: ethers.utils.parseEther(val.toString()),
      gasLimit: 200000 // İşlem için tahmini gas limiti
    });

    // İşlem onayını bekle
    await tx.wait();
    alert("Tokens purchased successfully!");
    
    // Arayüzü güncelle
    await updateInfo();
  } catch (err) {
    alert(`Transaction failed: ${err.message}`);
  }
}

// Olay dinleyicilerini bağlama
function initializeEventListeners() {
  const metaMaskBtn = document.getElementById("connectMetaMask");
  const trustWalletBtn = document.getElementById("connectTrustWallet");
  const buyBtn = document.getElementById("buyButton");

  if (metaMaskBtn) metaMaskBtn.onclick = connectMetaMask;
  else console.error("MetaMask button not found");

  if (trustWalletBtn) trustWalletBtn.onclick = connectTrustWallet;
  else console.error("TrustWallet button not found");

  if (buyBtn) buyBtn.onclick = buyTokens;
  else console.error("Buy button not found");
}

// Başlatma
document.addEventListener("DOMContentLoaded", () => {
  initializeEventListeners();
});
