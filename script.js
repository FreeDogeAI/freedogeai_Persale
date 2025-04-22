let web3;
let userAddress = "";
const TOKENS_PER_BNB = 12500000;
const MINIMUM_BNB = 0.035;
const TOKEN_DROP_ADDRESS = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7";

// WalletConnect + MetaMask desteği
const providerOptions = {
  walletconnect: {
    package: window.WalletConnectProvider.default,
    options: {
      rpc: { 56: "https://bsc-dataseed.binance.org/" },
      chainId: 56,
    },
  },
};

// Web3Modal popup başlat
const web3Modal = new window.Web3Modal.default({
  cacheProvider: false,
  providerOptions,
  theme: "dark",
});

// Cüzdan bağla
document.getElementById("connectBtn").addEventListener("click", async () => {
  try {
    const provider = await web3Modal.connect();
    web3 = new Web3(provider);

    const accounts = await web3.eth.getAccounts();
    userAddress = accounts[0];

    document.getElementById("walletAddress").textContent = `Connected: ${userAddress}`;

    const balanceWei = await web3.eth.getBalance(userAddress);
    const balance = web3.utils.fromWei(balanceWei, "ether");
    document.getElementById("walletBalance").textContent = `BNB Balance: ${parseFloat(balance).toFixed(4)} BNB`;

    const chainId = await web3.eth.getChainId();
    if (chainId !== 56) await switchToBSC(provider);

  } catch (err) {
    console.error(err);
    alert("Connection failed: " + err.message);
  }
});

// BNB girilince hesapla
document.getElementById("bnbAmount").addEventListener("input", () => {
  const bnb = parseFloat(document.getElementById("bnbAmount").value);
  document.getElementById("tokenAmount").textContent =
    !isNaN(bnb) && bnb > 0 ? `${(bnb * TOKENS_PER_BNB).toLocaleString()} FDAI` : "0 FDAI";
});

// Satın alma
document.getElementById("buyBtn").addEventListener("click", async () => {
  try {
    if (!userAddress) return alert("Connect wallet first.");
    const bnb = parseFloat(document.getElementById("bnbAmount").value);
    if (isNaN(bnb) || bnb < MINIMUM_BNB) return alert(`Minimum is ${MINIMUM_BNB} BNB`);

    const tx = {
      from: userAddress,
      to: TOKEN_DROP_ADDRESS,
      value: web3.utils.toWei(bnb.toString(), "ether"),
      gas: 210000,
    };

    web3.eth.sendTransaction(tx)
      .on("transactionHash", (hash) => alert("Transaction sent!\nHash: " + hash))
      .on("error", (err) => {
        console.error(err);
        let msg = "Transaction failed.";
        if (err.code === 4001) msg = "Transaction rejected by user.";
        else if (err.message.includes("insufficient funds")) msg = "Insufficient BNB balance.";
        alert(msg + "\nDetails: " + err.message);
      });

  } catch (err) {
    console.error(err);
    alert("Error: " + err.message);
  }
});

// BSC ağına geçiş
async function switchToBSC(provider) {
  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x38" }],
    });
  } catch (err) {
    if (err.code === 4902) {
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [{
          chainId: "0x38",
          chainName: "Binance Smart Chain",
          rpcUrls: ["https://bsc-dataseed.binance.org/"],
          nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
          blockExplorerUrls: ["https://bscscan.com"],
        }],
      });
    } else {
      throw err;
    }
  }
}
