import {
  EthereumClient,
  w3mConnectors,
  w3mProvider
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/html';
import { configureChains, createConfig, getAccount, connect, disconnect, fetchBalance, watchAccount } from '@wagmi/core';
import { mainnet } from '@wagmi/core/chains';

// WalletConnect bilgileri
const projectId = '3c1933cfa3a872a06dbaa2011dab35a2';

const chains = [mainnet];
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);
const modal = new Web3Modal({ projectId, ethereumClient });

// Bağlantı butonu
document.getElementById('connectWalletBtn').addEventListener('click', async () => {
  try {
    await modal.openModal(); // popup ikonlu menüyü aç
  } catch (err) {
    alert('Connection error: ' + err.message);
  }
});

// Cüzdan izleme (otomatik güncelleme)
watchAccount({
  onChange(account) {
    if (account?.address) {
      document.getElementById('walletAddress').textContent = account.address;
      document.getElementById('walletInfo').classList.remove('hidden');
      updateBalance(account.address);
    } else {
      document.getElementById('walletInfo').classList.add('hidden');
    }
  }
});

// Bakiye göster
async function updateBalance(address) {
  const balance = await fetchBalance({ address });
  const bnb = parseFloat(balance.formatted).toFixed(4);
  document.getElementById('walletBalance').textContent = bnb;
}

// Token hesaplama
document.getElementById('bnbInput').addEventListener('input', () => {
  const bnb = parseFloat(document.getElementById('bnbInput').value);
  const rate = 12500000;
  const tokens = bnb >= 0.035 ? (bnb * rate).toLocaleString() : '0';
  document.getElementById('tokenAmount').textContent = tokens;
});

// Satın alma
document.getElementById('buyBtn').addEventListener('click', async () => {
  const bnb = parseFloat(document.getElementById('bnbInput').value);
  if (!bnb || bnb < 0.035) return alert('Minimum purchase is 0.035 BNB');

  const { address } = getAccount();
  const to = '0x45583DB8b6Db50311Ba8e7303845ACc6958589B7';

  try {
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [{
        from: address,
        to,
        value: '0x' + (bnb * 1e18).toString(16)
      }]
    });
    alert('Purchase successful!');
  } catch (err) {
    alert('Transaction failed: ' + err.message);
  }
});

// Dil sistemi
const translations = {
  en: {
    title: "Buy FreeDogeAI Token (FDAI)",
    bnbLabel: "Enter BNB amount:",
    footerText: "Join our community for updates",
    buyBtn: "Buy FDAI"
  },
  tr: {
    title: "FreeDogeAI Token (FDAI) Satın Al",
    bnbLabel: "BNB miktarını girin:",
    footerText: "Güncellemeler için topluluğumuza katılın",
    buyBtn: "FDAI Satın Al"
  },
  ar: {
    title: "شراء رمز FreeDogeAI (FDAI)",
    bnbLabel: "أدخل كمية BNB:",
    footerText: "انضم إلى مجتمعنا للتحديثات",
    buyBtn: "شراء FDAI"
  },
  ru: {
    title: "Купить FreeDogeAI Token (FDAI)",
    bnbLabel: "Введите сумму BNB:",
    footerText: "Присоединяйтесь к нашему сообществу для обновлений",
    buyBtn: "Купить FDAI"
  },
  zh: {
    title: "购买 FreeDogeAI 代币 (FDAI)",
    bnbLabel: "输入 BNB 数量:",
    footerText: "加入我们的社区以获取更新",
    buyBtn: "购买 FDAI"
  }
};

document.getElementById("languageSelector").addEventListener("change", (e) => {
  const lang = e.target.value;
  document.getElementById("title").textContent = translations[lang].title;
  document.getElementById("bnbLabel").textContent = translations[lang].bnbLabel;
  document.getElementById("footerText").textContent = translations[lang].footerText;
  document.getElementById("buyBtn").textContent = translations[lang].buyBtn;
});
