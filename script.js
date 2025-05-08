// Timer Fonksiyonu
function startCountdown() {
    // 7 gün sonrası için zaman ayarla
    const countDownDate = new Date();
    countDownDate.setDate(countDownDate.getDate() + 7);
    
    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        
        // Zaman hesaplamaları
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Ekrana yazdır
        document.getElementById("days").innerHTML = days.toString().padStart(2, "0");
        document.getElementById("hours").innerHTML = hours.toString().padStart(2, "0");
        document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, "0");
        document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, "0");
        
        // Süre dolduysa
        if (distance < 0) {
            clearInterval(timer);
            document.querySelector(".timer-container").innerHTML = "<p>Ön satış sona erdi!</p>";
        }
    }, 1000);
}

// Parçacık Efekti
function initParticles() {
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#6e45e2"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#6e45e2",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });
}

// Dil Değiştirme
function setupLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Aktif butonu güncelle
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Dil değiştirme işlemleri burada yapılacak
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });
}

// Uygulama Başlatma
document.addEventListener('DOMContentLoaded', function() {
    // Animasyonları başlat
    initParticles();
    startCountdown();
    
    // Dil değiştiriciyi ayarla
    setupLanguageSwitcher();
    
    // Cüzdan bağlantısını kontrol et
    if (typeof window.ethereum !== 'undefined') {
        checkWalletConnection();
    }
});
