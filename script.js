// betik.js (script dosyası)

const tokenDropAddress = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7"; const rate = 12500000; // 1 BNB = 12.5M FDAI

function calculateFDAI() { const bnb = parseFloat(document.getElementById("bnbAmount").value || 0); if (isNaN(bnb)) { document.getElementById("fdaiAmount").innerText = "0"; } else { document.getElementById("fdaiAmount").innerText = (bnb * rate).toLocaleString(); } }

async function connectWallet() { if (typeof window.ethereum !== "undefined") { try { const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }); if (accounts.length > 0) { alert("Wallet connected successfully!"); } } catch (e) { alert("Connection failed: " + e.message); } } else { // Otomatik yönlendirme (mobil için MetaMask varsayılanı) const userAgent = navigator.userAgent || navigator.vendor; if (/android/i.test(userAgent)) { window.location.href = "https://metamask.app.link/dapp/" + window.location.href; } else if (/iPad|iPhone|iPod/.test(userAgent)) { window.location.href = "https://metamask.app.link/dapp/" + window.location.href; } else { alert("Please install MetaMask or another compatible wallet."); } } }

async function buyToken() { if (!window.ethereum) { alert("Wallet not connected! Please connect your wallet first."); return; }

const bnb = parseFloat(document.getElementById("bnbAmount").value); if (isNaN(bnb) || bnb < 0.035) { alert("Please enter a valid amount. Minimum 0.035 BNB required."); return; }

try { const provider = new ethers.providers.Web3Provider(window.ethereum); const signer = provider.getSigner(); const tx = await signer.sendTransaction({ to: tokenDropAddress, value: ethers.utils.parseEther(bnb.toString()) }); alert("Transaction sent successfully! TX Hash: " + tx.hash); } catch (e) { alert("Transaction failed: " + e.message); } }

                                
