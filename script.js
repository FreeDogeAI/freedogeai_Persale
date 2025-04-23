let web3;
let userAddress = "";

const connectBtn = document.getElementById("connectBtn");
const walletAddressEl = document.getElementById("walletAddress");
const walletBalanceEl = document.getElementById("walletBalance");
const buyBtn = document.getElementById("buyBtn");

connectBtn.addEventListener("click", async () => {
  try {
    if (!window.ethereum) return alert("MetaMask not found");

    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const accounts = await web3.eth.getAccounts();
    userAddress = accounts[0];

    const message = "Welcome to FreeDogeAI. Please sign to continue.";
    const hexMsg = web3.utils.utf8ToHex(message);

    const signature = await window.ethereum.request({
      method: "personal_sign",
      params: [hexMsg, userAddress]
    });

    if (!signature) throw new Error("Signature failed");

    walletAddressEl.textContent = `Wallet: ${userAddress}`;
    const balanceWei = await web3.eth.getBalance(userAddress);
    const balance = web3.utils.fromWei(balanceWei, "ether");
    walletBalanceEl.textContent = `Balance: ${parseFloat(balance).toFixed(4)} BNB`;

    buyBtn.disabled = false;

  } catch (err) {
    console.error(err);
    alert("Error: " + err.message);
  }
});

buyBtn.addEventListener("click", async () => {
  if (!userAddress) return alert("Connect wallet first");

  const bnb = prompt("Enter BNB amount:");
  if (!bnb || isNaN(bnb)) return;

  try {
    const value = web3.utils.toWei(bnb.toString(), "ether");

    const tx = {
      from: userAddress,
      to: "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7",
      value: value
    };

    const hash = await web3.eth.sendTransaction(tx);
    alert("Transaction sent! Hash: " + hash.transactionHash);

  } catch (err) {
    console.error(err);
    alert("Transaction failed: " + err.message);
  }
});
