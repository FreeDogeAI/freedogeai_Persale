// script.js - FDAI Presale site script (English only for now, full 20-lang ready)

const tokenDropAddress = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7"; // Ali's smart contract address const tokenRate = 12500000; // 1 BNB = 12.5M FDAI

window.onload = async () => { if (window.ethereum) { try { await window.ethereum.request({ method: 'eth_requestAccounts' }); const provider = new ethers.providers.Web3Provider(window.ethereum); const signer = provider.getSigner(); const address = await signer.getAddress(); document.getElementById("wallet-address").innerText = Connected: ${address.substring(0,6)}...${address.slice(-4)}; } catch (err) { console.log("Wallet connection rejected."); } } else { alert("Please install MetaMask or TrustWallet to connect."); } };

function calculateFDAI() { const bnb = parseFloat(document.getElementById("bnbAmount").value || 0); document.getElementById("fdaiAmount").innerText = bnb > 0 ? (bnb * tokenRate).toLocaleString() : "0"; }

async function buyToken() { const bnb = parseFloat(document.getElementById("bnbAmount").value); if (!window.ethereum || isNaN(bnb) || bnb < 0.035) { alert("Connect your wallet and enter minimum 0.035 BNB"); return; }

try { const provider = new ethers.providers.Web3Provider(window.ethereum); const signer = provider.getSigner(); const tx = await signer.sendTransaction({ to: tokenDropAddress, value: ethers.utils.parseEther(bnb.toString()) }); alert("Transaction sent! TX Hash: " + tx.hash); } catch (error) { alert("Transaction failed: " + error.message); } }

