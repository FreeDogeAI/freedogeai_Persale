connectBtn.addEventListener("click", async () => {
  try {
    console.log("1. Web3Modal ile bağlantı başlatılıyor...");
    const provider = await web3Modal.connect();
    console.log("2. Provider alındı:", provider);

    // Ethers.js ile provider oluştur
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    web3 = new Web3(provider); // Mevcut Web3.js kodları için

    console.log("3. Kullanıcı hesapları isteniyor...");
    const accounts = await provider.request({ method: "eth_requestAccounts" });
    userAddress = accounts[0];
    console.log("4. Kullanıcı adresi alındı:", userAddress);

    // İmza işlemi
    const message = "Sign to verify connection with FreeDogeAI";
    console.log("5. İmza işlemi başlatılıyor, mesaj:", message);

    const signer = ethersProvider.getSigner();
    let signature;
    try {
      signature = await signer.signMessage(message);
      console.log("6. İmza başarılı:", signature);
    } catch (err) {
      console.error("İmza hatası:", err);
      throw new Error("Signature failed: " + err.message);
    }

    // Cüzdan adresini ve bakiyeyi göster
    walletAddressEl.textContent = `Wallet: ${userAddress}`;
    const balance = web3.utils.fromWei(await web3.eth.getBalance(userAddress), "ether");
    walletBalanceEl.textContent = `Balance: ${parseFloat(balance).toFixed(4)} BNB`;
    console.log("7. Adres ve bakiye gösterildi.");

    buyBtn.disabled = false;
    console.log("8. Satın alma butonu aktif edildi.");

  } catch (err) {
    console.error("Bağlantı veya imza hatası:", err);
    alert("Wallet connection failed: " + err.message);
  }
});
