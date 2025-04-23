// Cüzdan adresini göster
    walletAddressSpan.innerText = account;

    // BNB bakiyesi göster
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balanceWei = await provider.getBalance(account);
    const balanceBnb = ethers.utils.formatEther(balanceWei);

    walletBalanceSpan.innerText = balanceBnb;

  } catch (error) {
    console.error("Hata:", error);
    alert("Bağlantı ya da imza reddedildi.");
  }
});
```
