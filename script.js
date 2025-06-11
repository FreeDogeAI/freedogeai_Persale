async function initializeWeb3() {
    // Modern tarayıcılar için standart yaklaşım
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        
        try {
            // Zincir kontrolü
            const chainId = await web3.eth.getChainId();
            if (chainId !== CONFIG.BSC_CHAIN_ID) {
                await switchToBSCNetwork();
            }
            
            // USDT kontratı
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
            
        } catch (error) {
            console.error("Web3 initialization error:", error);
            let errorMessage = "Please switch to BSC network manually";
            
            if (currentLanguage === 'tr') errorMessage = "Lütfen BSC ağına manuel olarak geçiş yapın";
            else if (currentLanguage === 'zh') errorMessage = "请手动切换到BSC网络";
            else if (currentLanguage === 'ja') errorMessage = "手動でBSCネットワークに切り替えてください";
            else if (currentLanguage === 'hi') errorMessage = "कृपया मैन्युअली BSC नेटवर्क पर स्विच करें";
            else if (currentLanguage === 'fil') errorMessage = "Mangyaring manual na lumipat sa BSC network";
            
            alert(errorMessage);
        }
    } else {
        // Legacy tarayıcılar veya web3 enjekte edilmemişse
        console.warn("Modern web3 enjekte edilmemiş, fallback kullanılıyor");
        const provider = new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/");
        web3 = new Web3(provider);
        
        let warningMessage = "MetaMask not detected. Some features may be limited.";
        if (currentLanguage === 'tr') warningMessage = "MetaMask bulunamadı. Bazı özellikler kısıtlı olabilir.";
        else if (currentLanguage === 'zh') warningMessage = "未检测到MetaMask。某些功能可能受限。";
        else if (currentLanguage === 'ja') warningMessage = "MetaMaskが検出されませんでした。一部の機能が制限される場合があります。";
        else if (currentLanguage === 'hi') warningMessage = "MetaMask का पता नहीं चला। कुछ सुविधाएँ सीमित हो सकती हैं।";
        else if (currentLanguage === 'fil') warningMessage = "Hindi nakita ang MetaMask. Maaaring limitado ang ilang feature.";
        
        alert(warningMessage);
    }
}
