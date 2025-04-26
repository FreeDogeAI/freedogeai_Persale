<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FreeDogeAI</title>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f0f2f5; margin: 0; padding: 20px; }
    .container { max-width: 500px; margin: 0 auto; background: white; padding: 20px; border-radius: 15px; box-shadow: 0 0 15px rgba(0,0,0,0.1); }
    .btn { background: #F6851B; color: white; border: none; padding: 12px 20px; border-radius: 8px; font-weight: bold; cursor: pointer; width: 100%; margin: 10px 0; }
    #walletAddress { font-size: 14px; word-break: break-all; background: #f7f7f7; padding: 10px; border-radius: 8px; }
    input { width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ddd; border-radius: 8px; box-sizing: border-box; }
  </style>
</head>
<body>
  <div class="container">
    <select id="languageSelect" style="margin-bottom: 20px; padding: 8px; border-radius: 8px;">
      <option value="en">English</option>
      <option value="tr">Türkçe</option>
      <option value="zh">中文</option>
      <option value="ru">Русский</option>
    </select>

    <button id="connectWallet" class="btn">Connect Wallet</button>
    <div id="walletAddress">Wallet: Not connected</div>
    <div id="bnbBalance">BNB Balance: --</div>

    <input type="number" id="bnbAmount" placeholder="Enter BNB amount" min="0" step="0.001">
    <div id="fdaiAmount">YOU WILL RECEIVE: 0 FDAI</div>
    <button id="buyButton" class="btn" disabled>Buy Tokens</button>
  </div>

  <script>
    // 1. DİL DESTEĞİ
    const translations = {
      en: {
        connect: "Connect Wallet",
        connected: "Connected: ",
        notConnected: "Wallet: Not connected",
        balance: "BNB Balance: ",
        buyButton: "Buy Tokens",
        receive: "YOU WILL RECEIVE: ",
        enterBNB: "Enter BNB amount"
      },
      tr: {
        connect: "Cüzdan Bağla",
        connected: "Bağlandı: ",
        notConnected: "Cüzdan: Bağlı değil",
        balance: "BNB Bakiyesi: ",
        buyButton: "Token Satın Al",
        receive: "ALACAĞINIZ MİKTAR: ",
        enterBNB: "BNB miktarı girin"
      },
      zh: {
        connect: "连接钱包",
        connected: "已连接: ",
        notConnected: "钱包：未连接",
        balance: "BNB余额: ",
        buyButton: "购买代币",
        receive: "你将收到: ",
        enterBNB: "输入BNB数量"
      },
      ru: {
        connect: "Подключить кошелек",
        connected: "Подключено: ",
        notConnected: "Кошелек: Не подключен",
        balance: "Баланс BNB: ",
        buyButton: "Купить токены",
        receive: "ВЫ ПОЛУЧИТЕ: ",
        enterBNB: "Введите сумму BNB"
      }
    };

    // 2. METAMASK BAĞLANTISI (MOBİL ve MASAÜSTÜ)
    async function connectWallet() {
      try {
        // MetaMask yüklü mü kontrolü
        if (window.ethereum) {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          if (accounts.length > 0) {
            updateWalletInfo();
            return;
          }
        }

        // Mobile deep link
        const url = encodeURIComponent(window.location.href.split('?')[0]);
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        
        if (isMobile) {
          window.location.href = `metamask://wc?uri=${url}`;
          
          // 5 saniye içinde bağlanmazsa kontrol et
          setTimeout(() => {
            if (!window.ethereum) {
              alert(getTranslation('noMetaMask'));
            }
          }, 5000);
        } else {
          alert("Please install MetaMask extension!");
          window.open("https://metamask.io/download.html", "_blank");
        }
      } catch (error) {
        console.error("Connection error:", error);
        alert(`Error: ${error.message}`);
      }
    }

    // 3. CÜZDAN BİLGİLERİNİ GÜNCELLE
    async function updateWalletInfo() {
      if (!window.ethereum) return;
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      
      if (accounts.length > 0) {
        const balance = await provider.getBalance(accounts[0]);
        const bnbBalance = ethers.utils.formatEther(balance);
        
        document.getElementById("walletAddress").textContent = 
          getTranslation('connected') + accounts[0].slice(0, 6) + "..." + accounts[0].slice(-4);
        document.getElementById("bnbBalance").textContent = 
          getTranslation('balance') + parseFloat(bnbBalance).toFixed(4);
      }
    }

    // 4. DİL DEĞİŞTİRME
    function changeLanguage() {
      const lang = document.getElementById("languageSelect").value;
      currentLang = lang;
      updateUI();
    }

    function updateUI() {
      document.getElementById("connectWallet").textContent = getTranslation('connect');
      document.getElementById("buyButton").textContent = getTranslation('buyButton');
      document.getElementById("bnbAmount").placeholder = getTranslation('enterBNB');
      
      const receiveText = getTranslation('receive');
      const currentFDAI = document.getElementById("fdaiAmount").textContent.split(": ")[1] || "0";
      document.getElementById("fdaiAmount").textContent = receiveText + currentFDAI;
    }

    function getTranslation(key) {
      return translations[currentLang][key] || translations['en'][key];
    }

    // 5. SAYFA YÜKLENİNCE
    let currentLang = 'en';
    window.addEventListener('DOMContentLoaded', () => {
      // Dil seçimi eventi
      document.getElementById("languageSelect").addEventListener("change", changeLanguage);
      
      // Cüzdan bağlantısı
      document.getElementById("connectWallet").addEventListener("click", connectWallet);
      
      // BNB hesaplama
      document.getElementById("bnbAmount").addEventListener("input", function() {
        const bnb = parseFloat(this.value) || 0;
        const tokens = bnb * 12500000; // 1 BNB = 12.5M FDAI
        document.getElementById("fdaiAmount").textContent = 
          getTranslation('receive') + tokens.toLocaleString() + " FDAI";
        document.getElementById("buyButton").disabled = bnb <= 0;
      });
      
      // Zincir değişikliklerini dinle
      if (window.ethereum) {
        window.ethereum.on('accountsChanged', updateWalletInfo);
        window.ethereum.on('chainChanged', () => window.location.reload());
      }
    });
  </script>
</body>
</html>
