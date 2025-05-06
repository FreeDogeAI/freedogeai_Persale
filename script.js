// Main JavaScript for FreeDogeAI Pre-Sale Website
document.addEventListener('DOMContentLoaded', function() {
    // ========== COUNTDOWN TIMER ==========
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 30); // Set 30 days from now
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById("days").textContent = days.toString().padStart(2, '0');
        document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.querySelector(".countdown").innerHTML = "<div class='countdown-ended'>PRÉVENTE TERMINÉE!</div>";
        }
    }
    
    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    // ========== PROGRESS BAR ==========
    let currentProgress = 0;
    const targetBNB = 625;
    let raisedBNB = 125; // Example starting value - replace with real data
    
    function updateProgressBar() {
        // In a real implementation, you would fetch this from your backend
        raisedBNB += Math.random() * 5; // Simulate progress - remove in production
        
        if (raisedBNB > targetBNB) raisedBNB = targetBNB;
        currentProgress = (raisedBNB / targetBNB) * 100;
        
        const progressBar = document.getElementById("progress");
        progressBar.style.width = currentProgress + "%";
        progressBar.textContent = Math.round(currentProgress) + "%";
        
        // Update raised amount display
        document.getElementById("raised-bnb").textContent = raisedBNB.toFixed(2);
        document.getElementById("target-bnb").textContent = targetBNB;
        
        // Calculate remaining time based on progress rate (simulation)
        const remainingBNB = targetBNB - raisedBNB;
        if (remainingBNB > 0 && currentProgress > 0) {
            const rate = raisedBNB / (30 - (countdownDate - new Date()) / (1000 * 60 * 60 * 24));
            const daysRemaining = remainingBNB / rate;
            document.getElementById("time-remaining").textContent = Math.ceil(daysRemaining) + " jours";
        }
    }
    
    setInterval(updateProgressBar, 5000);
    updateProgressBar();

    // ========== TOKEN CALCULATOR ==========
    const tokenPrice = 0.00000000000833; // 1 FDAI = 0.00000000000833 BNB
    const tokensPerBNB = 120000000000; // 1 BNB = 120,000,000,000 FDAI
    
    document.getElementById("bnb-amount").addEventListener("input", function() {
        const bnbAmount = parseFloat(this.value) || 0;
        const tokensReceived = bnbAmount * tokensPerBNB;
        
        document.getElementById("tokens-received").value = tokensReceived.toLocaleString('fr-FR');
        
        // Update USD equivalent (example conversion rate)
        const bnbToUsdRate = 300; // Example rate - fetch real rate in production
        const usdAmount = bnbAmount * bnbToUsdRate;
        document.getElementById("usd-equivalent").textContent = usdAmount.toLocaleString('fr-FR', {
            style: 'currency',
            currency: 'USD'
        });
    });

    // ========== LANGUAGE SELECTOR ==========
    const languageBtns = document.querySelectorAll(".language-btn");
    
    languageBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            // Remove active class from all buttons
            languageBtns.forEach(b => b.classList.remove("active"));
            
            // Add active class to clicked button
            this.classList.add("active");
            
            // In a real implementation, you would load translations here
            const lang = this.dataset.lang;
            alert("Changement de langue vers: " + lang);
            
            // Example of how you might handle translations
            // loadTranslations(lang);
        });
    });

    // ========== COPY CONTRACT ADDRESS ==========
    const contractAddresses = document.querySelectorAll(".contract-address");
    
    contractAddresses.forEach(address => {
        address.addEventListener("click", function() {
            const textToCopy = this.textContent.trim();
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = this.textContent;
                this.textContent = "Copié!";
                
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        });
    });

    // ========== CONNECT WALLET ==========
    document.getElementById("connect-wallet").addEventListener("click", async function() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const walletAddress = accounts[0];
                
                // Shorten address for display
                const shortenedAddress = walletAddress.substring(0, 6) + "..." + walletAddress.substring(walletAddress.length - 4);
                this.textContent = shortenedAddress;
                this.classList.add("connected");
                
                // Enable buy button
                document.getElementById("buy-btn").disabled = false;
                
            } catch (error) {
                console.error("Erreur de connexion:", error);
                alert("Erreur de connexion au wallet: " + error.message);
            }
        } else {
            alert("Veuillez installer MetaMask ou un wallet compatible!");
        }
    });

    // ========== BUY BUTTON FUNCTIONALITY ==========
    document.getElementById("buy-btn").addEventListener("click", async function() {
        const bnbAmount = parseFloat(document.getElementById("bnb-amount").value);
        
        if (!bnbAmount || bnbAmount <= 0) {
            alert("Veuillez entrer un montant valide");
            return;
        }
        
        if (typeof window.ethereum !== 'undefined') {
            try {
                // Convert BNB amount to wei
                const weiAmount = web3.utils.toWei(bnbAmount.toString(), 'ether');
                
                // Send transaction
                const txHash = await window.ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [{
                        from: (await window.ethereum.request({ method: 'eth_accounts' }))[0],
                        to: '0xd924e01c7d319c5b23708cd622bd1143cd4fb360', // Your BNB receiver address
                        value: weiAmount,
                    }]
                });
                
                alert(`Transaction envoyée! Hash: ${txHash}\nVous recevrez vos tokens FDAI automatiquement.`);
                
            } catch (error) {
                console.error("Erreur de transaction:", error);
                alert("Erreur de transaction: " + error.message);
            }
        } else {
            alert("Wallet non détecté! Veuillez vous connecter d'abord.");
        }
    });

    // ========== ANIMATIONS ==========
    // Logo animation
    const logo = document.querySelector(".logo");
    if (logo) {
        logo.addEventListener("mouseover", () => {
            logo.style.transform = "scale(1.05) rotate(-5deg)";
            logo.style.filter = "drop-shadow(0 0 20px var(--or))";
        });
        
        logo.addEventListener("mouseout", () => {
            logo.style.transform = "scale(1)";
            logo.style.filter = "drop-shadow(0 0 15px var(--or))";
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // ========== REAL-TIME UPDATES ==========
    // This would be replaced with actual Web3 or API calls in production
    function fetchRealTimeData() {
        // Simulate fetching token price
        const priceVariation = (Math.random() * 0.2) - 0.1; // -10% to +10%
        const currentPrice = tokenPrice * (1 + priceVariation);
        
        document.getElementById("current-price").textContent = currentPrice.toExponential(2);
        document.getElementById("price-change").textContent = (priceVariation * 100).toFixed(2) + "%";
        
        // Color code the change
        const priceChangeElement = document.getElementById("price-change");
        if (priceVariation > 0) {
            priceChangeElement.style.color = "#4CAF50"; // Green
            priceChangeElement.textContent = "+" + priceChangeElement.textContent;
        } else {
            priceChangeElement.style.color = "#F44336"; // Red
        }
    }
    
    setInterval(fetchRealTimeData, 10000);
    fetchRealTimeData();

    // ========== MOBILE MENU ==========
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener("click", function() {
            mobileMenu.classList.toggle("hidden");
        });
    }
});

// ========== WEB3 INTEGRATION ==========
// Check if Web3 is injected (MetaMask)
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask est installé!');
    
    // Handle chain changes
    window.ethereum.on('chainChanged', (chainId) => {
        // Handle the new chain
        console.log('Chain changed:', chainId);
        window.location.reload();
    });
    
    // Handle account changes
    window.ethereum.on('accountsChanged', (accounts) => {
        console.log('Account changed:', accounts);
        if (accounts.length === 0) {
            // Wallet disconnected
            document.getElementById("connect-wallet").textContent = "Connecter Wallet";
            document.getElementById("connect-wallet").classList.remove("connected");
            document.getElementById("buy-btn").disabled = true;
        } else {
            // Wallet changed
            const shortenedAddress = accounts[0].substring(0, 6) + "..." + accounts[0].substring(accounts[0].length - 4);
            document.getElementById("connect-wallet").textContent = shortenedAddress;
        }
    });
} else {
    console.log('MetaMask non détecté');
    document.getElementById("connect-wallet").textContent = "Installer MetaMask";
    document.getElementById("connect-wallet").addEventListener("click", function() {
        window.open("https://metamask.io/download.html", "_blank");
    });
}

// ========== LOAD TRANSLATIONS ==========
// This would be expanded with actual translation files
function loadTranslations(lang) {
    const translations = {
        'en': {
            'presale-title': "FreeDogeAI Pre-Sale",
            'connect-wallet': "Connect Wallet"
        },
        'fr': {
            'presale-title': "Prévente FreeDogeAI",
            'connect-wallet': "Connecter Wallet"
        },
        // Add other languages...
    };
    
    if (translations[lang]) {
        Object.keys(translations[lang]).forEach(key => {
            const elements = document.querySelectorAll(`[data-translate="${key}"]`);
            elements.forEach(el => {
                el.textContent = translations[lang][key];
            });
        });
    }
}

// ========== INITIALIZE TOOLTIPS ==========
// Initialize tooltips using Tippy.js (you would need to include the library)
if (typeof tippy !== 'undefined') {
    tippy('[data-tippy-content]', {
        placement: 'top',
        animation: 'scale',
        duration: 200,
        arrow: true
    });
                    }
