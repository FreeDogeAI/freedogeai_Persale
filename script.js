let web3;
let userAddress = "";

const TOKENS_PER_BNB = 12500000;
const TOKEN_DROP_ADDRESS = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7";

const providerOptions = {
  walletconnect: {
    package: window.WalletConnectProvider.default,
    options: {
      rpc: {
        56: "https://bsc-dataseed.binance.org/"
      },
      chainId: 56
    }
  }
};

const web3Modal = new window.Web3Modal.default({
  cacheProvider: false,
  providerOptions
});

const connectBtn = document.getElementById("connectBtn");
const walletAddress = document.getElementById("walletAddress");
const bnbAmountInput = document.getElementById("bnbAmount");
const tokenAmount = document.getElementById("tokenAmount");
const buyBtn = document.getElementById("buyBtn");

connectBtn.addEventListener("click", async () => {
  try {
    const provider = await web3Modal.connect();
    web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    userAddress = accounts[0];
    walletAddress.textContent = `Connected: ${userAddress}`;
  } catch (err) {
    walletAddress.textContent = "Connection failed";
  }
});

bnbAmountInput.addEventListener("input", () => {
  const bnb = parseFloat(bnbAmountInput.value);
  tokenAmount.textContent = !isNaN(bnb) && bnb > 0 ? `${bnb * TOKENS_PER_BNB} FDAI` : "0 FDAI";
});

buyBtn.addEventListener("click", async () => {
  const bnb = parseFloat(bnbAmountInput.value);
  if (!userAddress) return alert("Please connect wallet");
  if (isNaN(bnb) || bnb < 0.035) return alert("Minimum is 0.035 BNB");

  try {
    await web3.eth.sendTransaction({
      from: userAddress,
      to: TOKEN_DROP_ADDRESS,
      value: web3.utils.toWei(bnb.toString(), "ether")
    });
    alert("Transaction sent!");
  } catch (err) {
    console.error(err);
    alert("Transaction failed");
  }
});
