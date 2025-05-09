// Configuration
const CONFIG = {
  RECEIVE_WALLET: "0xd924e01c7d319c5b23708cd622bd1143cd4fb360",
  TOKENS_PER_BNB: 120000000000,
  BSC_CHAIN_ID: 56
};

// App state
let web3;
let userAddress = "";
const translations = {
  

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  // Setup event listeners
  document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
  document.getElementById('buyBtn').addEventListener('click', sendBNB);
  document.getElementById('bnbAmount').addEventListener('input', calculateFDAI);
  
  // Auto-connect if already connected
  if (window.ethereum?.selectedAddress) {
    connectWallet();
  }
});
// Language switcher
document.getElementById("languageSwitcher").addEventListener("change", function () {
  const selectedLang = this.value;
  const t = translations[selectedLang];
  if (!t) return;

  // Başlıklar
  document.querySelector("h1").innerText = t.headline;
  document.querySelector(".highlight-message").innerText = t.subtitle;

  // Cüzdan butonu ve bilgileri
  document.getElementById("connectWalletBtn").innerText = t.connect;
  document.querySelector("h3").innerText = t.walletTitle;
  document.querySelector("label[for='bnbAmount']").innerHTML = "<strong>" + t.bnbAmount + "</strong>";
  document.getElementById("calculationResult").innerHTML = "<strong>" + t.receive + "</strong> <span id='fdaiAmount'>0</span> FDAI";
  document.getElementById("buyBtn").innerText = t.buy;

  // Bilgilendirme kutusu
  const infoBox = document.querySelector(".info-box");
  infoBox.querySelector("h3").innerText = t.info;
  const ps = infoBox.querySelectorAll("p");
  ps[0].innerText = t.note1;
  ps[1].innerText = t.note2;
  ps[2].innerText = t.note3;
  ps[3].innerHTML = "<strong>NOTE:</strong> " + t.note4;

  // Hakkında ve Topluluk
  document.querySelector("h3:nth-of-type(2)").innerText = t.about;
  document.querySelector(".wallet-info").nextSibling.textContent = t.aboutText;
  document.querySelector("a[href$='Whitepaper.pdf']").innerText = t.download;
  document.querySelector("h3:nth-of-type(3)").innerText = t.community;
  const links = document.querySelectorAll("ul li a");
  links[0].innerText = t.telegram + ": @freedogeaiFDAI";
  links[1].innerText = t.twitter + ": @FreeDogeAI_FDAI";
});

// Wallet connection handler
async function connectWallet() {
  try {
    // Check if MetaMask is installed
    if (!window.ethereum) {
      // Mobile redirect
      if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        const currentUrl = window.location.href.replace(/^https?:\/\//, '');
        window.location.href = `https://metamask.app.link/dapp/${currentUrl}`;
      } else {
        // Desktop - open MetaMask download page
        window.open("https://metamask.io/download.html", "_blank");
      }
      return;
    }
    
    // Request accounts
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    userAddress = accounts[0];
    web3 = new Web3(window.ethereum);
    
    // Switch to BSC network
    try {
      const chainId = await web3.eth.getChainId();
      if (chainId !== CONFIG.BSC_CHAIN_ID) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x38' }] // BSC Mainnet
        });
      }
    } catch (error) {
      console.log("Network switch failed:", error);
    }
    
    updateWalletUI();
  } catch (error) {
    console.log("Connection error:", error);
  }
}

// Update UI after connection
function updateWalletUI() {
  // Format address display
  const shortAddress = `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
  document.getElementById('walletAddress').textContent = shortAddress;
  document.getElementById('userTokenAddress').textContent = shortAddress;
  
  // Show wallet info and enable buy button
  document.getElementById('walletInfo').style.display = 'block';
  document.getElementById('connectWalletBtn').textContent = '✅ Connected';
  document.getElementById('buyBtn').disabled = false;
  
  // Get and display balance
  web3.eth.getBalance(userAddress).then(balance => {
    const bnbBalance = web3.utils.fromWei(balance, 'ether');
    document.getElementById('bnbBalance').textContent = `${parseFloat(bnbBalance).toFixed(6)} BNB`;
  });
}

// Calculate FDAI tokens
function calculateFDAI() {
  const amount = parseFloat(document.getElementById('bnbAmount').value) || 0;
  document.getElementById('fdaiAmount').textContent = (amount * CONFIG.TOKENS_PER_BNB).toLocaleString();
}

// Send BNB transaction
async function sendBNB() {
  const bnbAmount = parseFloat(document.getElementById('bnbAmount').value);
  
  if (!bnbAmount || bnbAmount <= 0) {
    alert("Lütfen geçerli bir miktar girin!");
    return;
  }
  
  try {
    const weiAmount = web3.utils.toWei(bnbAmount.toString(), 'ether');
    
    const tx = {
      from: userAddress,
      to: CONFIG.RECEIVE_WALLET,
      value: weiAmount,
      gas: 300000,
      gasPrice: await web3.eth.getGasPrice()
    };
    
    const receipt = await web3.eth.sendTransaction(tx);
    alert(`✅ ${bnbAmount} BNB başarıyla gönderildi!\n\nAlacak: ${(bnbAmount * CONFIG.TOKENS_PER_BNB).toLocaleString()} FDAI\nTX Hash: ${receipt.transactionHash}`);
    
  } catch (error) {
    console.error("Transaction failed:", error);
    alert("İşlem başarısız: " + (error.message || error));
  }
}

// Handle account changes
if (window.ethereum) {
  window.ethereum.on('accountsChanged', (accounts) => {
    if (accounts.length > 0) {
      userAddress = accounts[0];
      updateWalletUI();
    } else {
      // Disconnect
      document.getElementById('walletInfo').style.display = 'none';
      document.getElementById('connectWalletBtn').textContent = '🔗 Connect Wallet';
      document.getElementById('buyBtn').disabled = true;
    }
  });
  
  window.ethereum.on('chainChanged', () => window.location.reload());
}
