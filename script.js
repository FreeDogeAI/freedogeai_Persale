// Configuration
const CONFIG = {
  RECEIVE_WALLET: "0xd924e01c7d319c5b23708cd622bd1143cd4fb360",
  TOKENS_PER_BNB: 120000000000,
  BSC_CHAIN_ID: 56
};

// App state
let web3;
let userAddress = "";
const translations = {
  en: {
    headline: "FreeDogeAI Presale",
    subtitle: "Don't miss the next Doge! This opportunity won't last long.",
    connect: "🔗 Connect with MetaMask",
    walletTitle: "Your Wallet",
    bnbAmount: "BNB Amount:",
    receive: "You will receive:",
    buy: "🚀 Buy FDAI Tokens",
    info: "Important Information",
    note1: "Please use MetaMask to complete your purchase.",
    note2: "To see your tokens in your wallet, add the contract address manually in MetaMask after the transaction.",
    note3: "Tokens will appear in your wallet within 24 hours after your purchase.",
    note4: "NOTE: If FDAI tokens do not appear in your wallet, you can manually add the token using the contract address below.",
    about: "About",
    aboutText: "FreeDogeAI is your next big opportunity in the crypto world. Inspired by Doge, powered by AI.",
    download: "Download Whitepaper (PDF)",
    community: "Community",
    telegram: "Telegram",
    twitter: "Twitter (X)"
  },
  tr: {
    headline: "FreeDogeAI Ön Satışı",
    subtitle: "Bir sonraki Doge'u kaçırmayın! Bu fırsat uzun sürmeyecek.",
    connect: "🔗 MetaMask ile Bağlan",
    walletTitle: "Cüzdanınız",
    bnbAmount: "BNB Tutarı:",
    receive: "Alacağınız:",
    buy: "🚀 FDAI Tokenleri Satın Alın",
    info: "Önemli Bilgiler",
    note1: "Lütfen satın alma işleminizi tamamlamak için MetaMask'ı kullanın.",
    note2: "Cüzdanınızda tokenları görmek için, işlem sonrası sözleşme adresini MetaMask'a manuel ekleyin.",
    note3: "Token'lar satın aldıktan sonraki 24 saat içinde cüzdanınıza yansır.",
    note4: "NOT: Tokenlar görünmüyorsa, aşağıdaki sözleşme adresini manuel olarak ekleyin.",
    about: "Hakkında",
    aboutText: "FreeDogeAI, kripto dünyasında Doge'dan ilham alan ve yapay zeka ile güçlenen bir fırsattır.",
    download: "Whitepaper (PDF) İndir",
    community: "Topluluk",
    telegram: "Telegram",
    twitter: "Twitter (X)"
  },
  ar: {
    headline: "البيع المسبق لـ FreeDogeAI",
    subtitle: "لا تفوت فرصة Doge القادمة! هذه الفرصة لن تدوم طويلاً.",
    connect: "🔗 الاتصال بـ MetaMask",
    walletTitle: "محفظتك",
    bnbAmount: "قيمة BNB:",
    receive: "سوف تستلم:",
    buy: "🚀 شراء رموز FDAI",
    info: "معلومات مهمة",
    note1: "يرجى استخدام MetaMask لإتمام عملية الشراء.",
    note2: "لرؤية الرموز في محفظتك، أضف عنوان العقد يدويًا في MetaMask بعد المعاملة.",
    note3: "ستظهر الرموز في محفظتك خلال 24 ساعة بعد الشراء.",
    note4: "ملاحظة: إذا لم تظهر الرموز، يمكنك إضافتها يدويًا باستخدام عنوان العقد أدناه.",
    about: "حول",
    aboutText: "FreeDogeAI هو فرصتك القادمة في عالم العملات الرقمية. مستوحى من Doge ومدعوم بالذكاء الاصطناعي.",
    download: "تحميل المستند التعريفي (PDF)",
    community: "المجتمع",
    telegram: "تيليجرام",
    twitter: "تويتر (X)"
  },
  hi: {
    headline: "FreeDogeAI प्रीसेल",
    subtitle: "अगले Doge को मिस न करें! यह अवसर लंबे समय तक नहीं रहेगा।",
    connect: "🔗 MetaMask से कनेक्ट करें",
    walletTitle: "आपका वॉलेट",
    bnbAmount: "BNB राशि:",
    receive: "आपको मिलेगा:",
    buy: "🚀 FDAI टोकन खरीदें",
    info: "महत्वपूर्ण जानकारी",
    note1: "कृपया अपनी खरीदारी पूरी करने के लिए MetaMask का उपयोग करें।",
    note2: "अपने वॉलेट में टोकन देखने के लिए, लेन-देन के बाद मैन्युअल रूप से कॉन्ट्रैक्ट पता जोड़ें।",
    note3: "खरीद के 24 घंटे के भीतर टोकन आपके वॉलेट में दिखाई देंगे।",
    note4: "नोट: यदि टोकन दिखाई नहीं दे रहे हैं, तो नीचे दिए गए पते को जोड़ें।",
    about: "परिचय",
    aboutText: "FreeDogeAI आपकी अगली बड़ी क्रिप्टो अवसर है, Doge से प्रेरित और AI द्वारा संचालित।",
    download: "व्हाइटपेपर (PDF) डाउनलोड करें",
    community: "समुदाय",
    telegram: "टेलीग्राम",
    twitter: "ट्विटर (X)"
  },
  ur: {
    headline: "FreeDogeAI پری سیل",
    subtitle: "اگلے Doge کو مت چھوڑیں! یہ موقع زیادہ دیر تک نہیں رہے گا۔",
    connect: "🔗 MetaMask سے جڑیں",
    walletTitle: "آپ کا والیٹ",
    bnbAmount: "BNB رقم:",
    receive: "آپ کو ملے گا:",
    buy: "🚀 FDAI ٹوکن خریدیں",
    info: "اہم معلومات",
    note1: "براہ کرم خرید مکمل کرنے کے لیے MetaMask استعمال کریں۔",
    note2: "اپنے والیٹ میں ٹوکن دیکھنے کے لیے، لین دین کے بعد MetaMask میں ایڈریس شامل کریں۔",
    note3: "خریداری کے 24 گھنٹوں کے اندر ٹوکن آپ کے والیٹ میں ظاہر ہوں گے۔",
    note4: "نوٹ: اگر ٹوکن ظاہر نہیں ہو رہے، تو نیچے دیا گیا ایڈریس شامل کریں۔",
    about: "کے بارے میں",
    aboutText: "FreeDogeAI آپ کا اگلا بڑا موقع ہے، Doge سے متاثر اور AI سے تقویت یافتہ۔",
    download: "وائٹ پیپر (PDF) ڈاؤن لوڈ کریں",
    community: "کمیونٹی",
    telegram: "ٹیلیگرام",
    twitter: "ٹوئٹر (X)"
  },
  ru: {
    headline: "Предпродажа FreeDogeAI",
    subtitle: "Не упустите следующего Doge! Это предложение не продлится долго.",
    connect: "🔗 Подключиться через MetaMask",
    walletTitle: "Ваш кошелек",
    bnbAmount: "Сумма BNB:",
    receive: "Вы получите:",
    buy: "🚀 Купить токены FDAI",
    info: "Важная информация",
    note1: "Пожалуйста, используйте MetaMask для завершения покупки.",
    note2: "Чтобы увидеть токены в кошельке, добавьте адрес контракта вручную после транзакции.",
    note3: "Токены появятся в вашем кошельке в течение 24 часов после покупки.",
    note4: "ПРИМЕЧАНИЕ: Если токены не отображаются, добавьте их вручную по адресу ниже.",
    about: "О нас",
    aboutText: "FreeDogeAI — это ваша следующая большая возможность в криптомире. Вдохновлено Doge, усилено AI.",
    download: "Скачать Whitepaper (PDF)",
    community: "Сообщество",
    telegram: "Телеграм",
    twitter: "Твиттер (X)"
  }
};

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  // Setup event listeners
  document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
  document.getElementById('buyBtn').addEventListener('click', sendBNB);
  document.getElementById('bnbAmount').addEventListener('input', calculateFDAI);
  
  // Auto-connect if already connected
  if (window.ethereum?.selectedAddress) {
    connectWallet();
  }
});
// Language switcher
document.getElementById("languageSwitcher").addEventListener("change", function () {
  const selectedLang = this.value;
  const t = translations[selectedLang];
  if (!t) return;

  // Başlıklar
  document.querySelector("h1").innerText = t.headline;
  document.querySelector(".highlight-message").innerText = t.subtitle;

  // Cüzdan butonu ve bilgileri
  document.getElementById("connectWalletBtn").innerText = t.connect;
  document.querySelector("h3").innerText = t.walletTitle;
  document.querySelector("label[for='bnbAmount']").innerHTML = "<strong>" + t.bnbAmount + "</strong>";
  document.getElementById("calculationResult").innerHTML = "<strong>" + t.receive + "</strong> <span id='fdaiAmount'>0</span> FDAI";
  document.getElementById("buyBtn").innerText = t.buy;

  // Bilgilendirme kutusu
  const infoBox = document.querySelector(".info-box");
  infoBox.querySelector("h3").innerText = t.info;
  const ps = infoBox.querySelectorAll("p");
  ps[0].innerText = t.note1;
  ps[1].innerText = t.note2;
  ps[2].innerText = t.note3;
  ps[3].innerHTML = "<strong>NOTE:</strong> " + t.note4;

  // Hakkında ve Topluluk
  document.querySelector("h3:nth-of-type(2)").innerText = t.about;
  document.querySelector(".wallet-info").nextSibling.textContent = t.aboutText;
  document.querySelector("a[href$='Whitepaper.pdf']").innerText = t.download;
  document.querySelector("h3:nth-of-type(3)").innerText = t.community;
  const links = document.querySelectorAll("ul li a");
  links[0].innerText = t.telegram + ": @freedogeaiFDAI";
  links[1].innerText = t.twitter + ": @FreeDogeAI_FDAI";
});

// Wallet connection handler
async function connectWallet() {
  try {
    // Check if MetaMask is installed
    if (!window.ethereum) {
      // Mobile redirect
      if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        const currentUrl = window.location.href.replace(/^https?:\/\//, '');
        window.location.href = `https://metamask.app.link/dapp/${currentUrl}`;
      } else {
        // Desktop - open MetaMask download page
        window.open("https://metamask.io/download.html", "_blank");
      }
      return;
    }
    
    // Request accounts
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    userAddress = accounts[0];
    web3 = new Web3(window.ethereum);
    
    // Switch to BSC network
    try {
      const chainId = await web3.eth.getChainId();
      if (chainId !== CONFIG.BSC_CHAIN_ID) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x38' }] // BSC Mainnet
        });
      }
    } catch (error) {
      console.log("Network switch failed:", error);
    }
    
    updateWalletUI();
  } catch (error) {
    console.log("Connection error:", error);
  }
}

// Update UI after connection
function updateWalletUI() {
  // Format address display
  const shortAddress = `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
  document.getElementById('walletAddress').textContent = shortAddress;
  document.getElementById('userTokenAddress').textContent = shortAddress;
  
  // Show wallet info and enable buy button
  document.getElementById('walletInfo').style.display = 'block';
  document.getElementById('connectWalletBtn').textContent = '✅ Connected';
  document.getElementById('buyBtn').disabled = false;
  
  // Get and display balance
  web3.eth.getBalance(userAddress).then(balance => {
    const bnbBalance = web3.utils.fromWei(balance, 'ether');
    document.getElementById('bnbBalance').textContent = `${parseFloat(bnbBalance).toFixed(6)} BNB`;
  });
}

// Calculate FDAI tokens
function calculateFDAI() {
  const amount = parseFloat(document.getElementById('bnbAmount').value) || 0;
  document.getElementById('fdaiAmount').textContent = (amount * CONFIG.TOKENS_PER_BNB).toLocaleString();
}

// Send BNB transaction
async function sendBNB() {
  const bnbAmount = parseFloat(document.getElementById('bnbAmount').value);
  
  if (!bnbAmount || bnbAmount <= 0) {
    alert("Lütfen geçerli bir miktar girin!");
    return;
  }
  
  try {
    const weiAmount = web3.utils.toWei(bnbAmount.toString(), 'ether');
    
    const tx = {
      from: userAddress,
      to: CONFIG.RECEIVE_WALLET,
      value: weiAmount,
      gas: 300000,
      gasPrice: await web3.eth.getGasPrice()
    };
    
    const receipt = await web3.eth.sendTransaction(tx);
    alert(`✅ ${bnbAmount} BNB başarıyla gönderildi!\n\nAlacak: ${(bnbAmount * CONFIG.TOKENS_PER_BNB).toLocaleString()} FDAI\nTX Hash: ${receipt.transactionHash}`);
    
  } catch (error) {
    console.error("Transaction failed:", error);
    alert("İşlem başarısız: " + (error.message || error));
  }
}

// Handle account changes
if (window.ethereum) {
  window.ethereum.on('accountsChanged', (accounts) => {
    if (accounts.length > 0) {
      userAddress = accounts[0];
      updateWalletUI();
    } else {
      // Disconnect
      document.getElementById('walletInfo').style.display = 'none';
      document.getElementById('connectWalletBtn').textContent = '🔗 Connect Wallet';
      document.getElementById('buyBtn').disabled = true;
    }
  });
  
  window.ethereum.on('chainChanged', () => window.location.reload());
}
