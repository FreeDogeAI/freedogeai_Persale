// 1. TRUST WALLET (Grok'tan Alınan Çalışan Kod - AYNEN KALDI)
async function connectTrustWallet() {
  try {
    if (!window.ethereum) {
      // Mobil yönlendirme (Trust'ın orijinal kodu)
      const site = encodeURIComponent(window.location.href);
      window.location.href = `https://link.trustwallet.com/open_url?coin_id=60&url=${site}`;
      return;
    }
    // Geri kalan kodlar Grok'taki gibi...
  } catch (err) {
    console.error("TrustWallet error:", err);
  }
}

// 2. META MASK (Düzeltilmiş Versiyon)
async function connectMetaMask() {
  try {
    const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
    
    if (isMobile) {
      // 1. Önce direkt uygulama linkini dene
      window.location.href = `metamask://dapp/${encodeURIComponent(window.location.href)}`;
      
      // 2. 500ms sonra açılmadıysa fallback
      setTimeout(() => {
        if (!document.hidden) {
          window.location.href = `https://metamask.app.link/dapp/${encodeURIComponent(window.location.href)}`;
        }
      }, 500);
      return;
    }
    
    // Desktop için normal bağlantı
    if (!window.ethereum) {
      window.open("https://metamask.io/download.html", "_blank");
      return;
    }
    
    // Bağlantı işlemleri...
  } catch (err) {
    console.error("MetaMask error:", err);
  }
}

// 3. RENKLİ ARAYÜZ (CSS Ekleri)
<style>
  /* TrustWallet Butonu (Grok'taki Orijinal Stil) */
  .btn-trust {
    background: #3375bb;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 10px;
  }
  
  /* MetaMask Butonu (Yeni Renkli Stil) */
  .btn-meta {
    background: linear-gradient(45deg, #f6851b, #ff9d1c);
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(246, 133, 27, 0.3);
  }
  
  /* Dil Butonu */
  .btn-language {
    background: linear-gradient(45deg, #6e45e2, #88d3ce);
    color: white;
  }
</style>

<!-- 4. HTML (Grok'taki Yapı Korundu) -->
<button id="connectTrustWallet" class="btn-trust">
  <i class="fas fa-wallet"></i> Connect TrustWallet
</button>

<button id="connectMetaMask" class="btn-meta">
  <i class="fab fa-ethereum"></i> Connect MetaMask
</button>

<select id="languageSelect" class="btn-language">
  <option value="en">English</option>
  <option value="tr">Türkçe</option>
</select>
