let web3Modal, provider, web3, userAddress;

const providerOptions = {
  walletconnect: {
    package: window.WalletConnectProvider.default,
    options: {
      rpc: {
        56: "https://bsc-dataseed.binance.org/" // BNB Smart Chain
      },
      chainId: 56
    }
  }
};

window.addEventListener('load', () => {
  web3Modal = new window.Web3Modal.default({
    cacheProvider: false,
    providerOptions,
    theme: "dark"
  });
});

document.getElementById("connectBtn").addEventListener("click", async () => {
  try {
    provider = await web3Modal.connect();
    web3 = new Web3(provider);

    const accounts = await web3.eth.getAccounts();
    userAddress = accounts[0];

    const balanceWei = await web3.eth.getBalance(userAddress);
    const balance = web3.utils.fromWei(balanceWei, "ether");

    document.getElementById("walletAddress").textContent = userAddress;
    document.getElementById("walletBalance").textContent = parseFloat(balance).toFixed(4);
    document.getElementById("walletBox").classList.remove("hidden");
  } catch (e) {
    alert("Connection failed: " + e.message);
  }
});
