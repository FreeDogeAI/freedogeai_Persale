// Initialize i18next
i18next
  .use(i18nextHttpBackend)
  .init({
    lng: 'tr', // default language
    fallbackLng: 'en',
    debug: false,
    backend: {
      loadPath: 'translations/{{lng}}.json'
    }
  }, function(err, t) {
    // Initial content update
    updateContent();
    
    // Initialize timer
    initializeTimer();
    
    // Check if wallet is already connected
    checkConnectedWallet();
});

// Update all translatable content
function updateContent() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const translationKey = el.getAttribute('data-i18n');
        el.innerHTML = i18next.t(translationKey);
    });
    
    // Handle RTL languages
    if (i18next.language === 'ar') {
        document.body.setAttribute('dir', 'rtl');
    } else {
        document.body.removeAttribute('dir');
    }
    
    // Apply Hindi font if needed
    if (i18next.language === 'hi') {
        document.body.classList.add('hindi-text');
    } else {
        document.body.classList.remove('hindi-text');
    }
}

// Language switcher
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang');
        
        // Update active button
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Change language
        i18next.changeLanguage(lang, (err, t) => {
            if (err) return console.error('Language change error:', err);
            updateContent();
        });
    });
});

// Check if wallet is already connected
async function checkConnectedWallet() {
    if (window.ethereum && window.ethereum.selectedAddress) {
        await connectWallet();
    } else if (window.trustwallet && window.trustwallet.isTrust) {
        await connectWallet();
    }
}

// Initialize countdown timer
function initializeTimer() {
    // Set the date we're counting down to (7 days from now)
    const countDownDate = new Date();
    countDownDate.setDate(countDownDate.getDate() + 7);
    
    // Update the count down every 1 second
    const x = setInterval(function() {
        // Get today's date and time
        const now = new Date().getTime();
        
        // Find the distance between now and the count down date
        const distance = countDownDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        document.getElementById("days").innerHTML = days.toString().padStart(2, '0');
        document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');
        
        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("presale-title").innerHTML = i18next.t('presale.ended');
            document.querySelector(".timer-container").style.display = "none";
        }
    }, 1000);
}
