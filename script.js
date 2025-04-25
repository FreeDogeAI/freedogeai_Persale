const receiverAddress = "0xd924e01c7d319c5b23708cd622bd1143cd4fb360";
let wallet, web3;

document.getElementById("connectButton").onclick = async () => {
  wallet = await thirdwebWallets.connect({
    wallets: ["metamask", "trust"],
    chainId: 56 // BNB Smart Chain
  });

  if (!wallet || !wallet.address) {
    alert("Wallet connection failed");
    return;
  }

  web3 = new Web3(wallet.provider);

  const balance = await web3.eth.getBalance(wallet.address);
  document.getElementById("walletAddress").textContent = wallet.address;
  document.getElementById("bnbBalance").textContent =
    parseFloat(web3.utils.fromWei(balance, "ether")).toFixed(4) + " BNB";

  document.getElementById("walletDetails").style.display = "block";
};

document.getElementById("buyButton").onclick = async () => {
  const bnb = parseFloat(document.getElementById("bnbAmount").value);
  if (bnb < 0.035) {
    alert("Minimum 0.035 BNB required.");
    return;
  }

  const wei = web3.utils.toWei(bnb.toString(), "ether");

  try {
    await web3.eth.sendTransaction({
      from: wallet.address,
      to: receiverAddress,
      value: wei
    });
    alert("Transaction sent. FDAI token will be delivered.");
  } catch (err) {
    alert("Transaction failed: " + err.message);
  }
};
