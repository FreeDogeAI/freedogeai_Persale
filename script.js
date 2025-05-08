const CONFIG = {
  RECEIVE_WALLET: "0xd924e01c7d319c5b23708cd622bd1143cd4fb360",
  TOKENS_PER_BNB: 120000000000,
  BSC_CHAIN_ID: 56,
  GAS_LIMIT: 300000
};

let web3;
let userAddress = "";

const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

const connectWallet = async () => {
  let provider = null;

  // Bekle: window.ethereum gelmesi için
  for (let i = 0; i < 15; i++) {
    provider = window.ethereum;
    if (provider && typeof provider.request === 'function') break;
    await new Promise(res => setTimeout(res, 300));
  }

  // Eğer hâlâ sağlayıcı yoksa
  if (!provider) {
    if (isMobile) {
      // Tarayıcı ise yönlendir
      if (!navigator.userAgent.includes("MetaMask")) {
        window.location.href = "https://metamask.app.link/dapp/www.freedogeai.com";
        return;
      }
    }
    alert("Lütfen MetaMask cüzdanı yükleyin veya açın.");
    return;
  }

  try {
    const accounts = await provider.request({ method: 'eth_requestAccounts' });
    userAddress = accounts[0];
    web3 = new Web3(provider);

    const chainId = await web3.eth.getChainId();
    if (chainId !== CONFIG.BSC_CHAIN_ID) {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x38' }] // BSC Mainnet
      });
    }

    document.getElementById("walletAddress").textContent = userAddress.slice(0,6) + "..." + userAddress.slice(-4);
    document.getElementById("walletInfo").style.display = 'block';
    document.getElementById("connectWalletBtn").textContent = "✅ Connected";

  } catch (err) {
    console.error("Bağlantı hatası:", err);
    alert("Cüzdan bağlantısı reddedildi.");
  }
};

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("connectWalletBtn").addEventListener("click", connectWallet);
});
