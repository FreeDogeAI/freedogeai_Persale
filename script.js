const CONFIG = {
    RECEIVE_WALLET: "0xd924e01c7d319c5b23708cd622bd1143cd4fb360",
    TOKENS_PER_BNB: 120000000000,
    TOKENS_PER_USDT: 200000000,
    BSC_CHAIN_ID: 56,
    USDT_CONTRACT: "0x55d398326f99059fF775485246999027B3197955"
};
// Çeviri sözlüğü (İngilizce -> Türkçe)
const translations = {
    'en': {
        'Language ▼': 'Language ▼',
        'English': 'English',
        'Türkçe': 'Türkçe',
        'Free Doge AI Token Pre-sale': 'Free Doge AI Token Ön Satış',
        'FreeDogeAI Presale': 'FreeDogeAI Ön Satış',
        'Payment Method:': 'Ödeme Yöntemi:',
        'BNB': 'BNB',
        'USDT (BEP-20)': 'USDT (BEP-20)',
        '1 BNB = 120,000,000,000 FDAI': '1 BNB = 120,000,000,000 FDAI',
        '1 USDT = 200,000,000 FDAI': '1 USDT = 200,000,000 FDAI',
        '🔗 Connect with MetaMask': '🔗 MetaMask ile Bağlan',
        'Your Wallet': 'Cüzdanınız',
        'Address:': 'Adres:',
        'BNB Balance:': 'BNB Bakiyesi:',
        'USDT Balance:': 'USDT Bakiyesi:',
        'Amount:': 'Miktar:',
        'Enter amount (BNB or USDT)': 'Miktar girin (BNB veya USDT)',
        'Enter amount (e.g., 0.1 BNB)': 'Miktar girin (ör. 0.1 BNB)',
        'Enter amount (e.g., 1 USDT)': 'Miktar girin (ör. 1 USDT)',
        'You will receive:': 'Alacağınız miktar:',
        '0': '0',
        '🚀 Buy FDAI Tokens': '🚀 FDAI Token Satın Al',
        'Important Information': 'Önemli Bilgiler',
        'After your token purchase, your tokens will be reflected in your wallet within 24 hours.': 'Token satın alımından sonra tokenlarınız 24 saat içinde cüzdanınıza yansıyacak.',
        'Please make sure you are connected to the BSC (Binance Smart Chain) network.': 'Lütfen BSC (Binance Smart Chain) ağına bağlı olduğunuzdan emin olun.',
        'NOTE:': 'NOT:',
        'If FDAI tokens do not appear, add this contract address:': 'FDAI tokenları görünmezse, şu sözleşme adresini ekleyin:',
        'About $FDAI': '$FDAI Hakkında',
        'FDAI Has Begun!': 'FDAI Başladı!',
        'This is not just another token.': 'Bu sadece bir token değil.',
        'An innovative project powered by artificial intelligence, inspired by Elon Musk\'s interest in Dogecoin.': 'Elon Musk\'ın Dogecoin ilgisinden ilham alan, yapay zeka destekli yenilikçi bir proje.',
        'Combining the energy of meme culture with the strength of AI, this is a movement you don’t want to miss.': 'Meme kültürünün enerjisini yapay zekanın gücüyle birleştiren, kaçırmak istemeyeceğiniz bir hareket.',
        'Join the transformation before FDAI gets listed on major exchanges.': 'FDAI büyük borsalarda listelenmeden önce dönüşüme katılın.',
        'What is Free Doge AI?': 'Free Doge AI Nedir?',
        'Free Doge AI isn’t just a meme coin. It’s a utility-driven crypto project powered by artificial intelligence, designed to offer smarter, safer, and faster blockchain interactions. While it embraces the fun spirit of meme tokens, it also delivers real functionality and long-term vision—setting it apart from typical meme coins.': 'Free Doge AI sadece bir meme coin değil. Yapay zeka destekli, daha akıllı, güvenli ve hızlı blok zinciri etkileşimleri sunmak için tasarlanmış, fayda odaklı bir kripto projesidir. Meme tokenlarının eğlenceli ruhunu benimserken, gerçek işlevsellik ve uzun vadeli vizyon sunarak sıradan meme coinlerden ayrılır.',
        'Why Should You Join?': 'Neden Katılmalısınız?',
        'The presale gives early supporters access to FDAI at a significantly lower price before it launches on major platforms. Early buyers receive more tokens per dollar and gain the opportunity to shape the project\'s future as part of its founding community.': 'Ön satış, erken destekçilere FDAI\'yi büyük platformlarda piyasaya sürülmeden önce çok daha düşük bir fiyata alma imkanı sunar. Erken alıcılar, dolar başına daha fazla token alır ve projenin kurucu topluluğunun bir parçası olarak geleceğini şekillendirme fırsatı elde eder.',
        'How to Join the Presale': 'Ön Satışa Nasıl Katılırım?',
        'Participation is simple. Connect your wallet using the MetaMask link on our official website and complete your purchase with ease.': 'Katılım basit. Resmi web sitemizdeki MetaMask bağlantısını kullanarak cüzdanınızı bağlayın ve satın alma işlemini kolayca tamamlayın.',
        'The presale will end once the allocated token amount is fully sold. Only 15% of the total token supply is dedicated to this early phase. After the presale is complete, tokens will become tradable on decentralized exchanges (DEXs).': 'Ön satış, tahsis edilen token miktarı tamamen satıldığında sona erecek. Toplam token arzının sadece %15\'i bu erken aşamaya ayrılmıştır. Ön satış tamamlandıktan sonra tokenlar merkezi olmayan borsalarda (DEX) alınıp satılabilir hale gelecektir.',
        'Key Advantages': 'Temel Avantajlar',
        'Buy tokens at early-bird prices': 'Tokenları erken alım fiyatlarıyla satın alın',
        'Get exclusive early-stage benefits': 'Özel erken aşama avantajları elde edin',
        'Contribute to community growth': 'Topluluk büyümesine katkıda bulunun',
        'Enjoy AI-powered smart functionality': 'Yapay zeka destekli akıllı işlevsellikten faydalanın',
        'FDAI Early Investor Bonus Structure:': 'FDAI Erken Yatırımcı Bonus Yapısı:',
        'First 100 participants: 15% extra FDAI': 'İlk 100 katılımcı: %15 ekstra FDAI',
        'Next 400: 10% bonus': 'Sonraki 400: %10 bonus',
        'Next 500: 5% bonus': 'Sonraki 500: %5 bonus',
        'What Makes Free Doge AI Unique?': 'Free Doge AI\'yi Benzersiz Kılan Nedir?',
        'Unlike typical meme coins, Free Doge AI is backed by real technology. Its AI integration ensures faster transactions, better security, and a seamless user experience. The project is built on transparency and actively shaped by community feedback—fostering long-term trust and sustainability.': 'Sıradan meme coinlerden farklı olarak, Free Doge AI gerçek teknolojiyle desteklenmektedir. Yapay zeka entegrasyonu, daha hızlı işlemler, daha iyi güvenlik ve sorunsuz bir kullanıcı deneyimi sağlar. Proje, şeffaflık üzerine inşa edilmiştir ve topluluk geri bildirimleriyle aktif olarak şekillenir; bu da uzun vadeli güven ve sürdürülebilirlik sağlar.',
        'Getting Ready': 'Hazırlık',
        'Simply connect your MetaMask wallet via the official website, follow the steps, and claim your spot in the presale. Don’t forget to stay updated on exclusive announcements and limited-time offers.': 'Resmi web sitesi üzerinden MetaMask cüzdanınızı bağlayın, adımları takip edin ve ön satışta yerinizi alın. Özel duyurular ve sınırlı süreli teklifler için güncel kalmayı unutmayın.',
        'Our Vision': 'Vizyonumuz',
        'The Free Doge AI team aims to build a powerful, tech-enabled community that blends entertainment with purpose. It’s not just about buying a token—it’s about joining a movement shaped by its users and powered by innovation.': 'Free Doge AI ekibi, eğlenceyi amaçla birleştiren, teknoloji destekli güçlü bir topluluk oluşturmayı hedefliyor. Bu sadece bir token satın almakla ilgili değil; kullanıcılar tarafından şekillendirilen ve yenilikle güçlendirilen bir harekete katılmakla ilgilidir.',
        'Final Words': 'Son Sözler',
        'FDAI presale is your chance to get in early on a bold, AI-driven meme revolution. With limited supply, exclusive bonuses, and a clear roadmap, this is your opportunity to help shape the future of crypto—don’t miss it.': 'FDAI ön satışı, cesur, yapay zeka destekli bir meme devrimine erken katılma şansınızdır. Sınırlı arz, özel bonuslar ve net bir yol haritasıyla, kriptonun geleceğini şekillendirme fırsatınız—bunu kaçırmayın.',
        'Roadmap': 'Yol Haritası',
        'Phase 1: Launch': '1. Aşama: Lansman',
        'Official website launched: freedogeai.com': 'Resmi web sitesi yayında: freedogeai.com',
        'Social media accounts activated:': 'Sosyal medya hesapları aktif:',
        'Twitter: @FreeDogeAI_FDAI': 'Twitter: @FreeDogeAI_FDAI',
        'Telegram: @freedogeaiFDAI': 'Telegram: @freedogeaiFDAI',
        'Presale successfully launched.': 'Ön satış başarıyla başlatıldı.',
        'Phase 2: Growth': '2. Aşama: Büyüme',
        'Airdrop campaigns and community engagement activities': 'Airdrop kampanyaları ve topluluk katılım etkinlikleri',
        'DEX listings and increased token visibility': 'DEX listelenmeleri ve artan token görünürlüğü',
        'Strategic influencer marketing and partnerships': 'Stratejik influencer pazarlaması ve ortaklıklar',
        'Phase 3: AI Utility': '3. Aşama: Yapay Zeka Kullanımı',
        'Launch of FDAI-powered mini-game and interactive system': 'FDAI destekli mini oyun ve interaktif sistemin lansmanı',
        'Integration of token into task/reward model': 'Tokenın görev/ödül modeline entegrasyonu',
        'Beta testing with real-world use cases': 'Gerçek dünya kullanım senaryolarıyla beta testi',
        'Phase 4: Global Expansion & AI Breakthrough': '4. Aşama: Küresel Genişleme ve Yapay Zeka Atılımı',
        'Surprise centralized exchange (CEX) listings': 'Sürpriz merkezi borsa (CEX) listelenmeleri',
        'NFT and AI integrations': 'NFT ve yapay zeka entegrasyonları',
        'Global reach and scaling objective': 'Küresel erişim ve ölçeklendirme hedefi',
        'Development of a community-driven and revolutionary AI system that aims to surpass models like Grok and ChatGPT.': 'Grok ve ChatGPT gibi modelleri aşmayı hedefleyen topluluk odaklı ve devrimci bir yapay zeka sisteminin geliştirilmesi.',
        '⚠️ Important Notes': '⚠️ Önemli Notlar',
        'How to Join the Presale?': 'Ön Satışa Nasıl Katılırım?',
        '1. Switch to BNB Smart Chain': '1. BNB Smart Chain\'e Geçin',
        'Open MetaMask and switch the network to BNB Smart Chain from the top-left.': 'MetaMask\'i açın ve sol üstten ağı BNB Smart Chain olarak değiştirin.',
        '2. MetaMask Only': '2. Yalnızca MetaMask',
        'Token purchases can only be made via MetaMask.': 'Token satın alımları yalnızca MetaMask üzerinden yapılabilir.',
        'Supported trading pairs: BNB/FDAI and USDT/FDAI.': 'Desteklenen işlem çiftleri: BNB/FDAI ve USDT/FDAI.',
        '3. How to Connect Wallet on Mobile?': '3. Mobilde Cüzdan Nasıl Bağlanır?',
        'When you tap the “Connect Wallet” button on mobile, you’ll be redirected to our site inside the MetaMask browser.': 'Mobilde “Cüzdanı Bağla” butonuna tıkladığınızda, MetaMask tarayıcısında sitemize yönlendirileceksiniz.',
        'Once the site loads there, you need to tap “Connect Wallet” again:': 'Site orada yüklendiğinde, tekrar “Cüzdanı Bağla” butonuna tıklamanız gerekiyor:',
        'First tap: redirects to MetaMask browser.': 'İlk tıklama: MetaMask tarayıcısına yönlendirir.',
        'Second tap: opens the mobile signature screen. Approve it to complete the connection.': 'İkinci tıklama: Mobil imza ekranını açar. Bağlantıyı tamamlamak için onaylayın.',
        '4. What If Auto-Redirect Fails?': '4. Otomatik Yönlendirme Başarısız Olursa Ne Yapmalı?',
        'If MetaMask opens slowly or the password is entered late, the redirect might time out.': 'MetaMask yavaş açılırsa veya şifre geç girilirse, yönlendirme zaman aşımına uğrayabilir.',
        'Make sure the MetaMask app is running in the background, return to our site, and tap “Connect Wallet” again.': 'MetaMask uygulamasının arka planda çalıştığından emin olun, sitemize geri dönün ve tekrar “Cüzdanı Bağla” butonuna tıklayın.',
        '5. Purchasing Tokens': '5. Token Satın Alma',
        'Once connected, simply choose BNB or USDT, enter the amount, and complete your transaction easily.': 'Bağlantı kurulduktan sonra, BNB veya USDT seçin, miktarı girin ve işleminizi kolayca tamamlayın.',
        '6. Making Tokens Visible': '6. Tokenları Görünür Yapma',
        'After purchasing, add the contract address manually to MetaMask using “Import Tokens > Custom Token” to see your FDAI tokens.': 'Satın aldıktan sonra, FDAI tokenlarınızı görmek için MetaMask\'te “Tokenları İçe Aktar > Özel Token” seçeneğini kullanarak sözleşme adresini manuel olarak ekleyin.',
        '7. Limited Supply & Big Vision': '7. Sınırlı Arz ve Büyük Vizyon',
        'Free Doge AI has a much more limited supply than other meme coins — only 2 quadrillion tokens in total.': 'Free Doge AI, diğer meme coinlere kıyasla çok daha sınırlı bir arza sahip — toplamda sadece 2 katrilyon token.',
        '30% of the total supply is locked and will be gradually released according to our roadmap.': 'Toplam arzın %30\'u kilitli ve yol haritamıza göre kademeli olarak serbest bırakılacak.',
        'A surprise CEX listing is also part of our upcoming plans.': 'Sürpriz bir CEX listelenmesi de yakın planlarımızın bir parçası.',
        'Tokenomics': 'Tokenomik',
        'Category': 'Kategori',
        'Percentage (%)': 'Yüzde (%)',
        'Presale': 'Ön Satış',
        'Airdrop & Campaigns': 'Airdrop ve Kampanyalar',
        'Burn': 'Yakım',
        'DEX & CEX Listings': 'DEX ve CEX Listelenmeleri',
        'Locked Reserve': 'Kilitli Rezerv',
        'Team': 'Ekip',
        'Total Supply:': 'Toplam Arz:',
        '2,000,000,000,000,000 (Two Quadrillion)': '2,000,000,000,000,000 (İki Katrilyon)',
        'Circulating Supply:': 'Dolaşımdaki Arz:',
        '1,400,000,000,000,000': '1,400,000,000,000,000',
        'Locked Supply:': 'Kilitli Arz:',
        '600,000,000,000,000 FDAI': '600,000,000,000,000 FDAI',
        'Locked Token Release Schedule': 'Kilitli Token Serbest Bırakma Programı',
        '2026: 5%': '2026: %5',
        '2027: 5%': '2027: %5',
        '2028: 5%': '2028: %5',
        '2029: 5%': '2029: %5',
        '2030: 5%': '2030: %5',
        '2031: 5%': '2031: %5',
        'Join Our Community': 'Topluluğumuza Katıl',
        'X (Twitter)': 'X (Twitter)',
        'Telegram': 'Telegram',
        'Click here to download the whitepaper': 'Whitepaper\'ı indirmek için tıklayın'
    },
    'tr': {
        'Language ▼': 'Dil ▼',
        'English': 'İngilizce',
        'Türkçe': 'Türkçe',
        'Free Doge AI Token Pre-sale': 'Free Doge AI Token Ön Satış',
        'FreeDogeAI Presale': 'FreeDogeAI Ön Satış',
        'Payment Method:': 'Ödeme Yöntemi:',
        'BNB': 'BNB',
        'USDT (BEP-20)': 'USDT (BEP-20)',
        '1 BNB = 120,000,000,000 FDAI': '1 BNB = 120,000,000,000 FDAI',
        '1 USDT = 200,000,000 FDAI': '1 USDT = 200,000,000 FDAI',
        '🔗 Connect with MetaMask': '🔗 MetaMask ile Bağlan',
        'Your Wallet': 'Cüzdanınız',
        'Address:': 'Adres:',
        'BNB Balance:': 'BNB Bakiyesi:',
        'USDT Balance:': 'USDT Bakiyesi:',
        'Amount:': 'Miktar:',
        'Enter amount (BNB or USDT)': 'Miktar girin (BNB veya USDT)',
        'Enter amount (e.g., 0.1 BNB)': 'Miktar girin (ör. 0.1 BNB)',
        'Enter amount (e.g., 1 USDT)': 'Miktar girin (ör. 1 USDT)',
        'You will receive:': 'Alacağınız miktar:',
        '0': '0',
        '🚀 Buy FDAI Tokens': '🚀 FDAI Token Satın Al',
        'Important Information': 'Önemli Bilgiler',
        'After your token purchase, your tokens will be reflected in your wallet within 24 hours.': 'Token satın alımından sonra tokenlarınız 24 saat içinde cüzdanınıza yansıyacak.',
        'Please make sure you are connected to the BSC (Binance Smart Chain) network.': 'Lütfen BSC (Binance Smart Chain) ağına bağlı olduğunuzdan emin olun.',
        'NOTE:': 'NOT:',
        'If FDAI tokens do not appear, add this contract address:': 'FDAI tokenları görünmezse, şu sözleşme adresini ekleyin:',
        'About $FDAI': '$FDAI Hakkında',
        'FDAI Has Begun!': 'FDAI Başladı!',
        'This is not just another token.': 'Bu sadece bir token değil.',
        'An innovative project powered by artificial intelligence, inspired by Elon Musk\'s interest in Dogecoin.': 'Elon Musk\'ın Dogecoin ilgisinden ilham alan, yapay zeka destekli yenilikçi bir proje.',
        'Combining the energy of meme culture with the strength of AI, this is a movement you don’t want to miss.': 'Meme kültürünün enerjisini yapay zekanın gücüyle birleştiren, kaçırmak istemeyeceğiniz bir hareket.',
        'Join the transformation before FDAI gets listed on major exchanges.': 'FDAI büyük borsalarda listelenmeden önce dönüşüme katılın.',
        'What is Free Doge AI?': 'Free Doge AI Nedir?',
        'Free Doge AI isn’t just a meme coin. It’s a utility-driven crypto project powered by artificial intelligence, designed to offer smarter, safer, and faster blockchain interactions. While it embraces the fun spirit of meme tokens, it also delivers real functionality and long-term vision—setting it apart from typical meme coins.': 'Free Doge AI sadece bir meme coin değil. Yapay zeka destekli, daha akıllı, güvenli ve hızlı blok zinciri etkileşimleri sunmak için tasarlanmış, fayda odaklı bir kripto projesidir. Meme tokenlarının eğlenceli ruhunu benimserken, gerçek işlevsellik ve uzun vadeli vizyon sunarak sıradan meme coinlerden ayrılır.',
        'Why Should You Join?': 'Neden Katılmalısınız?',
        'The presale gives early supporters access to FDAI at a significantly lower price before it launches on major platforms. Early buyers receive more tokens per dollar and gain the opportunity to shape the project\'s future as part of its founding community.': 'Ön satış, erken destekçilere FDAI\'yi büyük platformlarda piyasaya sürülmeden önce çok daha düşük bir fiyata alma imkanı sunar. Erken alıcılar, dolar başına daha fazla token alır ve projenin kurucu topluluğunun bir parçası olarak geleceğini şekillendirme fırsatı elde eder.',
        'How to Join the Presale': 'Ön Satışa Nasıl Katılırım?',
        'Participation is simple. Connect your wallet using the MetaMask link on our official website and complete your purchase with ease.': 'Katılım basit. Resmi web sitemizdeki MetaMask bağlantısını kullanarak cüzdanınızı bağlayın ve satın alma işlemini kolayca tamamlayın.',
        'The presale will end once the allocated token amount is fully sold. Only 15% of the total token supply is dedicated to this early phase. After the presale is complete, tokens will become tradable on decentralized exchanges (DEXs).': 'Ön satış, tahsis edilen token miktarı tamamen satıldığında sona erecek. Toplam token arzının sadece %15\'i bu erken aşamaya ayrılmıştır. Ön satış tamamlandıktan sonra tokenlar merkezi olmayan borsalarda (DEX) alınıp satılabilir hale gelecektir.',
        'Key Advantages': 'Temel Avantajlar',
        'Buy tokens at early-bird prices': 'Tokenları erken alım fiyatlarıyla satın alın',
        'Get exclusive early-stage benefits': 'Özel erken aşama avantajları elde edin',
        'Contribute to community growth': 'Topluluk büyümesine katkıda bulunun',
        'Enjoy AI-powered smart functionality': 'Yapay zeka destekli akıllı işlevsellikten faydalanın',
        'FDAI Early Investor Bonus Structure:': 'FDAI Erken Yatırımcı Bonus Yapısı:',
        'First 100 participants: 15% extra FDAI': 'İlk 100 katılımcı: %15 ekstra FDAI',
        'Next 400: 10% bonus': 'Sonraki 400: %10 bonus',
        'Next 500: 5% bonus': 'Sonraki 500: %5 bonus',
        'What Makes Free Doge AI Unique?': 'Free Doge AI\'yi Benzersiz Kılan Nedir?',
        'Unlike typical meme coins, Free Doge AI is backed by real technology. Its AI integration ensures faster transactions, better security, and a seamless user experience. The project is built on transparency and actively shaped by community feedback—fostering long-term trust and sustainability.': 'Sıradan meme coinlerden farklı olarak, Free Doge AI gerçek teknolojiyle desteklenmektedir. Yapay zeka entegrasyonu, daha hızlı işlemler, daha iyi güvenlik ve sorunsuz bir kullanıcı deneyimi sağlar. Proje, şeffaflık üzerine inşa edilmiştir ve topluluk geri bildirimleriyle aktif olarak şekillenir; bu da uzun vadeli güven ve sürdürülebilirlik sağlar.',
        'Getting Ready': 'Hazırlık',
        'Simply connect your MetaMask wallet via the official website, follow the steps, and claim your spot in the presale. Don’t forget to stay updated on exclusive announcements and limited-time offers.': 'Resmi web sitesi üzerinden MetaMask cüzdanınızı bağlayın, adımları takip edin ve ön satışta yerinizi alın. Özel duyurular ve sınırlı süreli teklifler için güncel kalmayı unutmayın.',
        'Our Vision
let web3;
let userAddress = "";
let usdtContract;

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
    document.getElementById('buyBtn').addEventListener('click', sendPayment);
    document.getElementById('bnbAmount').addEventListener('input', calculateFDAI);
    document.getElementById('usdtAmount').addEventListener('input', calculateFDAI);
    document.getElementById('paymentMethod').addEventListener('change', togglePaymentMethod);
    
    // Başlangıçta ödeme yöntemi seçilmemiş, buton pasif
    document.getElementById('buyBtn').disabled = true;
    
    if (window.ethereum?.selectedAddress) {
        connectWallet();
    }
});

function togglePaymentMethod() {
    const method = document.getElementById('paymentMethod').value;
    if (method === 'bnb') {
        document.getElementById('bnbSection').style.display = 'block';
        document.getElementById('usdtSection').style.display = 'none';
        document.getElementById('rateInfo').textContent = '1 BNB = 120,000,000,000 FDAI';
        document.getElementById('bnbAmount').value = '0.1';
        document.getElementById('usdtAmount').value = ''; // USDT alanını sıfırla
    } else {
        document.getElementById('bnbSection').style.display = 'none';
        document.getElementById('usdtSection').style.display = 'block';
        document.getElementById('rateInfo').textContent = '1 USDT = 200,000,000 FDAI';
        document.getElementById('usdtAmount').value = '10';
        document.getElementById('bnbAmount').value = ''; // BNB alanını sıfırla
    }
    calculateFDAI();
}

async function connectWallet() {
    try {
        if (!window.ethereum) {
            if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                const currentUrl = window.location.href.replace(/^https?:\/\//, '');
                window.location.href = "https://metamask.app.link/dapp/buyfreedogeaifdai.org";
            } else {
                window.open("https://metamask.io/download.html", "_blank");
            }
            return;
        }
        
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        userAddress = accounts[0];
        web3 = new Web3(window.ethereum);
        // Eğer ikinci denemede bağlanırsa, bağlantı kontrolü aktif kalsın
if (retryTimer) clearInterval(retryTimer);
retryTimer = setInterval(() => {
    if (window.ethereum.selectedAddress === userAddress) {
        clearInterval(retryTimer);
        updateWalletUI();
    }
}, 1000);
        setTimeout(() => {
    if (!window.ethereum?.selectedAddress) {
        const currentUrl = window.location.href.replace(/^https?:\/\//, '');
        window.location.href = `https://metamask.app.link/dapp/${currentUrl}`;
    }
}, 60000);
        
        const usdtAbi = [{
            "constant": true,
            "inputs": [{"name": "_owner", "type": "address"}],
            "name": "balanceOf",
            "outputs": [{"name": "balance", "type": "uint256"}],
            "type": "function"
        }, {
            "constant": false,
            "inputs": [
                {"name": "_to", "type": "address"},
                {"name": "_value", "type": "uint256"}
            ],
            "name": "transfer",
            "outputs": [{"name": "", "type": "bool"}],
            "type": "function"
        }];
        usdtContract = new web3.eth.Contract(usdtAbi, CONFIG.USDT_CONTRACT);
        
        try {
            const chainId = Number(await web3.eth.getChainId());
            if (chainId !== CONFIG.BSC_CHAIN_ID) {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x38' }]
                });
            }
        } catch (error) {
            console.log("Ağ değiştirme hatası:", error);
            alert("Ağ değiştirme hatası: " + (error.message || error));
        }
        
        await updateWalletUI();
    } catch (error) {
        console.log("Bağlantı hatası:", error);
        alert("Bağlantı hatası: " + (error.message || error));
    }
}

async function updateWalletUI() {
    const shortAddress = `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
    document.getElementById('walletAddress').textContent = shortAddress;
    
    document.getElementById('walletInfo').style.display = 'block';
    document.getElementById('connectWalletBtn').textContent = '✅ Bağlandı';
    document.getElementById('buyBtn').disabled = false; // Cüzdan bağlandığında buton aktif olabilir
    
    try {
        const bnbBalance = await web3.eth.getBalance(userAddress);
        document.getElementById('bnbBalance').textContent = `${web3.utils.fromWei(bnbBalance, 'ether').slice(0, 8)} BNB`;
        
        const usdtBalance = await usdtContract.methods.balanceOf(userAddress).call();
        document.getElementById('usdtBalance').textContent = `${web3.utils.fromWei(usdtBalance, 'ether')} USDT`;
    } catch (error) {
        console.error("Bakiye alma hatası:", error);
    }
}

function calculateFDAI() {
    const method = document.getElementById('paymentMethod').value;
    let fdai = 0;
    
    if (method === 'bnb') {
        const bnbAmount = parseFloat(document.getElementById('bnbAmount').value) || 0;
        fdai = bnbAmount * CONFIG.TOKENS_PER_BNB;
    } else if (method === 'usdt') {
        const usdtAmount = parseFloat(document.getElementById('usdtAmount').value) || 0;
        fdai = usdtAmount * CONFIG.TOKENS_PER_USDT;
    }
    
    document.getElementById('fdaiAmount').textContent = fdai.toLocaleString();
}

async function sendPayment() {
    const method = document.getElementById('paymentMethod').value;
    
    if (!method) {
        alert("Lütfen bir ödeme yöntemi seçin!");
        return;
    }
    
    if (method === 'bnb') {
        const bnbAmount = parseFloat(document.getElementById('bnbAmount').value) || 0;
        if (!bnbAmount || bnbAmount <= 0) {
            alert("Lütfen geçerli bir BNB miktarı girin!");
            return;
        }
        await sendBNB();
    } else if (method === 'usdt') {
        const usdtAmount = parseFloat(document.getElementById('usdtAmount').value) || 0;
        if (!usdtAmount || usdtAmount <= 0) {
            alert("Lütfen geçerli bir USDT miktarı girin!");
            return;
        }
        await sendUSDT();
    }
}

async function sendBNB() {
    const bnbAmount = parseFloat(document.getElementById('bnbAmount').value);
    
    if (!bnbAmount || bnbAmount <= 0) {
        alert("Lütfen geçerli bir BNB miktarı girin!");
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
        alert(`✅ ${bnbAmount} BNB başarıyla gönderildi!\n\nAlacağınız miktar: ${(bnbAmount * CONFIG.TOKENS_PER_BNB).toLocaleString()} FDAI\nTX Hash: ${receipt.transactionHash}`);
    } catch (error) {
        console.error("BNB gönderim hatası:", error);
        alert("BNB gönderimi başarısız oldu: " + (error.message || error));
    }
}

async function sendUSDT() {
    const usdtAmount = parseFloat(document.getElementById('usdtAmount').value);
    
    if (!usdtAmount || usdtAmount <= 0) {
        alert("Lütfen geçerli bir USDT miktarı girin!");
        return;
    }
    
    try {
        const weiAmount = web3.utils.toWei(usdtAmount.toString(), 'ether');
        
        const receipt = await usdtContract.methods.transfer(
            CONFIG.RECEIVE_WALLET,
            weiAmount
        ).send({
            from: userAddress,
            gas: 200000,
            gasPrice: await web3.eth.getGasPrice()
        });
        
        alert(`✅ ${usdtAmount} USDT başarıyla gönderildi!\n\nAlacağınız miktar: ${(usdtAmount * CONFIG.TOKENS_PER_USDT).toLocaleString()} FDAI\nTX Hash: ${receipt.transactionHash}`);
    } catch (error) {
        console.error("USDT gönderim hatası:", error);
        alert("USDT gönderimi başarısız oldu: " + (error.message || error));
    }
}

if (window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
            userAddress = accounts[0];
            updateWalletUI();
        } else {
            document.getElementById('walletInfo').style.display = 'none';
            document.getElementById('connectWalletBtn').textContent = '🔗 MetaMask ile Bağlan';
            document.getElementById('buyBtn').disabled = true;
        }
    });
    
    window.ethereum.on('chainChanged', () => window.location.reload());
}
