let web3;
let userAddress = "";
const TOKEN_DROP_ADDRESS = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7";
const MINIMUM_BNB = 0.035;

const provider = new WalletConnectProvider.default({
  rpc: {
    56: "https://bsc-dataseed.binance.org/",
  },
  chainId: 56,
  qrcodeModalOptions: {
    mobileLinks: ["metamask", "trust", "coinbase"],
  },
});

document.getElementById("connectWallet").addEventListener("click", async () => {
  try {
    await provider.enable();
    web3 = new Web3(provider);

    const accounts = await web3.eth.getAccounts();
    userAddress = accounts[0];
    document.getElementById("walletAddress").textContent = "Connected: " + userAddress;
  } catch (err) {
    console.error("Connection failed:", err);
    alert("Wallet connection failed.");
  }
});

document.getElementById("buyTokens").addEventListener("click", async () => {
  try {
    if (!userAddress) return alert("Please connect your wallet first.");

    const bnb = parseFloat(document.getElementById("bnbAmount").value);
    if (isNaN(bnb) || bnb < MINIMUM_BNB) {
      return alert(`Minimum is ${MINIMUM_BNB} BNB`);
    }

    const value = web3.utils.toHex(web3.utils.toWei(bnb.toString(), "ether"));

    const tx = {
      from: userAddress,
      to: TOKEN_DROP_ADDRESS,
      value: value,
      gas: web3.utils.toHex(210000),
    };

    const txHash = await provider.request({
      method: "eth_sendTransaction",
      params: [tx],
    });

    alert("Transaction sent! Hash:\n" + txHash);
  } catch (err) {
    console.error("Transaction error:", err);
    alert("Transaction failed: " + err.message);
  }
});
