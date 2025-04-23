let web3;
let userAddress = "";
const TOKEN_DROP_ADDRESS = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7";
const MINIMUM_BNB = 0.035;
const TOKENS_PER_BNB = 12500000;

// WalletConnect + MetaMask uyumlu
const providerOptions = {
  walletconnect: {
    package: window.WalletConnectProvider.default,
    options: {
      rpc: { 56: "https://bsc-dataseed.binance.org/" },
      chainId: 56,
      qrcodeModalOptions: {
        mobileLinks: ["metamask", "trust", "coinbase"],
      },
    },
  },
};

const web3Modal = new window.Web3Modal.default({
  cacheProvider: false,
  providerOptions,
  theme: "dark",
});

// Cüzdan bağla butonu
document.getElementById("connectBtn").addEventListener("click", async () => {
  try {
    const provider = await web3Modal.connect();

    provider.on("disconnect", () => {
      userAddress = "";
      document.getElementById("walletAddress").textContent = "Wallet disconnected";
      document.getElementById("walletBalance").textContent = "";
    });

    provider.on("accountsChanged", (accounts) => {
      userAddress = accounts[0] || "";
      document.getElementById("walletAddress").textContent = userAddress
        ? "Connected: " + userAddress
        : "Wallet disconnected";
    });

    web3 = new Web3(provider);

    const accounts = await web3.eth.requestAccounts(); // bu işlem onay penceresi açtırır
    userAddress = accounts[0];

    const balanceWei = await web3.eth.getBalance(userAddress);
    const balance = web3.utils.fromWei(balanceWei, "ether");

    document.getElementById("walletAddress").textContent = "Connected: " + userAddress;
    document.getElementById("walletBalance").textContent = "BNB Balance: " + parseFloat(balance).toFixed(4) + " BNB";

    const chainId = await web3.eth.getChainId();
    if (chainId !== 56) await switchToBSC(provider);

  } catch (err) {
    console.error("Connection failed:", err);
    alert("Wallet connection failed");
  }
});

// Token miktarını otomatik hesapla
document.getElementById("bnbAmount").addEventListener("input", () => {
  const bnb = parseFloat(document.getElementById("bnbAmount").value);
  document.getElementById("tokenAmount").textContent =
    !isNaN(bnb) && bnb > 0 ? `${(bnb * TOKENS_PER_BNB).toLocaleString()} FDAI` : "0 FDAI";
});

// Token satın al
document.getElementById("buyBtn").addEventListener("click", async () => {
  try {
    if (!userAddress) return alert("Connect your wallet first");

    const bnb = parseFloat(document.getElementById("bnbAmount").value);
    if (isNaN(bnb) || bnb < MINIMUM_BNB) {
      return alert(`Minimum is ${MINIMUM_BNB} BNB`);
    }

    const tx = {
      from: userAddress,
      to: TOKEN_DROP_ADDRESS,
      value: web3.utils.toHex(web3.utils.toWei(bnb.toString(), "ether")),
      gas: web3.utils.toHex(210000),
    };

    // Bu onay penceresini garantili açar:
    const txHash = await web3.currentProvider.request({
      method: "eth_sendTransaction",
      params: [tx],
    });

    alert("Transaction sent!\nHash: " + txHash);
  } catch (err) {
    console.error(err);
    alert("Transaction failed:\n" + err.message);
  }
});

// BSC ağına geç
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
