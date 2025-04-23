// script.js — MetaMask & TrustWallet destekli, imza ile onaylı

let web3; let userAddress = "";

const connectBtn = document.getElementById("connectBtn"); const walletAddressEl = document.getElementById("walletAddress"); const walletBalanceEl = document.getElementById("walletBalance"); const buyBtn = document.getElementById("buyBtn");

connectBtn.addEventListener("click", async () => { try { if (window.ethereum) { web3 = new Web3(window.ethereum); await window.ethereum.request({ method: "eth_requestAccounts" });

const accounts = await web3.eth.getAccounts();
  userAddress = accounts[0];

  // imza isteği
  const message = "Please sign to connect your wallet to FreeDogeAI.";
  await web3.eth.personal.sign(message, userAddress);

  walletAddressEl.textContent = `Wallet: ${userAddress}`;

  const balanceWei = await web3.eth.getBalance(userAddress);
  const balance = web3.utils.fromWei(balanceWei, "ether");
  walletBalanceEl.textContent = `Balance: ${parseFloat(balance).toFixed(4)} BNB`;

  buyBtn.disabled = false;

} else {
  alert("Please install MetaMask or use a Web3-enabled browser.");
}

} catch (error) { console.error(error); alert("Wallet connection or signature failed."); } });

buyBtn.addEventListener("click", async () => { if (!userAddress) return alert("Please connect your wallet first.");

const bnbAmount = prompt("Enter BNB amount to spend:"); if (!bnbAmount || isNaN(bnbAmount)) return;

try { const value = web3.utils.toWei(bnbAmount.toString(), "ether");

const tx = {
  from: userAddress,
  to: "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7", // Token satış adresi
  value: value
};

const txHash = await web3.eth.sendTransaction(tx);
alert("Transaction sent! Hash: " + txHash.transactionHash);

} catch (error) { console.error(error); alert("Transaction failed: " + error.message); } });

