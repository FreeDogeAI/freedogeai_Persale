// 1. TEMEL CÜZDAN BAĞLAMA FONKSİYONU
async function connectWallet() {
  try {
    // MetaMask veya diğer cüzdanları kontrol et
    if (window.ethereum) {
      // Hesapları iste
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      // Bağlantı başarılı ise
      if (accounts.length > 0) {
        const account = accounts[0];
        console.log('Bağlanan hesap:', account);
        
        // Kısaltılmış adres gösterimi
        const shortAddress = `${account.slice(0, 6)}...${account.slice(-4)}`;
        
        // Arayüzü güncelle
        document.getElementById('connectButton').style.display = 'none';
        document.getElementById('connectedWallet').style.display = 'block';
        document.getElementById('walletAddress').textContent = shortAddress;
        
        return account;
      }
    } else {
      // Cüzdan yüklü değilse
      alert('Lütfen MetaMask veya Trust Wallet gibi bir cüzdan yükleyin!');
      window.open('https://metamask.io/download.html', '_blank');
    }
  } catch (error) {
    console.error('Bağlantı hatası:', error);
    alert(`Bağlantı hatası: ${error.message}`);
  }
}

// 2. BUTON EVENT LİSTENER'LARI
document.addEventListener('DOMContentLoaded', function() {
  // Bağlan butonu
  const connectBtn = document.getElementById('connectButton');
  if (connectBtn) {
    connectBtn.addEventListener('click', connectWallet);
  }
  
  // Cüzdan değişikliklerini dinle
  if (window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length === 0) {
        // Cüzdan bağlantısı kesildi
        document.getElementById('connectButton').style.display = 'block';
        document.getElementById('connectedWallet').style.display = 'none';
      } else {
        // Hesap değişti, güncelle
        const shortAddress = `${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`;
        document.getElementById('walletAddress').textContent = shortAddress;
      }
    });
  }
});

// 3. BASİT HTML ÖRNEĞİ (Kullanmanız için)
/*
<button id="connectButton">Cüzdanı Bağla</button>
<div id="connectedWallet" style="display:none;">
  <span>Bağlı Cüzdan: </span>
  <span id="walletAddress"></span>
</div>
*/
