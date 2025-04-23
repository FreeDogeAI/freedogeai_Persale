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
      chainId: 56
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
    const provider = await web3Modal.connect();
    web3 = new Web3(provider);

    const accounts = await web3.eth.getAccounts();
    userAddress = accounts[0];

    // --- İMZA ZORUNLU ---
    const message = "Sign to verify connection with FreeDogeAI";
    const hexMsg = web3.utils.utf8ToHex(message);

    let signature;
    try {
      // 1. yöntem
      signature = await provider.request({
        method: "personal_sign",
        params: [hexMsg, userAddress]
      });
    } catch {
      try {
        // 2. yöntem (fallback)
        signature = await web3.eth.personal.sign(message, userAddress);
      } catch (err) {
        throw new Error("Signature was denied.");
      }
    }

    if (!signature) throw new Error("Signature failed.");

    walletAddressEl.textContent = `Wallet: ${userAddress}`;
    const balance = web3.utils.fromWei(await web3.eth.getBalance(userAddress), "ether");
    walletBalanceEl.textContent = `Balance: ${parseFloat(balance).toFixed(4)} BNB`;

    buyBtn.disabled = false;

  } catch (err) {
    console.error(err);
    alert("Wallet connection failed: " + err.message);
  }
});

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
