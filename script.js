<script>
  let web3;
  let userAddress = "";

  const providerOptions = {
    walletconnect: {
      package: window.WalletConnectProvider.default,
      options: {
        rpc: { 56: "https://bsc-dataseed.binance.org/" },
        chainId: 56,
        qrcodeModalOptions: {
          mobileLinks: ["metamask", "trust"]
        }
      }
    }
  };

  const web3Modal = new window.Web3Modal.default({
    cacheProvider: false,
    providerOptions,
    theme: "dark"
  });

  document.getElementById("connectBtn").addEventListener("click", async () => {
    try {
      const provider = await web3Modal.connect();
      web3 = new Web3(provider);
      const accounts = await provider.request({ method: "eth_requestAccounts" });
      userAddress = accounts[0];

      // İMZA İSTEK
      const message = "Sign this message to connect with FreeDogeAI.";
      const hexMsg = web3.utils.utf8ToHex(message);
      const signature = await provider.request({
        method: "personal_sign",
        params: [hexMsg, userAddress]
      });

      if (!signature) throw new Error("Signature denied");

      // BAĞLANTI BİLGİLERİ
      document.getElementById("walletAddress").textContent = `Connected: ${userAddress}`;
      const balanceWei = await web3.eth.getBalance(userAddress);
      const balance = web3.utils.fromWei(balanceWei, "ether");
      document.getElementById("walletBalance").textContent = `BNB Balance: ${parseFloat(balance).toFixed(4)} BNB`;

      document.getElementById("buyBtn").disabled = false;

    } catch (err) {
      console.error("Connection failed:", err);
      alert("Wallet connection failed: " + err.message);
    }
  });

  // SATIN ALMA BUTONU
  document.getElementById("buyBtn").addEventListener("click", async () => {
    try {
      const bnb = prompt("Enter amount of BNB to spend:");
      if (!bnb || isNaN(bnb)) return;

      const value = web3.utils.toWei(bnb.toString(), "ether");
      const tx = {
        from: userAddress,
        to: "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7", // Satış kontrat adresi
        value: value
      };

      const txHash = await web3.eth.sendTransaction(tx);
      alert("Transaction sent! Hash: " + txHash.transactionHash);

    } catch (err) {
      console.error("Transaction failed:", err);
      alert("Transaction error: " + err.message);
    }
  });
</script>
