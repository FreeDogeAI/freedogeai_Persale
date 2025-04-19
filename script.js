document.addEventListener("DOMContentLoaded", () => {
  const connectWalletBtn = document.getElementById("connectWallet");
  const buyNowBtn = document.getElementById("buyNow");

  // Dil içeriği
  const langData = {
    en: {
      header: "FreeDogeAI Token Presale",
      connect: "Connect Wallet",
      tokenInfo: "Token Information",
      buy: "Buy Tokens",
      rate: "1 BNB = 12,500,000 FDAI",
      buyNow: "Buy Now",
      min: "Minimum: 0.035 BNB",
      tokenomics: "Tokenomics",
      whitepaper: "Whitepaper",
      download: "Download Whitepaper (PDF)"
    },
    tr: {
      header: "FreeDogeAI Token Ön Satış",
      connect: "Cüzdan Bağla",
      tokenInfo: "Token Bilgileri",
      buy: "Token Satın Al",
      rate: "1 BNB = 12.500.000 FDAI",
      buyNow: "Şimdi Satın Al",
      min: "Minimum: 0.035 BNB",
      tokenomics: "Tokenomik",
      whitepaper: "Whitepaper",
      download: "Whitepaper İndir (PDF)"
    }
  };

  // Dil değiştirici
  document.getElementById("langSelect").addEventListener("change", (e) => {
    const lang = e.target.value;
    const t = langData[lang];
    document.getElementById("headerTitle").innerText = t.header;
    connectWalletBtn.innerText = t.connect;
    document.getElementById("tokenInfoTitle").innerText = t.tokenInfo;
    document.getElementById("buySectionTitle").innerText = t.buy;
    document.getElementById("rateInfo").innerText = t.rate;
    buyNowBtn.innerText = t.buyNow;
    document.getElementById("minPurchase").innerText = t.min;
    document.getElementById("tokenomicsTitle").innerText = t.tokenomics;
    document.getElementById("whitepaperTitle").innerText = t.whitepaper;
    document.getElementById("downloadBtn").innerText = t.download;
  });

  // Cüzdan bağlantısı (MetaMask, Trust Wallet, Brave vs.)
  connectWalletBtn.addEventListener("click", async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const address = accounts[0];
        connectWalletBtn.innerText = "Connected: " + address.slice(0, 6) + "..." + address.slice(-4);
      } catch (error) {
        alert("Wallet connection failed.");
      }
    } else {
      alert("No EVM-compatible wallet detected. Please install MetaMask or Trust Wallet.");
    }
  });

  // Satın alma işlemi
  buyNowBtn.addEventListener("click", async () => {
    if (!window.ethereum) {
      alert("Wallet not detected.");
      return;
    }

    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    const from = accounts[0];

    try {
      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: from,
          to: "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7", // Presale kontrat adresi
          value: (0.035 * 1e18).toString(16), // Minimum 0.035 BNB
        }]
      });
      alert("Transaction sent successfully!");
    } catch (err) {
      alert("Transaction failed: " + err.message);
    }
  });
});
