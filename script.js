// script.js

// Cüzdan bağlantısı (Metamask + WalletConnect) async function connectWallet() { if (window.ethereum) { try { const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }); const walletAddress = accounts[0]; document.getElementById('wallet-address').innerText = walletAddress; } catch (error) { console.error('Bağlantı hatası:', error); } } else { alert('Lütfen MetaMask veya desteklenen bir cüzdan yükleyin.'); } }

// Token hesaplama function calculateTokens() { const bnbAmount = parseFloat(document.getElementById('bnb-amount').value); const tokensPerBNB = 12500000; // 1 BNB = 12.5M FDAI const result = bnbAmount * tokensPerBNB; document.getElementById('token-amount').innerText = isNaN(result) ? '0' : result.toLocaleString(); }

// Satın alma (dummy buton) document.getElementById('buy-button').addEventListener('click', async () => { alert('Satın alma butonuna basıldı. Bu demo versiyonudur. Smart Contract entegrasyonu eklenmelidir.'); });

// Dil değişimi function changeLanguage(lang) { const elements = document.querySelectorAll('[data-i18n]'); elements.forEach(el => { const key = el.getAttribute('data-i18n'); el.innerText = translations[lang][key] || key; }); }

// Sayfa yüklenince window.onload = () => { document.getElementById('bnb-amount').addEventListener('input', calculateTokens); document.getElementById('connect-wallet').addEventListener('click', connectWallet); }

