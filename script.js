import {
  EthereumClient,
  w3mConnectors,
  w3mProvider
} from '@web3modal/ethereum';
import {
  Web3Modal
} from '@web3modal/html';
import {
  configureChains,
  createConfig,
  WagmiConfig
} from 'wagmi';
import {
  bsc
} from 'wagmi/chains';

const projectId = '3c1933cfa3a872a06dbaa2011dab35a2';

// Ağ ayarı (BSC)
const chains = [bsc];
const {
  publicClient
} = configureChains(chains, [w3mProvider({
  projectId
})]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({
    projectId,
    chains
  }),
  publicClient
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

// Web3Modal başlat
const web3modal = new Web3Modal({
  projectId,
  themeMode: 'light',
  themeVariables: {
    '--w3m-accent': '#25D366'
  },
  walletImages: {
    metamask: 'https://walletconnect.com/_next/static/media/metamask.47f43aa7.svg',
    trust: 'https://walletconnect.com/_next/static/media/trustwallet.c20c2d56.svg'
  }
}, ethereumClient);

// Token sabitleri
const RECEIVE_WALLET = "0xd924e01c7d319c5b23708cd622bd1143cd4fb360";
const TOKENS_PER_BNB = 120000000000;

let web3;
let userAddress = "";

// Cüzdan bağla
document.getElementById("connectWalletBtn").addEventListener("click", async () => {
  try {
    const provider = await web3modal.openModal();
    web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    userAddress = accounts[0];

    const balance = await web3.eth.getBalance(userAddress);
    const bnbBalance = web3.utils.fromWei(balance, 'ether');

    document.getElementById("walletAddress").innerText = userAddress;
    document.getElementById("userTokenAddress").innerText = userAddress;
    document.getElementById("bnbBalance").innerText = `${parseFloat(bnbBalance).toFixed(4)} BNB`;

    document.getElementById("walletInfo").style.display = "block";
    document.getElementById("connectWalletBtn").innerText = "✅ Connected";
    document.getElementById("buyBtn").disabled = false;

  } catch (err) {
    alert("Cüzdan bağlantısı başarısız: " + err.message);
  }
});

// BNB -> FDAI hesapla
document.getElementById("bnbAmount").addEventListener("input", () => {
  const bnb = parseFloat(document.getElementById("bnbAmount").value);
  if (bnb > 0) {
    const tokenAmount = bnb * TOKENS_PER_BNB;
    document.getElementById("fdaiAmount").innerText = tokenAmount.toLocaleString();
    document.getElementById("calculationResult").style.display = "block";
    document.getElementById("buyBtn").disabled = false;
  } else {
    document.getElementById("calculationResult").style.display = "none";
    document.getElementById("buyBtn").disabled = true;
  }
});

// Token satın alma (BNB gönder)
document.getElementById("buyBtn").addEventListener("click", async () => {
  const bnbAmount = parseFloat(document.getElementById("bnbAmount").value);

  if (!bnbAmount || bnbAmount <= 0) {
    alert("Geçerli BNB miktarı girin!");
    return;
  }

  try {
    const weiAmount = web3.utils.toWei(bnbAmount.toString(), 'ether');
    const tokenAmount = bnbAmount * TOKENS_PER_BNB;

    const tx = {
      from: userAddress,
      to: RECEIVE_WALLET,
      value: weiAmount,
      gas: 300000,
      gasPrice: await web3.eth.getGasPrice()
    };

    const receipt = await web3.eth.sendTransaction(tx);

    alert(`✅ ${bnbAmount} BNB gönderildi!
FDAI Alıcı: ${userAddress}
Gönderilen BNB: ${RECEIVE_WALLET}
TX Hash: ${receipt.transactionHash}
Tokenler 24 saat içinde gönderilecektir.`);

  } catch (error) {
    alert("İşlem başarısız: " + (error.message || error));
  }
});
