// FreeDogeAI Presale - Tam Çalışan JS Kodu
document.addEventListener('DOMContentLoaded', function() {
  // 1. KONFİGÜRASYON (Senin verdiğin bilgiler)
  const CONFIG = {
    BNB_RECEIVER: "0xd924e01c7d319c5b23708cd622bd1143cd4fb360",
    PRESALE_CONTRACT: "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7",
    TOKEN_PRICE: 12500000, // 1 BNB = 12.5M FDAI
    MIN_BNB: 0.035,
    CHAIN_ID: 56, // BSC Mainnet
    TOKEN_SYMBOL: "FDAI"
  };

  // 2. DURUM DEĞİŞKENLERİ
  let provider, signer, userAddress;

  TrustWallet bağlantısı
async function connectTrustWallet() {
  try {
    if (isMobile && !window.ethereum) {
      console.log("Mobil cihazda TrustWallet yönlendirmesi başlatılıyor...");
      const site = encodeURIComponent(window.location.href);
      alert("You are being redirected to TrustWallet. After opening the app, return to this site.");
      window.location.href = `https://link.trustwallet.com/open_url?coin_id=60&url=${site}`;
      return;
    }
    console.log("TrustWallet Web3 enjeksiyonu tespit edildi, bağlanıyor...");
    await connectMetaMask();
  } catch (err) {
    console.error("TrustWallet bağlantı hatası:", err);
    alert(`TrustWallet connection failed: ${err.message || "An unknown error occurred."}`);
  }
}

  // 5. ORTAK CÜZDAN BAĞLANTI FONKSİYONU
  async function connectWallet() {
    try {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();
      userAddress = await signer.getAddress();
      
      // Ağ kontrolü
      const network = await provider.getNetwork();
      if (network.chainId !== CONFIG.CHAIN_ID) {
        await switchToBSC();
        return;
      }
      
      updateUI();
    } catch (error) {
      throw error;
    }
  }

  // 6. BSC AĞINA GEÇİŞ
  async function switchToBSC() {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x38' }] // BSC Mainnet
      });
    } catch (switchError) {
      // Eğer zincir ekli değilse
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x38',
              chainName: 'Binance Smart Chain',
              nativeCurrency: {
                name: 'BNB',
                symbol: 'BNB',
                decimals: 18
              },
              rpcUrls: ['https://bsc-dataseed.binance.org/'],
              blockExplorerUrls: ['https://bscscan.com']
            }]
          });
        } catch (addError) {
          alert("BSC Ağı eklenemedi!");
        }
      }
    }
  }

  // 7. TOKEN SATIN ALMA
  async function buyTokens() {
    try {
      const bnbAmount = parseFloat(document.getElementById('bnbAmount').value);
      if (bnbAmount < CONFIG.MIN_BNB) {
        alert(`Minimum satın alma: ${CONFIG.MIN_BNB} BNB`);
        return;
      }

      const tx = await signer.sendTransaction({
        to: CONFIG.BNB_RECEIVER,
        value: ethers.utils.parseEther(bnbAmount.toString()),
        gasLimit: 200000
      });
      
      alert(`Başarılı! İşlem Hash: ${tx.hash}\nTokenlar otomatik gönderilecektir.`);
    } catch (error) {
      console.error("Satın alma hatası:", error);
      alert(`İşlem başarısız: ${error.message}`);
    }
  }

  // 8. ARAYÜZ GÜNCELLEMELERİ
  function updateUI() {
    // Cüzdan bilgilerini göster
    document.getElementById('walletStatus').textContent = `🟢 Connected: ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
    
    // BNB bakiyesini güncelle
    updateBalance();
    
    // BNB input dinleyicisi
    document.getElementById('bnbAmount').addEventListener('input', function(e) {
      const bnb = parseFloat(e.target.value) || 0;
      const tokens = bnb * CONFIG.TOKEN_PRICE;
      document.getElementById('fdaiAmount').textContent = `${tokens.toLocaleString()} ${CONFIG.TOKEN_SYMBOL}`;
      
      // Buton durumunu güncelle
      document.getElementById('buyButton').disabled = bnb < CONFIG.MIN_BNB;
    });
  }

  async function updateBalance() {
    const balance = await provider.getBalance(userAddress);
    const bnbBalance = ethers.utils.formatEther(balance);
    document.getElementById('bnbBalance').textContent = `BNB Balance: ${parseFloat(bnbBalance).toFixed(4)}`;
  }

  // 9. EVENT LİSTENER'LAR
  function initEventListeners() {
    document.getElementById('connectMetaMask').addEventListener('click', connectMetaMask);
    document.getElementById('connectTrustWallet').addEventListener('click', connectTrustWallet);
    document.getElementById('buyButton').addEventListener('click', buyTokens);
  }

  // UYGULAMAYI BAŞLAT
  initEventListeners();
});
