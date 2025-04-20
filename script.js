import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

let web3;
let provider;

const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          56: "https://bsc-dataseed.binance.org/" // BSC Mainnet
        },
        chainId: 56
      }
    }
  }
});

// Bağlantı Fonksiyonu
async function connectWallet() {
  try {
    provider = await web3Modal.connect();
    web3 = new Web3(provider);

    const accounts = await web3.eth.getAccounts();
    const userAddress = accounts[0];
    document.getElementById("connectBtn").innerText = `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
  } catch (error) {
    console.error("Wallet connection failed:", error);
    alert("Wallet connection failed. Please try again.");
  }
}

// Token Satın Alma Fonksiyonu
async function buyToken() {
  const bnb = parseFloat(document.getElementById("bnbAmount").value);
  const tokenDropAddress = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7";

  if (!bnb || bnb < 0.035) {
    alert("Minimum 0.035 BNB required");
    return;
  }

  try {
    const accounts = await web3.eth.getAccounts();
    const tx = await web3.eth.sendTransaction({
      from: accounts[0],
      to: tokenDropAddress,
      value: web3.utils.toWei(bnb.toString(), "ether")
    });

    alert("Transaction successful! TX Hash: " + tx.transactionHash);
  } catch (error) {
    console.error("Transaction failed:", error);
    alert("Transaction failed: " + error.message);
  }
}

// Hesapla
function calculateFDAI() {
  const bnb = parseFloat(document.getElementById("bnbAmount").value || 0);
  const rate = 12500000; // 1 BNB = 12.5M FDAI
  document.getElementById("fdaiAmount").innerText = (bnb * rate).toLocaleString();
}

// Otomatik bağlantı (önceden bağlanmışsa)
window.addEventListener("load", async () => {
  if (web3Modal.cachedProvider) {
    await connectWallet();
  }
});
