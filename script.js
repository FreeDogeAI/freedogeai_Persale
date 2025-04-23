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
    console.log("1. Web3Modal ile bağlantı başlatılıyor...");
    const provider = await web3Modal.connect();
    console.log("2. Provider alındı:", provider);

    web3 = new Web3(provider);
    console.log("3. Web3 instance oluşturuldu.");

    console.log("4. Kullanıcı hesapları isteniyor...");
    const accounts = await provider.request({ method: "eth_requestAccounts" });
    userAddress = accounts[0];
    console.log("5. Kullanıcı adresi alındı:", userAddress);

    // İmza işlemi
    const message = "Sign to verify connection with FreeDogeAI";
    console.log("6. İmza işlemi başlatılıyor, mesaj:", message);

    let signature;
    try {
      // MetaMask ve WalletConnect için en uyumlu yöntem: personal_sign
      signature = await provider.request({
        method: "personal_sign",
        params: [message, userAddress] // Mesaj önce, adres sonra
      });
      console.log("7. İmza başarılı:", signature);
    } catch (err) {
      console.error("İmza hatası:", err);
      throw new Error("Signature failed: " + err.message);
    }

    // Cüzdan adresini ve bakiyeyi göster
    walletAddressEl.textContent = `Wallet: ${userAddress}`;
    const balance = web3.utils.fromWei(await web3.eth.getBalance(userAddress), "ether");
    walletBalanceEl.textContent = `Balance: ${parseFloat(balance).toFixed(4)} BNB`;
    console.log("8. Adres ve bakiye gösterildi.");

    // Satın alma butonunu aktif et
    buyBtn.disabled = false;
    console.log("9. Satın alma butonu aktif edildi.");

  } catch (err) {
    console.error("Bağlantı veya imza hatası:", err);
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
