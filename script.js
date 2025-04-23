// script.js let web3; let userAddress = ""; const TOKEN_DROP_ADDRESS = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7"; const MINIMUM_BNB = 0.035; const TOKENS_PER_BNB = 12500000;

async function connect(providerType) { try { let provider; if (providerType === 'metamask') { if (typeof window.ethereum !== 'undefined') { provider = window.ethereum; await provider.request({ method: "eth_requestAccounts" }); web3 = new Web3(provider); } else { return alert("MetaMask not found"); } } else if (providerType === 'trustwallet') { provider = new WalletConnectProvider.default({ rpc: { 56: "https://bsc-dataseed.binance.org/" }, chainId: 56, qrcode: true, qrcodeModalOptions: { mobileLinks: ["trust"], }, }); await provider.enable(); web3 = new Web3(provider); }

const accounts = await web3.eth.getAccounts();
userAddress = accounts[0];
document.getElementById("walletAddress").textContent = `Connected: ${userAddress}`;

const balanceWei = await web3.eth.getBalance(userAddress);
const balance = web3.utils.fromWei(balanceWei, "ether");
document.getElementById("walletBalance").textContent = `BNB Balance: ${parseFloat(balance).toFixed(4)} BNB`;

} catch (err) { console.error("Connection error:", err); alert("Connection failed"); } }

document.getElementById("connectMetaMask").addEventListener("click", () => connect('metamask')); document.getElementById("connectTrustWallet").addEventListener("click", () => connect('trustwallet'));

document.getElementById("bnbAmount").addEventListener("input", () => { const bnb = parseFloat(document.getElementById("bnbAmount").value); document.getElementById("tokenAmount").textContent = !isNaN(bnb) && bnb > 0 ? ${(bnb * TOKENS_PER_BNB).toLocaleString()} FDAI : "0 FDAI"; });

document.getElementById("buyBtn").addEventListener("click", async () => { try { if (!userAddress) return alert("Connect wallet first");

const bnb = parseFloat(document.getElementById("bnbAmount").value);
if (isNaN(bnb) || bnb < MINIMUM_BNB) return alert(`Minimum is ${MINIMUM_BNB} BNB`);

const tx = {
  from: userAddress,
  to: TOKEN_DROP_ADDRESS,
  value: web3.utils.toHex(web3.utils.toWei(bnb.toString(), "ether")),
  gas: web3.utils.toHex(210000),
};

const txHash = await web3.eth.sendTransaction(tx);
alert("Transaction sent! Hash: " + txHash.transactionHash);

} catch (err) { console.error(err); alert("Transaction failed: " + err.message); } });

