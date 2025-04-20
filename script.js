let web3;
let provider;

document.addEventListener("DOMContentLoaded", () => {
  const connectBtn = document.getElementById("connectBtn");
  const walletAddress = document.getElementById("walletAddress");

  connectBtn.addEventListener("click", async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        walletAddress.textContent = `Connected: ${accounts[0]}`;
      } catch (error) {
        walletAddress.textContent = "Connection failed.";
      }
    } else {
      provider = new WalletConnectProvider.default({
        rpc: {
          56: "https://bsc-dataseed.binance.org/"
        },
        chainId: 56
      });

      try {
        await provider.enable();
        web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        walletAddress.textContent = `Connected: ${accounts[0]}`;
      } catch (err) {
        walletAddress.textContent = "WalletConnect failed.";
      }
    }
  });
});
