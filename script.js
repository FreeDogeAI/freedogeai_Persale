// script.js import { EthereumClient, w3mConnectors, w3mProvider } from 'https://cdn.jsdelivr.net/npm/@web3modal/ethereum@2.6.3/+esm'; import { Web3Modal } from 'https://cdn.jsdelivr.net/npm/@web3modal/html@2.6.3/+esm'; import { configureChains, createConfig, getAccount, connect, getNetwork } from 'https://cdn.jsdelivr.net/npm/@wagmi/core@1.3.6/+esm'; import { bsc } from 'https://cdn.jsdelivr.net/npm/@wagmi/core@1.3.6/chains/+esm';

const projectId = '3c1933cfa3a872a06dbaa2011dab35a2'; const TOKEN_DROP_ADDRESS = '0x45583DB8b6Db50311Ba8e7303845ACc6958589B7'; const MINIMUM_BNB = 0.035; const TOKENS_PER_BNB = 12500000;

const { chains, publicClient } = configureChains([bsc], [w3mProvider({ projectId })]);

const wagmiConfig = createConfig({ autoConnect: true, connectors: w3mConnectors({ projectId, version: '1', chains }), publicClient });

const ethereumClient = new EthereumClient(wagmiConfig, chains); new Web3Modal({ projectId, themeMode: 'dark', themeVariables: { '--w3m-accent-color': '#fcd200', '--w3m-background-color': '#000000' } }, ethereumClient);

let userAddress = "";

const connectBtn = document.getElementById("connectBtn"); const walletAddress = document.getElementById("walletAddress"); const bnbAmountInput = document.getElementById("bnbAmount"); const tokenAmount = document.getElementById("tokenAmount"); const buyBtn = document.getElementById("buyBtn");

bnbAmountInput.addEventListener("input", () => { const bnb = parseFloat(bnbAmountInput.value); tokenAmount.textContent = (!isNaN(bnb) && bnb > 0) ? ${bnb * TOKENS_PER_BNB} FDAI : "0 FDAI"; });

connectBtn.addEventListener("click", async () => { try { const { connector } = await connect(); const account = getAccount(); userAddress = account.address; walletAddress.textContent = Connected: ${userAddress}; } catch (err) { walletAddress.textContent = 'Connection failed'; } });

buyBtn.addEventListener("click", async () => { const bnb = parseFloat(bnbAmountInput.value); if (!userAddress) return alert("Please connect your wallet first."); if (isNaN(bnb) || bnb < MINIMUM_BNB) return alert(Minimum purchase is ${MINIMUM_BNB} BNB.);

try { const provider = window.ethereum; const tx = await provider.request({ method: "eth_sendTransaction", params: [{ from: userAddress, to: TOKEN_DROP_ADDRESS, value: (bnb * 1e18).toString(16), }] }); alert("Transaction sent! TX Hash: " + tx); } catch (err) { console.error(err); alert("Transaction failed."); } });

