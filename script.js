// Modal Kontrolü
const connectBtn = document.getElementById("connectBtn");
const walletModal = document.getElementById("walletModal");
const closeModal = document.querySelector(".close");
const walletAddress = document.getElementById("walletAddress");

let web3;
let provider;

// Modal Açma
connectBtn.addEventListener("click", () => {
  walletModal.style.display = "block";
});

// Modal Kapatma
closeModal.addEventListener("click", () => {
  walletModal.style.display = "none";
});

// Modal Dışına Tıklayınca Kapatma
window.addEventListener("click", (event) => {
  if (event.target == walletModal) {
    walletModal.style.display = "none";
  }
});

// WalletConnect Provider
const walletConnectProvider = new WalletConnectProvider({
  rpc: {
    56: "https://bsc-dataseed.binance.org/"
  },
  chainId: 56
});

// Cüzdan Seçenekleri
const walletOptions = document.querySelectorAll(".wallet-option");

walletOptions.forEach(option => {
  option.addEventListener("click", async () => {
    const walletType = option.getAttribute("data-wallet");
    
    try {
      if (walletType === "metamask") {
        // MetaMask Bağlantısı
        if (window.ethereum) {
          provider = window.ethereum;
          await provider.request({ method: "eth_requestAccounts" });
          web3 = new Web3(provider);
          const accounts = await web3.eth.getAccounts();
          walletAddress.textContent = `Connected: ${accounts[0]}`;
          walletModal.style.display = "none";
        } else {
          alert("MetaMask yüklü değil! Lütfen MetaMask'ı yükleyin.");
        }
      } else if (walletType === "trustwallet") {
        // Trust Wallet Bağlantısı (WalletConnect)
        provider = walletConnectProvider;
        await provider.enable();
        web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        walletAddress.textContent = `Connected: ${accounts[0]}`;
        walletModal.style.display = "none";
      } else if (walletType === "binance") {
        // Binance Chain Wallet Bağlantısı
        if (window.BinanceChain) {
          provider = window.BinanceChain;
          await provider.request({ method: "eth_requestAccounts" });
          web3 = new Web3(provider);
          const accounts = await web3.eth.getAccounts();
          walletAddress.textContent = `Connected: ${accounts[0]}`;
          walletModal.style.display = "none";
        } else {
          alert("Binance Chain Wallet yüklü değil!");
        }
      } else if (walletType === "infinity") {
        alert("Infinity Wallet bağlantısı henüz desteklenmiyor.");
      }
    } catch (error) {
      walletAddress.textContent = "Wallet connection failed.";
      console.error(error);
    }
  });
});
