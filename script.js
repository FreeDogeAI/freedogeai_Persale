// Log to confirm script is loaded
console.log("script.js loaded");

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
    presaleTitle: "Join FreeDogeAI Presale!",
    presaleSubtitle: "The future of meme coins powered by Artificial Intelligence!",
    walletAddress: "Wallet: Not Connected",
    bnbBalance: "BNB Balance: --",
    buyTokensTitle: "Buy FDAI Tokens",
    buyTokensSubtitle: "Send BNB to purchase FDAI tokens instantly. Tokens will be delivered automatically after transaction confirmation.",
    bnbAmountPlaceholder: "Enter BNB amount",
    fdaiAmount: "YOU WILL RECEIVE: 0 FDAI",
    minimumPurchase: "Minimum purchase: 0.035 BNB",
    buyButton: "Buy Tokens",
    howToBuyTitle: "How to Buy?",
    howToBuyText: "Connect your MetaMask or TrustWallet first.<br>Enter the amount of BNB you want to invest.<br>Click Buy Tokens and complete the transaction.<br>Tokens will be sent automatically to your wallet.",
    roadmapTitle: "Our Roadmap",
    phase1Title: "Phase 1: Building the Foundation",
    phase1Text: "Community creation, website launch, presale initiation, PancakeSwap listing, surprise CEX listing.",
    phase2Title: "Phase 2: Expanding the Ecosystem",
    phase2Text: "Development of FDAI Marketplace, release of AI-driven NFT collections, launch of Swap platform.",
    phase3Title: "Phase 3: Artificial Intelligence Integration",
    phase3Text: "Deployment of AI chatbots, creation of investment analytics tools, launch of AI consulting services for holders.",
    phase4Title: "Phase 4: Gaming Universe",
    phase4Text: "Launch of play-to-earn blockchain games, in-game NFT asset upgrades via FDAI tokens, organization of global tournaments.",
    phase5Title: "Phase 5: Global Events and Expansion",
    phase5Text: "Hosting worldwide seminars, sponsoring major blockchain summits, establishment of FreeDogeAI Academy.",
    phase6Title: "Phase 6: Infinite Growth",
    phase6Text: "Creation of FreeDogeAI Foundation, implementation of the DAO governance system, integration with global payment systems.",
    whitepaperTitle: "Download Whitepaper",
    whitepaperLink: "Download Now",
    communityTitle: "Join Our Community",
    communityText: "Stay connected and follow our latest updates!",
    telegramLink: "Telegram",
    twitterLink: "Twitter (X)",
    footerText: "© 2025 FreeDogeAI. All rights reserved."
  },
  tr: {
    connectWallet: "Cüzdanı Bağla",
    modalTitle: "Cüzdanınızı Bağlayın",
    presaleTitle: "FreeDogeAI Ön Satışına Katıl!",
    presaleSubtitle: "Yapay Zeka ile güçlendirilmiş meme coin’lerin geleceği!",
    walletAddress: "Cüzdan: Bağlı Değil",
    bnbBalance: "BNB Bakiyesi: --",
    buyTokensTitle: "FDAI Tokenları Satın Al",
    buyTokensSubtitle: "FDAI tokenları satın almak için BNB gönderin. Tokenlar işlem onayı sonrası otomatik olarak teslim edilecek.",
    bnbAmountPlaceholder: "BNB miktarını girin",
    fdaiAmount: "ALACAKSINIZ: 0 FDAI",
    minimumPurchase: "Minimum satın alma: 0.035 BNB",
    buyButton: "Token Satın Al",
    howToBuyTitle: "Nasıl Satın Alınır?",
    howToBuyText: "Önce MetaMask veya TrustWallet’ınızı bağlayın.<br>Yatırım yapmak istediğiniz BNB miktarını girin.<br>Token Satın Al’a tıklayın ve işlemi tamamlayın.<br>Tokenlar otomatik olarak cüzdanınıza gönderilecektir.",
    roadmapTitle: "Yol Haritamız",
    phase1Title: "Aşama 1: Temeli İnşa Etme",
    phase1Text: "Topluluk oluşturma, web sitesi lansmanı, ön satış başlatma, PancakeSwap listeleme, sürpriz CEX listeleme.",
    phase2Title: "Aşama 2: Ekosistemi Genişletme",
    phase2Text: "FDAI Marketplace’in geliştirilmesi, yapay zeka destekli NFT koleksiyonlarının yayınlanması, Swap platformunun lansmanı.",
    phase3Title: "Aşama 3: Yapay Zeka Entegrasyonu",
    phase3Text: "Yapay zeka chatbotlarının devreye alınması, yatırım analitiği araçlarının oluşturulması, sahipler için yapay zeka danışmanlık hizmetlerinin lansmanı.",
    phase4Title: "Aşama 4: Oyun Evreni",
    phase4Text: "Oyna-kazan blockchain oyunlarının lansmanı, oyun içi NFT varlık yükseltmeleri için FDAI token kullanımı, global turnuvaların düzenlenmesi.",
    phase5Title: "Aşama 5: Küresel Etkinlikler ve Genişleme",
    phase5Text: "Dünya çapında seminerler düzenleme, büyük blockchain zirvelerine sponsor olma, FreeDogeAI Akademisi’nin kurulması.",
    phase6Title: "Aşama 6: Sonsuz Büyüme",
    phase6Text: "FreeDogeAI Vakfı’nın oluşturulması, DAO yönetim sisteminin uygulanması, küresel ödeme sistemleriyle entegrasyon.",
    whitepaperTitle: "Beyaz Kitabı İndir",
    whitepaperLink: "Şimdi İndir",
    communityTitle: "Topluluğumuza Katıl",
    communityText: "Bağlantıda kalın ve en son güncellemelerimizi takip edin!",
    telegramLink: "Telegram",
    twitterLink: "Twitter (X)",
    footerText: "© 2025 FreeDogeAI. Tüm hakları saklıdır."
  },
  ru: {
    connectWallet: "Подключить кошелек",
    modalTitle: "Подключите ваш кошелек",
    presaleTitle: "Присоединяйтесь к предпродаже FreeDogeAI!",
    presaleSubtitle: "Будущее мем-коинов, основанное на искусственном интеллекте!",
    walletAddress: "Кошелек: Не подключен",
    bnbBalance: "Баланс BNB: --",
    buyTokensTitle: "Купить токены FDAI",
    buyTokensSubtitle: "Отправьте BNB для покупки токенов FDAI мгновенно. Токены будут доставлены автоматически после подтверждения транзакции.",
    bnbAmountPlaceholder: "Введите сумму BNB",
    fdaiAmount: "ВЫ ПОЛУЧИТЕ: 0 FDAI",
    minimumPurchase: "Минимальная покупка: 0.035 BNB",
    buyButton: "Купить токены",
    howToBuyTitle: "Как купить?",
    howToBuyText: "Сначала подключите MetaMask или TrustWallet.<br>Введите сумму BNB, которую хотите инвестировать.<br>Нажмите Купить токены и завершите транзакцию.<br>Токены будут автоматически отправлены в ваш кошелек.",
    roadmapTitle: "Наша дорожная карта",
    phase1Title: "Этап 1: Создание фундамента",
    phase1Text: "Создание сообщества, запуск сайта, начало предпродажи, листинг на PancakeSwap, сюрприз-листинг на CEX.",
    phase2Title: "Этап 2: Расширение экосистемы",
    phase2Text: "Разработка FDAI Marketplace, выпуск NFT-коллекций на базе ИИ, запуск платформы Swap.",
    phase3Title: "Этап 3: Интеграция искусственного интеллекта",
    phase3Text: "Внедрение ИИ-чатботов, создание аналитических инструментов для инвестиций, запуск ИИ-консультационных услуг для держателей.",
    phase4Title: "Этап 4: Игровая вселенная",
    phase4Text: "Запуск игр с механикой play-to-earn, улучшение игровых NFT через токены FDAI, организация глобальных турниров.",
    phase5Title: "Этап 5: Глобальные мероприятия и расширение",
    phase5Text: "Проведение мировых семинаров, спонсорство крупных блокчейн-саммитов, создание FreeDogeAI Academy.",
    phase6Title: "Этап 6: Бесконечный рост",
    phase6Text: "Создание FreeDogeAI Foundation, внедрение системы управления DAO, интеграция с глобальными платежными системами.",
    whitepaperTitle: "Скачать Whitepaper",
    whitepaperLink: "Скачать сейчас",
    communityTitle: "Присоединяйтесь к нашему сообществу",
    communityText: "Оставайтесь на связи и следите за нашими последними обновлениями!",
    telegramLink: "Telegram",
    twitterLink: "Twitter (X)",
    footerText: "© 2025 FreeDogeAI. Все права защищены."
  },
  zh: {
    connectWallet: "连接钱包",
    modalTitle: "连接您的钱包",
    presaleTitle: "加入FreeDogeAI预售！",
    presaleSubtitle: "人工智能驱动的未来模因币！",
    walletAddress: "钱包：未连接",
    bnbBalance: "BNB余额：--",
    buyTokensTitle: "购买FDAI代币",
    buyTokensSubtitle: "发送BNB即可立即购买FDAI代币。交易确认后，代币将自动交付。",
    bnbAmountPlaceholder: "输入BNB金额",
    fdaiAmount: "您将收到：0 FDAI",
    minimumPurchase: "最低购买：0.035 BNB",
    buyButton: "购买代币",
    howToBuyTitle: "如何购买？",
    howToBuyText: "首先连接您的MetaMask或TrustWallet。<br>输入您想投资的BNB金额。<br>点击购买代币并完成交易。<br>代币将自动发送到您的钱包。",
    roadmapTitle: "我们的路线图",
    phase1Title: "阶段1：建立基础",
    phase1Text: "社区创建，网站启动，预售启动，PancakeSwap上市，惊喜CEX上市。",
    phase2Title: "阶段2：扩展生态系统",
    phase2Text: "开发FDAI Marketplace，发布人工智能驱动的NFT收藏，启动Swap平台。",
    phase3Title: "阶段3：人工智能整合",
    phase3Text: "部署人工智能聊天机器人，创建投资分析工具，推出针对持有者的人工智能咨询服务。",
    phase4Title: "阶段4：游戏宇宙",
    phase4Text: "推出玩赚区块链游戏，通过FDAI代币升级游戏内NFT资产，组织全球锦标赛。",
    phase5Title: "阶段5：全球活动和扩展",
    phase5Text: "举办全球研讨会，赞助主要区块链峰会，建立FreeDogeAI学院。",
    phase6Title: "阶段6：无限增长",
    phase6Text: "创建FreeDogeAI基金会，实施DAO治理系统，与全球支付系统整合。",
    whitepaperTitle: "下载白皮书",
    whitepaperLink: "立即下载",
    communityTitle: "加入我们的社区",
    communityText: "保持联系，关注我们的最新更新！",
    telegramLink: "Telegram",
    twitterLink: "Twitter (X)",
    footerText: "© 2025 FreeDogeAI。保留所有权利。"
  }
};

// Function to change language
function changeLanguage(lang) {
  console.log("Changing language to:", lang);
  localStorage.setItem("language", lang);

  // Update all text elements
  try {
    document.getElementById("connectWallet").textContent = translations[lang].connectWallet;
    document.getElementById("modalTitle").textContent = translations[lang].modalTitle;
    document.getElementById("presaleTitle").textContent = translations[lang].presaleTitle;
    document.getElementById("presaleSubtitle").textContent = translations[lang].presaleSubtitle;
    document.getElementById("walletAddress").textContent = translations[lang].walletAddress;
    document.getElementById("bnbBalance").textContent = translations[lang].bnbBalance;
    document.getElementById("buyTokensTitle").textContent = translations[lang].buyTokensTitle;
    document.getElementById("buyTokensSubtitle").textContent = translations[lang].buyTokensSubtitle;
    document.getElementById("bnbAmount").placeholder = translations[lang].bnbAmountPlaceholder;
    document.getElementById("fdaiAmount").textContent = translations[lang].fdaiAmount;
    document.getElementById("minimumPurchase").textContent = translations[lang].minimumPurchase;
    document.getElementById("buyButton").textContent = translations[lang].buyButton;
    document.getElementById("howToBuyTitle").textContent = translations[lang].howToBuyTitle;
    document.getElementById("howToBuyText").innerHTML = translations[lang].howToBuyText;
    document.getElementById("roadmapTitle").textContent = translations[lang].roadmapTitle;
    document.getElementById("phase1Title").textContent = translations[lang].phase1Title;
    document.getElementById("phase1Text").textContent = translations[lang].phase1Text;
    document.getElementById("phase2Title").textContent = translations[lang].phase2Title;
    document.getElementById("phase2Text").textContent = translations[lang].phase2Text;
    document.getElementById("phase3Title").textContent = translations[lang].phase3Title;
    document.getElementById("phase3Text").textContent = translations[lang].phase3Text;
    document.getElementById("phase4Title").textContent = translations[lang].phase4Title;
    document.getElementById("phase4Text").textContent = translations[lang].phase4Text;
    document.getElementById("phase5Title").textContent = translations[lang].phase5Title;
    document.getElementById("phase5Text").textContent = translations[lang].phase5Text;
    document.getElementById("phase6Title").textContent = translations[lang].phase6Title;
    document.getElementById("phase6Text").textContent = translations[lang].phase6Text;
    document.getElementById("whitepaperTitle").textContent = translations[lang].whitepaperTitle;
    document.getElementById("whitepaperLink").textContent = translations[lang].whitepaperLink;
    document.getElementById("communityTitle").textContent = translations[lang].communityTitle;
    document.getElementById("communityText").textContent = translations[lang].communityText;
    document.getElementById("telegramLink").textContent = translations[lang].telegramLink;
    document.getElementById("twitterLink").textContent = translations[lang].twitterLink;
    document.getElementById("footerText").textContent = translations[lang].footerText;
    console.log("Language change successful");
  } catch (error) {
    console.error("Error during language change:", error);
  }
}

// Function to update wallet info
async function updateWalletInfo() {
  console.log("Updating wallet info...");
  try {
    if (!window.ethereum) {
      console.log("No Ethereum provider detected.");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let accounts = await provider.listAccounts();
    if (accounts.length === 0) {
      console.log("No accounts connected yet, requesting accounts...");
      accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    }

    if (accounts.length > 0) {
      const address = accounts[0];
      const balanceWei = await provider.getBalance(address);
      const balance = ethers.utils.formatEther(balanceWei);

      const lang = localStorage.getItem("language") || "en";
      document.getElementById("walletAddress").textContent = `${translations[lang].walletAddress.split(":")[0]}: ${address.slice(0, 6)}...${address.slice(-4)}`;
      document.getElementById("bnbBalance").textContent = `${translations[lang].bnbBalance.split(":")[0]}: ${parseFloat(balance).toFixed(4)}`;

      // Enable Buy button if BNB amount is sufficient
      const bnbInput = document.getElementById("bnbAmount");
      const bnbValue = parseFloat(bnbInput.value) || 0;
      document.getElementById("buyButton").disabled = bnbValue < 0.035 || bnbValue > parseFloat(balance);
      console.log("Buy button status:", document.getElementById("buyButton").disabled);
    } else {
      console.log("No accounts connected.");
    }
  } catch (error) {
    console.error("Error updating wallet info:", error);
    alert("Failed to update wallet info: " + error.message);
  }
}

// Function to open modal
function openModal() {
  console.log("Opening wallet modal...");
  try {
    const modal = document.getElementById("walletModal");
    if (modal) {
      modal.style.display = "block";
    } else {
      console.error("Wallet modal not found!");
    }
  } catch (error) {
    console.error("Error opening modal:", error);
  }
}

// Function to close modal
function closeModal() {
  console.log("Closing wallet modal...");
  try {
    const modal = document.getElementById("walletModal");
    if (modal) {
      modal.style.display = "none";
    } else {
      console.error("Wallet modal not found!");
    }
  } catch (error) {
    console.error("Error closing modal:", error);
  }
}

// Function to connect wallet
async function connectWallet(walletType) {
  console.log(`Connecting to ${walletType}...`);
  try {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    console.log("Is mobile device:", isMobile);

    if (isMobile) {
      let deepLink;
      const dappUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;

      if (walletType === "metamask") {
        deepLink = `metamask://dapp/${dappUrl}`;
        console.log("MetaMask deep link:", deepLink);
      } else {
        deepLink = `trust://open_url?url=${encodeURIComponent(dappUrl)}`;
        console.log("TrustWallet deep link:", deepLink);
      }

      console.log(`Triggering deep link: ${deepLink}`);
      window.location.href = deepLink;

      setTimeout(() => {
        if (!window.ethereum) {
          console.log(`${walletType} deep link may have failed, trying alternative...`);
          if (walletType === "metamask") {
            window.location.href = `https://metamask.app.link/dapp/${dappUrl}`;
          } else {
            window.location.href = `https://link.trustwallet.com/open_url?url=${encodeURIComponent(dappUrl)}`;
          }
        }
      }, 3000);

      let attempts = 0;
      const maxAttempts = 30;
      const checkConnection = setInterval(async () => {
        attempts++;
        if (window.ethereum) {
          clearInterval(checkConnection);
          console.log(`${walletType} wallet detected on mobile.`);

          try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log("Provider initialized:", provider);

            let accounts = await provider.listAccounts();
            if (accounts.length === 0) {
              console.log("Requesting account access...");
              accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            }
            console.log("Accounts received:", accounts);

            if (accounts.length > 0) {
              console.log(`${walletType} wallet connected on mobile.`);
              await updateWalletInfo();
              closeModal();
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
          alert(`Failed to connect to ${walletType}. Please ensure the app is installed and try again. Alternatively, open this page in the ${walletType} browser.`);
        }
      }, 1000);
    } else {
      if (!window.ethereum) {
        console.log(`${walletType} not detected on desktop.`);
        alert(`${walletType} is not detected. Please install ${walletType} or open this page in the ${walletType} browser.`);
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      console.log(`${walletType} wallet connected on desktop.`);
      await updateWalletInfo();
      closeModal();
    }
  } catch (error) {
    console.error(`Error connecting to ${walletType}:`, error);
    alert(`Failed to connect to ${walletType}: ${error.message}`);
  }
}

// Function to set up calculator
function setupCalculator() {
  console.log("Setting up calculator...");
  const bnbInput = document.getElementById("bnbAmount");

  if (bnbInput) {
    bnbInput.addEventListener("input", function() {
      console.log("BNB amount input changed:", this.value);
      const bnbValue = parseFloat(this.value) || 0;
      const tokens = bnbValue * 12500000; // 1 BNB = 12.5M FDAI

      const lang = localStorage.getItem("language") || "en";
      const baseText = translations[lang].fdaiAmount.split("0 FDAI")[0];
      document.getElementById("fdaiAmount").textContent = `${baseText}${tokens.toLocaleString()} FDAI`;

      document.getElementById("buyButton").disabled = bnbValue < 0.035;
      console.log("BNB input value:", bnbValue, "Buy button disabled:", document.getElementById("buyButton").disabled);
      if (window.ethereum) {
        updateWalletInfo();
      }
    });
  } else {
    console.error("bnbAmount input not found!");
  }
}

// Initialize the page
window.onload = function() {
  console.log("Window loaded");

  // Set default language
  const lang = localStorage.getItem("language") || "en";
  changeLanguage(lang);

  // Set up calculator
  setupCalculator();

  // Language buttons
  const langButtons = document.querySelectorAll(".language-btn");
  if (langButtons.length > 0) {
    langButtons.forEach(button => {
      button.addEventListener("click", function() {
        const lang = this.getAttribute("data-lang");
        console.log("Language button clicked:", lang);
        changeLanguage(lang);
      });
    });
  } else {
    console.error("Language buttons not found!");
  }

  // Connect Wallet button
  const connectWalletBtn = document.getElem
