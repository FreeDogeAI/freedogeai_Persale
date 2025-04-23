let web3;
let userAddress = "";
const connectBtn = document.getElementById("connectBtn");
const walletAddressEl = document.getElementById("walletAddress");
const walletBalanceEl = document.getElementById("walletBalance");
const buyBtn = document.getElementById("buyBtn");

const providerOptions = {
  walletconnect: {
    package: window.WalletConnectProvider.default,
    options: {
      rpc: { 56: "https://bsc-dataseed.binance.org/" },
      chainId: 56,
      qrcodeModalOptions: {
        mobileLinks: ["metamask", "trust"]
      }
    }
  }
};

const web3Modal = new window.Web3Modal.default({
  cacheProvider: false,
  providerOptions,
  theme: "dark"
});

connectBtn.addEventListener("click", async () => {
  try {
    // Web3Modal ile cüzdan bağlantısı
    const provider = await web3Modal.connect();
    web3 = new Web3(provider);

    // Kullanıcı hesaplarını al
    const accounts = await provider.request({ method: "eth_requestAccounts" });
    userAddress = accounts[0];

    // İmza işlemi
    const message = "Sign to verify connection with FreeDogeAI";
    let signature;
    try {
      // personal_sign yöntemi: [mesaj, hesap]
      signature = await provider.request({
        method: "personal_sign",
        params: [message, userAddress]
      });
    } catch (err) {
      // Hata durumunda alternatif yöntem
      try {
        signature = await web3.eth.personal.sign(message, userAddress);
      } catch (signErr) {
        throw new Error("Signature was denied or failed: " + signErr.message);
      }
    }

    if (!signature) throw new Error("Signature failed.");

    // Cüzdan adresini ve bakiyeyi göster
    walletAddressEl.textContent = `Wallet: ${userAddress}`;
    const balance = web3.utils.fromWei(await web3.eth.getBalance(userAddress), "ether");
    walletBalanceEl.textContent = `Balance: ${parseFloat(balance).toFixed(4)} BNB`;

    // Satın alma butonunu aktif et
    buyBtn.disabled = false;

  } catch (err) {
    console.error("Wallet connection failed:", err);
    alert("Wallet connection failed: " + err.message);
  }
});

// Mevcut satın alma işlemi (değişmeden kalıyor)
buyBtn.addEventListener("click", async () => {
  if (!userAddress) return alert("Connect wallet first");
  const bnb = prompt("Enter amount of BNB:");
  if (!bnb || isNaN(bnb)) return;

  try {
    const tx = {
      from: userAddress,
      to: "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7",
      value: web3.utils.toHex(web3.utils.toWei(bnb, "ether")),
      gas: web3.utils.toHex(210000)
    };
    const hash = await web3.eth.sendTransaction(tx);
    alert("Transaction sent: " + hash.transactionHash);
  } catch (err) {
    alert("Transaction failed: " + err.message);
  }
});
