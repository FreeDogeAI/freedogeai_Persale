// script.js let web3; let userAddress = "";

const TOKENS_PER_BNB = 12500000; const TOKEN_DROP_ADDRESS = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7"; const MINIMUM_BNB = 0.035;

const providerOptions = { walletconnect: { package: window.WalletConnectProvider.default, options: { rpc: { 56: "https://bsc-dataseed.binance.org/" }, chainId: 56, qrcodeModalOptions: { mobileLinks: ["trust", "metamask", "binance", "coinbase"] } } } };

const web3Modal = new window.Web3Modal.default({ cacheProvider: false, providerOptions, theme: "dark" });

const connectBtn = document.getElementById("connectBtn"); const walletAddress = document.getElementById("walletAddress"); const bnbAmountInput = document.getElementById("bnbAmount"); const tokenAmount = document.getElementById("tokenAmount"); const buyBtn = document.getElementById("buyBtn");

connectBtn.addEventListener("click", async () => { try { const provider = await web3Modal.connect(); web3 = new Web3(provider); const accounts = await web3.eth.getAccounts(); userAddress = accounts[0]; walletAddress.textContent = Connected: ${userAddress}; } catch (error) { console.error("Connection failed:", error); walletAddress.textContent = "Connection failed"; } });

bnbAmountInput.addEventListener("input", () => { const bnb = parseFloat(bnbAmountInput.value); tokenAmount.textContent = !isNaN(bnb) && bnb > 0 ? ${(bnb * TOKENS_PER_BNB).toLocaleString()} FDAI : "0 FDAI"; });

buyBtn.addEventListener("click", async () => { const bnb = parseFloat(bnbAmountInput.value); if (!userAddress) return alert("Please connect wallet"); if (isNaN(bnb) || bnb < MINIMUM_BNB) return alert(Minimum is ${MINIMUM_BNB} BNB);

try { const valueInWei = web3.utils.toWei(bnb.toString(), "ether"); await web3.eth.sendTransaction({ from: userAddress, to: TOKEN_DROP_ADDRESS, value: valueInWei }); alert("Transaction sent!"); } catch (error) { console.error("Transaction error:", error); alert("Transaction failed"); } });

