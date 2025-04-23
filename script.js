
```javascript
const connectWalletBtn = document.getElementById("connectWalletBtn");
const walletAddressSpan = document.getElementById("walletAddress");
const walletBalanceSpan = document.getElementById("walletBalance");

connectWalletBtn.addEventListener("click", async () => {
  if (typeof window.ethereum === "undefined") {
    alert("Metamask yüklü değil knk!");
    return;
  }

  try {
    // BSC'ye bağlanmak için ağ değiştirme (Eğer BSC ağında değilsen)
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: '0x38', // Binance Smart Chain Mainnet (0x38 == 56 decimal)
        chainName: 'Binance Smart Chain',
        nativeCurrency: {
          name: 'BNB',
          symbol: 'BNB',
          decimals: 18
        },
        rpcUrls: ['https://bsc-dataseed.binance.org/'],
        blockExplorerUrls: ['https://bscscan.com']
      }]
    });

    // Cüzdan bağlama
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0];

    // İmza alma
    const message = "FDAI sitesine giriş yapmak için imza veriyorsunuz.";
    await ethereum.request({
      method: "personal_sign",
      params: [message, account]
    });
