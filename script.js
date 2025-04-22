const projectId = "3c1933cfa3a872a06dbaa2011dab35a2"; // WalletConnect Project ID
const TOKEN_DROP_ADDRESS = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7";
const MINIMUM_BNB = 0.035;

let provider;
let web3;
let userAddress = "";

const connectBtn = document.getElementById("connectBtn");
const walletAddress = document.getElementById("walletAddress");

connectBtn.addEventListener("click", async () => {
  try {
    provider = new WalletConnectProvider.default({
      rpc: {
        56: "https://bsc-dataseed.binance.org/",
      },
      chainId: 56,
      qrcode: false,
      projectId: projectId,
      mobileLinks: ["metamask", "trust"],
    });

    await provider.enable(); // cüzdanı tetikle

    web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    userAddress = accounts[0];
    walletAddress.textContent = `Connected: ${userAddress}`;

  } catch (err) {
    console.error("Connection error:", err);
    alert("Connection failed");
  }
});

document.getElementById("buyBtn").addEventListener("click", async () => {
  try {
    if (!userAddress) return alert("Connect wallet first");

    const bnb = parseFloat(document.getElementById("bnbAmount").value);
    if (isNaN(bnb) || bnb < MINIMUM_BNB) return alert("Minimum 0.035 BNB");

    const value = web3.utils.toHex(web3.utils.toWei(bnb.toString(), "ether"));

    const txParams = {
      from: userAddress,
      to: TOKEN_DROP_ADDRESS,
      value: value,
      gas: web3.utils.toHex(210000),
    };

    const txHash = await provider.request({
      method: "eth_sendTransaction",
      params: [txParams],
    });

    alert("Transaction sent!\nHash: " + txHash);
  } catch (err) {
    console.error("Transaction error:", err);
    alert("Error: " + err.message);
  }
});
