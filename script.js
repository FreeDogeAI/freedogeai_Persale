// Sabit Bilgiler
const tokenDropAddress = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7"; // Token Drop sözleşmesi
const tokenContractAddress = "0x8161698A74F2ea0035B9912ED60140893Ac0f39C"; // FDAI token adresi
const yourWalletAddress = "0xd924e01c7d319c5b23708cd622bd1143cd4fb360"; // Senin BNB cüzdanın
const tokenRatePerBNB = 12500000; // 1 BNB = 12,500,000 FDAI
const minBNB = 0.035; // Minimum alım 0.035 BNB

let provider;
let signer;
let userAddress;

// Cüzdan Bağlama
async function connectWallet() {
  if (window.ethereum) {
    try {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();
      userAddress = await signer.getAddress();
      document.getElementById("join-button").innerText = "Cüzdan Bağlandı!";
      document.getElementById("join-button").disabled = true;
    } catch (error) {
      alert("Cüzdan bağlama iptal edildi!");
    }
  } else {
    alert("Lütfen MetaMask veya TrustWallet yükleyin!");
  }
}

// FDAI Hesaplama
function calculateTokens() {
  const bnbAmount = parseFloat(document.getElementById("bnb-amount").value);
  if (!isNaN(bnbAmount)) {
    const tokens = bnbAmount * tokenRatePerBNB;
    document.getElementById("token-amount").innerText = `Alacağınız FDAI: ${tokens.toLocaleString()}`;
  } else {
    document.getElementById("token-amount").innerText = "Alacağınız FDAI: 0";
  }
}

// Token Satın Alma
async function buyTokens() {
  const bnbAmount = parseFloat(document.getElementById("bnb-amount").value);

  if (isNaN(bnbAmount) || bnbAmount < minBNB) {
    alert(`Minimum alım tutarı ${minBNB} BNB'dir!`);
    return;
  }

  if (!provider || !signer) {
    alert("Lütfen önce cüzdanınızı bağlayın!");
    return;
  }

  try {
    // BNB'yi senin cüzdanına gönder
    const tx = await signer.sendTransaction({
      to: yourWalletAddress,
      value: ethers.utils.parseEther(bnbAmount.toString())
    });

    await tx.wait();
    alert("Ödeme başarılı! FDAI tokenlar gönderiliyor...");

    // FDAI Tokenları dağıtmak için TokenDrop çağrısı
    const abi = [
      "function claimTo(address receiver, uint256 quantity) public"
    ];
    const tokenDropContract = new ethers.Contract(tokenDropAddress, abi, signer);

    const tokenAmount = bnbAmount * tokenRatePerBNB;
    await tokenDropContract.claimTo(userAddress, tokenAmount);

    alert("FDAI tokenlar cüzdanınıza gönderildi!");
  } catch (error) {
    console.error(error);
    alert("İşlem başarısız oldu. Lütfen tekrar deneyin!");
  }
}

// Dil Değişimi
const translations = {
  tr: {
    mainTitle: "FDAI Ön Satışına Katıl!",
    subtitle: "Geleceğini FreeDogeAI (FDAI) ile güvence altına al!",
    joinButton: "Cüzdanını Bağla",
    buyTitle: "FDAI Token Satın Al",
    buyDesc: "FDAI satın almak için BNB gönderebilirsiniz. Tokenlar otomatik olarak cüzdanınıza teslim edilecektir.",
    buyButton: "FDAI Token Satın Al",
    howToTitle: "FDAI Nasıl Satın Alınır?",
    howToList: [
      "MetaMask veya TrustWallet cüzdanınızı bağlayın.",
      "Satın almak istediğiniz BNB miktarını girin.",
      "FDAI tokenlar otomatik olarak cüzdanınıza gönderilecektir."
    ],
    roadmapTitle: "Yol Haritamız",
    roadmapList: [
      "Ön Satışın Başlaması",
      "Topluluk Oluşturma ve Büyüme",
      "DEX ve CEX Borsa Listelenmeleri",
      "Yeni İşbirlikleri ve Gelişim"
    ],
    faqTitle: "Sıkça Sorulan Sorular",
    faqList: [
      "<b>FDAI nedir?</b> FDAI, Yapay Zeka ve Doge temalarını birleştiren eşsiz bir meme token'dır.",
      "<b>FDAI nasıl satın alınır?</b> Cüzdanınızı bağlayın ve BNB ile FDAI satın alın.",
      "<b>FDAI tokenlarımı nasıl alacağım?</b> Satın alma sonrası tokenlar cüzdanınıza otomatik gönderilecektir."
    ],
    minWarning: "Minimum alım tutarı: 0.035 BNB"
  },
  en: {
    mainTitle: "Join the FDAI Presale!",
    subtitle: "Secure your future with FreeDogeAI (FDAI)!",
    joinButton: "Connect Wallet",
    buyTitle: "Buy FDAI Tokens",
    buyDesc: "Send BNB to buy FDAI tokens. Tokens will be delivered automatically to your wallet.",
    buyButton: "Buy FDAI Tokens",
    howToTitle: "How to Buy FDAI?",
    howToList: [
      "Connect your MetaMask or TrustWallet.",
      "Enter the amount of BNB you want to invest.",
      "FDAI tokens will be sent to your wallet automatically."
    ],
    roadmapTitle: "Our Roadmap",
    roadmapList: [
      "Presale Launch",
      "Community Growth",
      "DEX & CEX Listings",
      "Expansion and Development"
    ],
    faqTitle: "Frequently Asked Questions",
    faqList: [
      "<b>What is FDAI?</b> FDAI is a revolutionary meme token blending AI and Doge.",
      "<b>How to buy FDAI?</b> Connect your wallet and purchase with BNB.",
      "<b>How will I get FDAI tokens?</b> Tokens will be automatically sent to your wallet after purchase."
    ],
    minWarning: "Minimum purchase: 0.035 BNB"
  },
  zh: {
    mainTitle: "参加FDAI预售！",
    subtitle: "通过FreeDogeAI (FDAI)确保你的未来！",
    joinButton: "连接钱包",
    buyTitle: "购买FDAI代币",
    buyDesc: "发送BNB以购买FDAI代币。代币将自动发送到您的钱包。",
    buyButton: "购买FDAI代币",
    howToTitle: "如何购买FDAI？",
    howToList: [
      "连接你的MetaMask或TrustWallet。",
      "输入你想投资的BNB数量。",
      "FDAI代币将自动发送到你的钱包。"
    ],
    roadmapTitle: "我们的路线图",
    roadmapList: [
      "预售启动",
      "社区增长",
      "DEX和CEX上市",
      "扩展和发展"
    ],
    faqTitle: "常见问题解答",
    faqList: [
      "<b>什么是FDAI？</b> FDAI是结合了人工智能和Doge主题的革命性模因代币。",
      "<b>如何购买FDAI？</b> 连接你的钱包并使用BNB购买FDAI。",
      "<b>我如何获得FDAI代币？</b> 购买后代币将自动发送到你的钱包。"
    ],
    minWarning: "最低购买金额：0.035 BNB"
  }
};

function setLanguage(lang) {
  const t = translations[lang];

  document.getElementById("main-title").innerHTML = t.mainTitle;
  document.getElementById("subtitle").innerHTML = t.subtitle;
  document.getElementById("join-button").innerHTML = t.joinButton;
  document.getElementById("buy-title").innerHTML = t.buyTitle;
  document.getElementById("buy-desc").innerHTML = t.buyDesc;
  document.getElementById("buy-button").innerHTML = t.buyButton;
  document.getElementById("how-to-title").innerHTML = t.howToTitle;

  let howToHtml = "";
  t.howToList.forEach(item => {
    howToHtml += `<li>${item}</li>`;
  });
  document.getElementById("how-to-list").innerHTML = howToHtml;

  document.getElementById("roadmap-title").innerHTML = t.roadmapTitle;
  let roadmapHtml = "";
  t.roadmapList.forEach(item => {
    roadmapHtml += `<li>${item}</li>`;
  });
  document.getElementById("roadmap-list").innerHTML = roadmapHtml;

  document.getElementById("faq-title").innerHTML = t.faqTitle;
  let faqHtml = "";
  t.faqList.forEach(item => {
    faqHtml += `<li>${item}</li>`;
  });
  document.getElementById("faq-list").innerHTML = faqHtml;

  document.getElementById("minimum-warning").innerHTML = t.minWarning;
}
