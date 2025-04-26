// Check if Ethers.js is loaded
if (typeof ethers === "undefined") {
  console.error("Ethers.js library failed to load!");
  alert("Ethers.js library failed to load. Please check your internet connection.");
} else {
  console.log("Ethers.js loaded successfully:", ethers.version);
}

// Language translations
const translations = {
  en: {
    connectWallet: "Connect Wallet",
    modalTitle: "Connect Your Wallet",
    presaleTitle: "Free Doge AI (FDAI) Presale",
    walletAddress: "Wallet: Not Connected",
    bnbBalance: "BNB Balance: --",
    bnbAmountPlaceholder: "Enter BNB amount",
    fdaiAmount: "YOU WILL RECEIVE: 0 FDAI",
    buyButton: "Buy Tokens",
    insufficientFunds: "⚠ Insufficient funds",
    dropButton: "CLAIM FREE DROP",
    whitepaperLink: "Download Whitepaper"
  },
  zh: {
    connectWallet: "连接钱包",
    modalTitle: "连接您的钱包",
    presaleTitle: "Free Doge AI (FDAI) 预售",
    walletAddress: "钱包: 未连接",
    bnbBalance: "BNB 余额: --",
    bnbAmountPlaceholder: "输入 BNB 数量",
    fdaiAmount: "您将收到: 0 FDAI",
    buyButton: "购买代币",
    insufficientFunds: "⚠ 余额不足",
    dropButton: "领取免费空投",
    whitepaperLink: "下载白皮书"
  },
  ru: {
    connectWallet: "Подключить кошелек",
    modalTitle: "Подключите ваш кошелек",
    presaleTitle: "Предпродажа Free Doge AI (FDAI)",
    walletAddress: "Кошелек: Не подключен",
    bnbBalance: "Баланс BNB: --",
    bnbAmountPlaceholder: "Введите сумму BNB",
    fdaiAmount: "ВЫ ПОЛУЧИТЕ: 0 FDAI",
    buyButton: "Купить токены",
    insufficientFunds: "⚠ Недостаточно средств",
    dropButton: "ЗАБРАТЬ БЕСПЛАТНЫЙ ДРОП",
    whitepaperLink: "Скачать Whitepaper"
  }
};

// Function to update language
function updateLanguage() {
  const lang = document.getElementById("languageSelect").value;
  document.getElementById("connectWallet").textContent = translations[lang].connectWallet;
  document.getElementById("modalTitle").textContent = translations[lang].modalTitle;
  document.getElementById("presaleTitle").textContent = translations[lang].presaleTitle;
  document.getElementById("walletAddress").textContent = translations[lang].walletAddress;
  document.getElementById("bnbBalance").textContent = translations[lang].bnbBalance;
  document.getElementById("bnbAmount").placeholder = translations[lang].bnbAmountPlaceholder;
  document.getElementById("fdaiAmount").textContent = translations[lang].fdaiAmount;
  document.getElementById("buyButton").textContent = translations[lang].buyButton;
  document.getElementById("insufficientFunds").textContent = translations[lang].insufficientFunds;
  document.getElementById("dropButton").textContent = translations[lang].dropButton;
  document.getElementById("whitepaperLink").textContent = translations[lang].whitepaperLink;
}

// Function to update wallet info
async function updateWalletInfo() {
  try {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0]; // Get the first connected account
      const balanceWei = await provider.getBalance(address);
      const balance = ethers.utils.formatEther(balanceWei);

      const lang = document.getElementById("languageSelect").value;
      document.getElementById("walletAddress").textContent = `${translations[lang].walletAddress.split(":")[0]}: ${address.slice(0, 6)}...${address.slice(-4)}`;
      document.getElementById("bnbBalance").textContent = `${translations[lang].bnbBalance.split(":")[0]}: ${parseFloat(balance).toFixed(4)}`;

      // Check BNB amount and enable/disable Buy button
      const bnbInput = document.getElementById("bnbAmount");
      const bnbValue = parseFloat(bnbInput.value) || 0;
      document.getElementById("buyButton").disabled = bnbValue < 0.035 || bnbValue > parseFloat(balance);
      document.getElementById("insufficientFunds").style.display = bnbValue > parseFloat(balance) ? "block" : "none";
    } else {
      console.log("No Ethereum provider detected.");
    }
  } catch (error) {
    console.error("Error updating wallet info:", error);
  }
}

// Function to open modal
function openModal() {
  document.getElementById("walletModal").style.display = "block";
}

// Function to close modal
function closeModal() {
  document.getElementById("walletModal").style.display = "none";
}

// Function to connect wallet (mobile-first)
async function connectWallet(walletType) {
  try {
    // Detect if the device is mobile
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      let deepLink;

      if (walletType === "metamask") {
        // Use MetaMask's universal deep link for better device compatibility
        deepLink = `https://metamask.app.link/dapp/${window.location.host}${window.location.pathname}`;
      } else {
        // Use TrustWallet's universal deep link
        deepLink = `https://link.trustwallet.com/open_url?coin_id=60&url=${window.location.href}`;
      }

      // Open the app
      console.log(`Triggering deep link: ${deepLink}`);
      window.location.href = deepLink;

      // Wait for MetaMask/TrustWallet to inject window.ethereum
      let attempts = 0;
      const maxAttempts = 20; // 20 seconds
      const checkConnection = setInterval(async () => {
        attempts++;
        if (window.ethereum) {
          clearInterval(checkConnection);
          console.log(`${walletType} wallet detected on mobile.`);

          try {
            // Ensure the provider is properly initialized
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log("Provider initialized:", provider);

            // Request account access (this should trigger the "Connect" prompt)
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            console.log("Accounts received:", accounts);

            if (accounts.length > 0) {
              console.log(`${walletType} wallet connected on mobile.`);
              await updateWalletInfo();
            } else {
              console.log("No accounts returned by wallet.");
              alert("No accounts found. Please ensure your wallet is unlocked and try again.");
            }
          } catch (error) {
            console.error(`Error connecting to ${walletType}:`, error);
            alert(`Failed to connect to ${walletType}: ${error.message}`);
          }
        } else if (attempts >= maxAttempts) {
          clearInterval(checkConnection);
          console.log(`${walletType} connection failed on mobile after ${maxAttempts} seconds.`);
          alert(`Failed to connect to ${walletType}. Please ensure the app is installed and try again.`);
        }
      }, 1000); // Check every second
    } else {
      // Desktop connection
      if (!window.ethereum) {
        console.log(`${walletType} not detected on desktop.`);
        alert(`${walletType} is not detected. Please install ${walletType} or open this page in the ${walletType} browser.`);
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      console.log(`${walletType} wallet connected on desktop.`);
      await updateWalletInfo();
    }
  } catch (error) {
    console.error(`Error connecting to ${walletType}:`, error);
    alert(`Failed to connect to ${walletType}: ${error.message}`);
  }
}

// Function to set up calculator
function setupCalculator() {
  const bnbInput = document.getElementById("bnbAmount");

  bnbInput.addEventListener("input", function() {
    const bnbValue = parseFloat(this.value) || 0;
    const tokens = bnbValue * 12500000; // 1 BNB = 12.5M FDAI

    const lang = document.getElementById("languageSelect").value;
    const baseText = translations[lang].fdaiAmount.split("0 FDAI")[0];
    document.getElementById("fdaiAmount").textContent = `${baseText}${tokens.toLocaleString()} FDAI`;

    document.getElementById("buyButton").disabled = bnbValue < 0.035;
    if (window.ethereum) {
      updateWalletInfo(); // Check BNB balance
    }
  });
}

// Event Listeners
document.getElementById("connectWallet").addEventListener("click", openModal);
document.getElementById("connectMetaMask").addEventListener("click", () => connectWallet("metamask"));
document.getElementById("connectTrustWallet").addEventListener("click", () => connectWallet("trustwallet"));
document.querySelector(".close").addEventListener("click", closeModal);
document.getElementById("languageSelect").addEventListener("change", updateLanguage);

// On page load
window.addEventListener("DOMContentLoaded", function() {
  updateLanguage();
  setupCalculator();

  // Check if already connected (e.g., if the page is reloaded)
  if (window.ethereum) {
    updateWalletInfo();
  }
});
