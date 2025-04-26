const tokenDropAddress = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7";
const tokenContractAddress = "0x8161698A74F2ea0035B9912ED60140893Ac0f39C";
const yourWalletAddress = "0xd924e01c7d319c5b23708cd622bd1143cd4fb360";
const tokenRatePerBNB = 12500000;
const minBNB = 0.035;

let provider;
let signer;
let userAddress;

// Wallet Bağlama
async function connectWallet() {
  try {
    if (typeof window.ethereum !== 'undefined') {
      provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();
      userAddress = await signer.getAddress();
      document.getElementById("join-button").innerText = translations[currentLang].walletConnected;
      document.getElementById("join-button").disabled = true;
    } else {
      if (/Android|iPhone/i.test(navigator.userAgent)) {
        window.location.href = "https://metamask.app.link/dapp/" + window.location.hostname;
      } else {
        alert(translations[currentLang].noWalletFound);
      }
    }
  } catch (error) {
    console.error(error);
    alert(translations[currentLang].walletConnectionFailed);
  }
}

// Token Hesaplama
function calculateTokens() {
  const bnbAmount = parseFloat(document.getElementById("bnb-amount").value);
  if (!isNaN(bnbAmount)) {
    const tokens = bnbAmount * tokenRatePerBNB;
    document.getElementById("token-amount").innerText = translations[currentLang].youWillReceive + tokens.toLocaleString();
  } else {
    document.getElementById("token-amount").innerText = translations[currentLang].youWillReceive + "0";
  }
}

// Token Satın Alma
async function buyTokens() {
  const bnbAmount = parseFloat(document.getElementById("bnb-amount").value);

  if (isNaN(bnbAmount) || bnbAmount < minBNB) {
    alert(translations[currentLang].minPurchaseWarning);
    return;
  }

  if (!provider || !signer) {
    alert(translations[currentLang].pleaseConnectWallet);
    return;
  }

  try {
    const tx = await signer.sendTransaction({
      to: yourWalletAddress,
      value: ethers.utils.parseEther(bnbAmount.toString())
    });
    await tx.wait();
    alert(translations[currentLang].paymentSuccessful);

    const abi = [
      "function claimTo(address receiver, uint256 quantity) public"
    ];
    const tokenDropContract = new ethers.Contract(tokenDropAddress, abi, signer);

    const tokenAmount = bnbAmount * tokenRatePerBNB;
    await tokenDropContract.claimTo(userAddress, tokenAmount);

    alert(translations[currentLang].tokensSent);
  } catch (error) {
    console.error(error);
    alert(translations[currentLang].transactionFailed);
  }
}

// Dil Çevirileri
let currentLang = "tr";

const translations = {
  tr: {
    mainTitle: "FDAI Ön Satışına Katıl!",
    subtitle: "Geleceğini FreeDogeAI (FDAI) ile güvence altına al!",
    walletConnected: "Cüzdan Bağlandı!",
    noWalletFound: "MetaMask veya TrustWallet bulunamadı!",
    walletConnectionFailed: "Cüzdan bağlantısı başarısız oldu!",
    buyTitle: "FDAI Token Satın Al",
    buyDesc: "FDAI satın almak için BNB gönderebilirsiniz. Tokenlar otomatik olarak cüzdanınıza teslim edilecektir.",
    buyButton: "FDAI Token Satın Al",
    minimumWarning: "Minimum alım tutarı: 0.035 BNB",
    howToTitle: "FDAI Nasıl Satın Alınır?",
    youWillReceive: "Alacağınız FDAI: ",
    pleaseConnectWallet: "Lütfen önce cüzdanınızı bağlayın!",
    minPurchaseWarning: "Minimum alım tutarı 0.035 BNB'dir!",
    paymentSuccessful: "Ödeme başarılı! FDAI tokenlar gönderiliyor...",
    tokensSent: "FDAI tokenlar cüzdanınıza gönderildi!",
    transactionFailed: "İşlem başarısız oldu. Lütfen tekrar deneyin.",
    whitepaperTitle: "Whitepaper İndir",
    whitepaperButton: "Whitepaper'ı İndir",
    communityTitle: "Topluluğumuza Katıl",
    communityDesc: "FreeDogeAI topluluğuna katıl ve gelişmeleri kaçırma!"
  },

// (Burası devam edecek: EN, RU, ZH çevirileri)
};

function setLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];

  document.getElementById("main-title").innerText = t.mainTitle;
  document.getElementById("subtitle").innerText = t.subtitle;
  document.getElementById("join-button").innerText = t.walletConnected;
  document.getElementById("buy-title").innerText = t.buyTitle;
  document.getElementById("buy-desc").innerText = t.buyDesc;
  document.getElementById("buy-button").innerText = t.buyButton;
  document.getElementById("minimum-warning").innerText = t.minimumWarning;
  document.getElementById("how-to-title").innerText = t.howToTitle;
  document.getElementById("whitepaper-title").innerText = t.whitepaperTitle;
  document.getElementById("whitepaper-button").innerText = t.whitepaperButton;
  document.getElementById("community-title").innerText = t.communityTitle;
  document.getElementById("community-desc").innerText = t.communityDesc;

  // Yol Haritası Liste Güncelle
}
