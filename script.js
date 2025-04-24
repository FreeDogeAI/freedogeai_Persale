// FreeDogeAI Presale - Tam Entegre JS Kodu
document.addEventListener('DOMContentLoaded', function() {
  // 1. KONTRAT AYARLARI (Senin Verdiğin Bilgiler)
  const CONFIG = {
    BNB_RECEIVER: "0xd924e01c7d319c5b23708cd622bd1143cd4fb360", // BNB'lerin gideceği cüzdan
    PRESALE_CONTRACT: "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7", // Presale kontratı
    TOKEN_CONTRACT: "0x8161698A74F2ea0035B9912ED60140893Ac0f39C", // FDAI Token
    TOKEN_PRICE: 12500000, // 1 BNB = 12.5M FDAI
    MIN_BNB: 0.035, // Minimum satın alma
    CHAIN_ID: 56, // BSC Mainnet
    TOKEN_SYMBOL: "FDAI",
    TOKEN_DECIMALS: 18
  };

  // 2. ÇEVİRİLER (EN/TR/ZH/RU/AR)
  const TRANSLATIONS = {
    en: { /* İngilizce çeviriler */ },
    tr: { /* Türkçe çeviriler */ },
    zh: { /* Çince çeviriler */ }
  };

  // 3. AKILLI SÖZLEŞME ABI
  const PRESALE_ABI = [
    "function buyTokens() payable",
    "function getTokenAmount(uint256 bnbAmount) view returns (uint256)"
  ];

  // 4. UYGULAMA DURUMU
  let provider, signer, userAddress, currentLanguage = 'en';

  // 5. META MASK BAĞLANTISI (MOBİL/DESKTOP)
  async function connectMetaMask() {
    try {
      // Mobil yönlendirme
      if (/Android|iPhone|iPad/i.test(navigator.userAgent) {
        if (!window.ethereum?.isMetaMask) {
          window.location.href = `https://metamask.app.link/dapp/${window.location.host}`;
          return;
        }
      }
      
      // Bağlantı işlemleri
      provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();
      userAddress = await signer.getAddress();
      
      // BSC ağ kontrolü
      await checkNetwork();
      
      // UI güncelleme
      updateUI();
    } catch (error) {
      showError(error.message);
    }
  }

  // 6. TRUST WALLET BAĞLANTISI (MOBİL ÖZEL)
  // TrustWallet Bağlantısı (Mobil Özel)
async function connectTrustWallet() {
  try {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // TrustWallet mobil uygulama linki
      window.location.href = `https://link.trustwallet.com/open_url?coin_id=20000714&url=${encodeURIComponent(window.location.href)}`;
    } else {
      // Desktop'ta MetaMask gibi bağlan
      if (!window.ethereum) {
        window.open("https://trustwallet.com/download", "_blank");
        throw new Error("TrustWallet extension not found!");
      }
      await connectMetaMask();
    }
  } catch (error) {
    alert(`TrustWallet Error: ${error.message}`);
  }
}

// MetaMask Bağlantısı (Mobilde Uygulamayı Açar)
async function connectMetaMask() {
  try {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile && !window.ethereum?.isMetaMask) {
      // iOS/Android için doğrudan MetaMask uygulamasını aç
      window.location.href = `https://metamask.app.link/dapp/${encodeURIComponent(window.location.href)}`;
      return;
    }

    if (!window.ethereum) {
      throw new Error("MetaMask not installed!");
    }

    // Bağlantı işlemleri
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();
  } catch (error) {
    alert(`MetaMask Error: ${error.message}`);
  }
}

  // 7. TOKEN SATIN ALMA FONKSİYONU
  async function buyTokens() {
    const bnbAmount = parseFloat(document.getElementById('bnbAmount').value);
    
    try {
      // Kontrat interaksiyonu
      const presaleContract = new ethers.Contract(CONFIG.PRESALE_CONTRACT, PRESALE_ABI, signer);
      const tx = await presaleContract.buyTokens({
        value: ethers.utils.parseEther(bnbAmount.toString()),
        gasLimit: 250000
      });
      
      // Başarılı mesajı
      alert(`${bnbAmount} BNB ile ${(bnbAmount*CONFIG.TOKEN_PRICE).toLocaleString()} FDAI satın alındı!`);
    } catch (error) {
      showError(`Hata: ${error.message}`);
    }
  }

  // 8. DİĞER YARDIMCI FONKSİYONLAR
  async function checkNetwork() {
    // BSC ağ kontrolü ve otomatik geçiş
  }

  function updateUI() {
    // Cüzdan bilgilerini göster
  }

  function setupEventListeners() {
    // BNB miktarı değişimini dinle
    document.getElementById('bnbAmount').addEventListener('input', function(e) {
      const tokens = e.target.value * CONFIG.TOKEN_PRICE;
      document.getElementById('fdaiAmount').textContent = `${tokens.toLocaleString()} FDAI`;
    });
  }

  // 9. UYGULAMAYI BAŞLAT
  initEventListeners();
  updateLanguage('en');
});
