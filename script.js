// Set language on change
document.getElementById("languageSelect").addEventListener("change", () => {
  const lang = document.getElementById("languageSelect").value;
  const t = translations[lang];
  document.getElementById("title").textContent = t.title;
  document.getElementById("walletAddress").textContent = t.walletNotConnected;
  document.getElementById("buyBtn").textContent = t.buy;
  document.getElementById("about").textContent = t.about;
  document.getElementById("aboutText").textContent = t.aboutText;
  document.getElementById("whiteLink").textContent = t.whitepaper;
  document.getElementById("communityText").textContent = t.community;
});

// Wallet connection logic
async function connectWallet(deepLink) {
  const provider = window.ethereum;
  if (!provider) {
    window.open(deepLink, "_blank");
    return;
  }

  web3 = new Web3(provider);
  const accounts = await provider.request({ method: "eth_requestAccounts" });
  userAddress = accounts[0];

  document.getElementById("walletAddress").textContent = `Connected: ${userAddress}`;
  const balanceWei = await web3.eth.getBalance(userAddress);
  const balance = web3.utils.fromWei(balanceWei, "ether");
  document.getElementById("walletBalance").textContent = `BNB Balance: ${parseFloat(balance).toFixed(4)} BNB`;

  await web3.eth.personal.sign("Verify ownership for FreeDogeAI", userAddress);
  document.getElementById("buyBtn").disabled = false;
}

// Bağlantı butonları
document.getElementById("connectMetaMask").addEventListener("click", () => {
  connectWallet("https://metamask.app.link/dapp/freedogeai.com");
});
document.getElementById("connectTrustWallet").addEventListener("click", () => {
  connectWallet("https://link.trustwallet.com/open_url?coin_id=20000714&url=https://freedogeai.com");
});
document.getElementById("connectBinance").addEventListener("click", () => {
  connectWallet("https://www.binance.com/en/wallet-direct?url=https://freedogeai.com");
});

// Token hesaplama
document.getElementById("bnbAmount").addEventListener("input", () => {
  const bnb = parseFloat(document.getElementById("bnbAmount").value);
  document.getElementById("tokenAmount").textContent =
    !isNaN(bnb) && bnb > 0 ? `${(bnb * TOKENS_PER_BNB).toLocaleString()} FDAI` : "0 FDAI";
});

// Buy Tokens
document.getElementById("buyBtn").addEventListener("click", async () => {
  const bnb = parseFloat(document.getElementById("bnbAmount").value);
  if (!userAddress || isNaN(bnb) || bnb < MINIMUM_BNB) {
    alert("Invalid input or wallet not connected");
    return;
  }

  const value = web3.utils.toHex(web3.utils.toWei(bnb.toString(), "ether"));
  const tx = {
    from: userAddress,
    to: OWNER_WALLET,
    value: value
  };

  try {
    await web3.currentProvider.request({
      method: "eth_sendTransaction",
      params: [tx]
    });
    alert("Transaction sent!");
  } catch (err) {
    alert("Transaction failed: " + err.message);
  }
});
