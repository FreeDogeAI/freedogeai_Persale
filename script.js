const CONTRACT_ADDRESS = "0xd924e01c7d319c5b23708cd622bd1143cd4fb360"; // Ali'nin cüzdanı
const TOKEN_CONTRACT = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7"; // FDAI Drop kontratı
const TOKEN_PRICE = 12500000;
const MIN_BNB = 0.035;
const CHAIN_ID = 56;

let provider, signer, userAddress;

document.getElementById("connectWallet").onclick = () => {
  document.getElementById("walletModal").style.display = "block";
};

document.getElementsByClassName("close")[0].onclick = () => {
  document.getElementById("walletModal").style.display = "none";
};

document.getElementById("connectMetaMask").onclick = async () => {
  if (typeof window.ethereum === "undefined") {
    alert("Please install MetaMask");
    return;
  }
  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();
  userAddress = await signer.getAddress();
  updateUI();
};

document.getElementById("connectTrustWallet").onclick = () => {
  const url = encodeURIComponent 
    const site = encodeURIComponent(window.location.href);
window.location.href = `https://link.trustwallet.com/open_url?coin_id=60&url=${site}`;

document.getElementById("bnbAmount").oninput = () => {
  const bnb = parseFloat(document.getElementById("bnbAmount").value);
  const tokens = isNaN(bnb) ? 0 : bnb * TOKEN_PRICE;
  document.getElementById("fdaiAmount").innerText = `YOU WILL RECEIVE: ${tokens.toLocaleString()} FDAI`;
  document.getElementById("buyButton").disabled = bnb < MIN_BNB;
};

document.getElementById("buyButton").onclick = async () => {
  const bnbVal = parseFloat(document.getElementById("bnbAmount").value);
  const contract = new ethers.Contract(TOKEN_CONTRACT, ["function buyTokens() public payable"], signer);
  const tx = await contract.buyTokens({ value: ethers.utils.parseEther(bnbVal.toString()) });
  await tx.wait();
  alert("Token purchase successful!");
};

async function updateUI() {
  document.getElementById("walletModal").style.display = "none";
  document.getElementById("walletAddress").innerText = `Connected: ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
  const balance = await provider.getBalance(userAddress);
  const bnb = ethers.utils.formatEther(balance);
  document.getElementById("bnbBalance").innerText = `BNB BALANCE: ${parseFloat(bnb).toFixed(4)}`;
}
