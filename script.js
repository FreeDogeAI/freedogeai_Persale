const CONFIG = {
  RECEIVE_WALLET: "0xd924e01c7d319c5b23708cd622bd1143cd4fb360",
  TOKENS_PER_BNB: 120000000000,
  BSC_CHAIN_ID: 56
};

let web3;
let userAddress = "";

// Tarayıcı ve MetaMask kontrolü
const isMobile = () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
const isInMetamaskBrowser = () => navigator.userAgent.includes("MetaMask");

// MetaMask deep link ile yönlendirme
const redirectToMetamask = () => {
  const currentUrl = encodeURIComponent(window.location.href);
  window.location.href = `https://metamask.app.link/dapp/${currentUrl}`;
};

// Cüzdan bağlantı fonksiyonu
const connectWallet = async () => {
  // MetaMask tarayıcısında zaten bulunuyorsa tekrar yönlendirme yapma
  if (isInMetamaskBrowser() && window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      userAddress = accounts[0];
      web3 = new Web3(window.ethereum);

      // BSC ağ kontrolü ve geçiş
      const chainId = await web3.eth.getChainId();
      if (chainId !== CONFIG.BSC_CHAIN_ID) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x38' }]
          });
        } catch (switchError) {
          console.error("BSC ağına geçiş yapılamadı:", switchError);
          alert("Lütfen cüzdanınızı Binance Smart Chain (BSC) ağına geçirin.");
          return;
        }
      }

      updateWalletUI();
    } catch (error) {
      console.error("Bağlantı hatası:", error);
      alert("Cüzdan bağlantısı sırasında bir hata oluştu.");
    }
    return;
  }

  // Mobil cihazda MetaMask yoksa yönlendir
  if (isMobile() && !window.ethereum) {
    redirectToMetamask();
    return;
  }

  // Desktop'ta MetaMask yoksa yönlendir
  if (!window.ethereum) {
    window.open("https://metamask.io/download.html", "_blank");
    return;
  }

  // Desktop veya mobil tarayıcıda MetaMask varsa bağlan
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    userAddress = accounts[0];
    web3 = new Web3(window.ethereum);

    const chainId = await web3.eth.getChainId();
    if (chainId !== CONFIG.BSC_CHAIN_ID) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x38' }]
        });
      } catch (switchError) {
        console.error("BSC ağına geçiş yapılamadı:", switchError);
        alert("Lütfen cüzdanınızı Binance Smart Chain (BSC) ağına geçirin.");
        return;
      }
    }

    updateWalletUI();
  } catch (error) {
    console.error("Bağlantı hatası:", error);
    alert("Cüzdan bağlantısı sırasında bir hata oluştu.");
  }
};

// UI güncelleme fonksiyonu
const updateWalletUI = () => {
  document.getElementById("walletAddress").textContent = 
    `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
  document.getElementById("walletInfo").style.display = 'block';
  document.getElementById("connectWalletBtn").textContent = "✅ Connected";
  document.getElementById("buyBtn").disabled = false;
};

// BNB miktarı değiştiğinde FDAI hesapla
const updateFDAIAmount = () => {
  const bnbAmountInput = document.getElementById('bnbAmount');
  const amount = parseFloat(bnbAmountInput.value) || 0;
  const tokens = amount * CONFIG.TOKENS_PER_BNB;
  document.getElementById('fdaiAmount').textContent = tokens.toLocaleString();
};

// Sayfa yüklendiğinde
window.addEventListener("DOMContentLoaded", () => {
  // Bağlantı butonu
  document.getElementById("connectWalletBtn").addEventListener("click", connectWallet);

  // BNB miktarı değiştiğinde FDAI hesapla
  document.getElementById('bnbAmount').addEventListener('input', updateFDAIAmount);

  // MetaMask tarayıcısında otomatik bağlantı
  if (isInMetamaskBrowser() && window.ethereum) {
    connectWallet();
  }
});

// Cüzdan ve ağ değişikliklerini dinle
if (window.ethereum) {
  window.ethereum.on('accountsChanged', (accounts) => {
    if (accounts.length === 0) {
      // Cüzdan bağlantısı kesildi
      document.getElementById('walletInfo').style.display = 'none';
      document.getElementById('connectWalletBtn').textContent = '🔗 Connect Wallet';
      document.getElementById('buyBtn').disabled = true;
      userAddress = "";
    } else {
      userAddress = accounts[0];
      updateWalletUI();
    }
  });

  window.ethereum.on('chainChanged', () => {
    window.location.reload();
  });
  }
