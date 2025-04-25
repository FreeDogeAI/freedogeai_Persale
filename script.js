// Web3 ve i18next'i başlat
let web3;
let selectedAccount;

// i18next dil kaynakları
const resources = {
  en: {
    translation: {
      connect_wallet: "Connect Wallet",
      buy_tokens: "Buy Tokens",
      enter_bnb: "Enter BNB amount",
      you_will_receive: "You will receive:",
      about: "The future doesn’t wait. Free Doge AI is not just a meme—it’s a movement. When others hesitate, we launch. Don’t be the one who watches from the sidelines. Be the one who rides the next wave. This is your moment. Don’t miss it.",
      community: "Community",
      download_whitepaper: "Download Whitepaper (PDF)"
    }
  },
  zh: {
    translation: {
      connect_wallet: "连接钱包",
      buy_tokens: "购买代币",
      enter_bnb: "输入BNB数量",
      you_will_receive: "您将收到：",
      about: "未来不会等待。Free Doge AI不仅仅是一个模因——它是一场运动。当其他人犹豫时，我们启动。不要做那个在场边观看的人。成为那个乘风破浪的人。这是你的时刻。不要错过。",
      community: "社区",
      download_whitepaper: "下载白皮书 (PDF)"
    }
  },
  ja: {
    translation: {
      connect_wallet: "ウォレットを接続",
      buy_tokens: "トークンを購入",
      enter_bnb: "BNBの量を入力",
      you_will_receive: "あなたは受け取ります：",
      about: "未来は待ってくれません。Free Doge AIは単なるミームではなく、ムーブメントです。他の人がためらっているとき、私たちは始動します。傍観者になるのではなく、次の波に乗る人になりましょう。これはあなたの瞬間です。見逃さないでください。",
      community: "コミュニティ",
      download_whitepaper: "ホワイトペーパーをダウンロード (PDF)"
    }
  },
  ar: {
    translation: {
      connect_wallet: "اتصل بالمحفظة",
      buy_tokens: "شراء الرموز",
      enter_bnb: "أدخل كمية BNB",
      you_will_receive: "سوف تتلقى:",
      about: "المستقبل لا ينتظر. Free Doge AI ليست مجرد ميم - إنها حركة. عندما يتردد الآخرون، نبدأ. لا تكن من يشاهد من الخطوط الجانبية. كن من يركب الموجة التالية. هذه هي لحظتك. لا تفوتها.",
      community: "المجتمع",
      download_whitepaper: "تحميل الورقة البيضاء (PDF)"
    }
  }
};

// i18next'i başlat
i18next.init({
  lng: "en",
  debug: true,
  resources
}, function(err, t) {
  updateContent();
});

// Dil değiştirici
function changeLanguage(lng) {
  i18next.changeLanguage(lng, () => {
    updateContent();
  });
}

// Sayfa içeriğini güncelle
function updateContent() {
  document.getElementById("connectButton").textContent = i18next.t("connect_wallet");
  document.getElementById("buyButton").textContent = i18next.t("buy_tokens");
  document.getElementById("bnbInput").placeholder = i18next.t("enter_bnb");
  document.getElementById("aboutText").textContent = i18next.t("about");
  document.getElementById("whitepaperLink").textContent = i18next.t("download_whitepaper");
  document.getElementById("communityHeader").textContent = i18next.t("community");
}

// MetaMask cüzdanını bağla
document.getElementById("connectButton").addEventListener("click", async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      selectedAccount = accounts[0];
      document.getElementById("walletAddress").textContent = selectedAccount;
      const balance = await web3.eth.getBalance(selectedAccount);
      document.getElementById("bnbBalance").textContent = web3.utils.fromWei(balance, "ether") + " BNB";
      document.getElementById("walletInfo").style.display = "block";
      document.getElementById("buyButton").disabled = false;
    } catch (error) {
      console.error("Cüzdan bağlama hatası:", error);
    }
  } else {
    alert("Lütfen MetaMask'ı yükleyin!");
  }
});

// Token satın alma
document.getElementById("buyButton").addEventListener("click", async () => {
  const bnbAmount = document.getElementById("bnbInput").value;
  if (bnbAmount && selectedAccount) {
    // Burada akıllı sözleşme entegrasyonu yapılmalı
    alert(`Satın alma işlemi: ${bnbAmount} BNB karşılığında FDAI token`);
  } else {
    alert("Lütfen BNB miktarını girin ve cüzdanınızı bağlayın.");
  }
});

// BNB miktarına göre token hesapla
document.getElementById("bnbInput").addEventListener("input", () => {
  const bnbAmount = document.getElementById("bnbInput").value;
  const tokenAmount = bnbAmount * 1000; // Örnek oran: 1 BNB = 1000 FDAI
  document.getElementById("tokenAmount").textContent = tokenAmount;
});
