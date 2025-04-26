<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FreeDogeAI Token Presale</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .logo {
      display: block;
      margin: 0 auto 20px;
      max-width: 200px;
    }
    .btn {
      background-color: #FFD700;
      color: #000;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
      margin: 5px 0;
    }
    .btn-connect {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .btn-buy {
      background-color: #4CAF50;
      color: white;
      width: 100%;
    }
    .modal {
      display: none;
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.4);
    }
    .modal-content {
      background-color: #fefefe;
      margin: 15% auto;
      padding: 20px;
      border-radius: 10px;
      width: 80%;
      max-width: 400px;
    }
    .close {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
      cursor: pointer;
    }
    input[type="number"] {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Logo -->
    <img src="https://freedogeai.com/logo.png" alt="FreeDogeAI Logo" class="logo" id="logo">

    <!-- Cüzdan Bağlama Butonu -->
    <button id="connectWallet" class="btn btn-connect">Connect Wallet</button>

    <!-- Cüzdan Seçme Modal -->
    <div id="walletModal" class="modal">
      <div class="modal-content">
        <span class="close">×</span>
        <h2>Connect Your Wallet</h2>
        <button id="connectMetaMask" class="btn">MetaMask</button>
        <button id="connectTrustWallet" class="btn">TrustWallet</button>
      </div>
    </div>

    <!-- Başlık -->
    <h1>Free Doge AI (FDAI) Presale</h1>

    <!-- Cüzdan Bilgileri -->
    <div id="walletInfo" style="margin: 15px 0;">
      <div id="walletAddress">Wallet: Not Connected</div>
      <div id="bnbBalance">BNB Balance: --</div>
    </div>

    <!-- Token Satın Alma -->
    <input type="number" id="bnbAmount" placeholder="Enter BNB amount" min="0" step="0.001">
    <div id="fdaiAmount">YOU WILL RECEIVE: 0 FDAI</div>
    <button id="buyButton" class="btn btn-buy" disabled>Buy Tokens</button>
    <div id="insufficientFunds" style="display:none;color:red;">⚠ Insufficient funds</div>

    <!-- DROP Butonu -->
    <button id="dropButton" class="btn" style="background:#FF6347;color:white;width:100%;margin-top:10px;">CLAIM FREE DROP</button>

    <!-- Whitepaper -->
    <a href="FreeDogeAI_Whitepaper.pdf" download class="btn" style="display:block;text-align:center;margin:10px 0;">Download Whitepaper</a>
  </div>

  <script>
    // 1. Tüm Temel Fonksiyonlar
    function openModal() {
      document.getElementById("walletModal").style.display = "block";
    }

    function closeModal() {
      document.getElementById("walletModal").style.display = "none";
    }

    // 2. Cüzdan Bağlantıları (MOBİL ÖNCELİKLİ)
    async function connectWallet(walletType) {
      let deepLink;
      
      if (walletType === "metamask") {
        deepLink = `https://metamask.app.link/dapp/${encodeURIComponent(window.location.href)}`;
      } else {
        deepLink = `https://link.trustwallet.com/open_url?coin_id=60&url=${encodeURIComponent(window.location.href)}`;
      }

      // Önce uygulamayı aç
      window.location.href = deepLink;
      
      // 3 saniye içinde bağlanmazsa mağazaya yönlendir
      setTimeout(() => {
        if (!window.ethereum) {
          const isAndroid = /Android/i.test(navigator.userAgent);
          let storeLink;
          
          if (walletType === "metamask") {
            storeLink = isAndroid ? 
              "https://play.google.com/store/apps/details?id=io.metamask" :
              "https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202";
          } else {
            storeLink = isAndroid ?
              "https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp" :
              "https://apps.apple.com/us/app/trust-crypto-bitcoin-wallet/id1288339409";
          }
          
          window.location.href = storeLink;
        }
      }, 3000);
    }

    // 3. Otomatik Hesaplama
    function setupCalculator() {
      const bnbInput = document.getElementById("bnbAmount");
      
      bnbInput.addEventListener("input", function() {
        const bnbValue = parseFloat(this.value) || 0;
        const tokens = bnbValue * 12500000; // 1 BNB = 12.5M FDAI
        
        document.getElementById("fdaiAmount").textContent = 
          `YOU WILL RECEIVE: ${tokens.toLocaleString()} FDAI`;
        
        document.getElementById("buyButton").disabled = bnbValue < 0.035;
      });
    }

    // 4. Buton Eventleri
    document.getElementById("connectWallet").addEventListener("click", openModal);
    document.getElementById("connectMetaMask").addEventListener("click", () => connectWallet("metamask"));
    document.getElementById("connectTrustWallet").addEventListener("click", () => connectWallet("trustwallet"));
    document.querySelector(".close").addEventListener("click", closeModal);
    
    // Sayfa yüklendiğinde
    window.addEventListener("DOMContentLoaded", function() {
      setupCalculator();
    });
  </script>
</body>
</html>
