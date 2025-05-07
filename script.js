// app.js
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const metamaskButton = document.getElementById('metamaskButton');
    const trustwalletButton = document.getElementById('trustwalletButton');
    const buyButton = document.getElementById('buyButton');
    const walletAddress = document.getElementById('walletAddress');
    const walletBalance = document.getElementById('walletBalance');
    const accountInfo = document.getElementById('accountInfo');
    const countdown = document.getElementById('countdown');

    // Countdown Timer (24 hours from now)
    function updateCountdown() {
        const now = new Date();
        const endTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        
        const interval = setInterval(() => {
            const now = new Date();
            const diff = endTime - now;
            
            if (diff <= 0) {
                clearInterval(interval);
                countdown.textContent = "Pre-sale ended!";
                return;
            }
            
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            countdown.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    updateCountdown();

    // Check Wallet Connection
    async function checkWalletConnection() {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    showAccountInfo(accounts[0]);
                    return true;
                }
            } catch (error) {
                console.error("Error checking wallet connection:", error);
            }
        }
        return false;
    }

    // Show Account Info
    async function showAccountInfo(account) {
        walletAddress.textContent = `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
        
        try {
            const balance = await window.ethereum.request({
                method: 'eth_getBalance',
                params: [account, 'latest']
            });
            const balanceInBNB = parseInt(balance) / Math.pow(10, 18);
            walletBalance.textContent = balanceInBNB.toFixed(4);
        } catch (error) {
            walletBalance.textContent = "N/A";
        }
        
        accountInfo.style.display = 'block';
    }

    // Connect MetaMask
    async function connectMetaMask() {
        if (typeof window.ethereum === 'undefined') {
            alert('Please install MetaMask extension!');
            window.open('https://metamask.io/download.html', '_blank');
            return;
        }

        try {
            // Switch to BSC Network if not already
            await switchToBSCNetwork();
            
            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });
            
            showAccountInfo(accounts[0]);
            alert('Successfully connected with MetaMask!');
        } catch (error) {
            console.error("MetaMask connection error:", error);
            alert(`Connection error: ${error.message}`);
        }
    }

    // Connect Trust Wallet
    async function connectTrustWallet() {
        if (typeof window.ethereum === 'undefined') {
            alert('Please install Trust Wallet app!');
            window.open('https://trustwallet.com/', '_blank');
            return;
        }

        try {
            // Switch to BSC Network if not already
            await switchToBSCNetwork();
            
            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });
            
            showAccountInfo(accounts[0]);
            alert('Successfully connected with Trust Wallet!');
        } catch (error) {
            console.error("Trust Wallet connection error:", error);
            alert(`Connection error: ${error.message}`);
        }
    }

    // Switch to BSC Network
    async function switchToBSCNetwork() {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x38' }] // BSC Mainnet
            });
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask
            if (switchError.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: '0x38',
                            chainName: 'Binance Smart Chain',
                            nativeCurrency: {
                                name: 'BNB',
                                symbol: 'BNB',
                                decimals: 18
                            },
                            rpcUrls: ['https://bsc-dataseed.binance.org/'],
                            blockExplorerUrls: ['https://bscscan.com/']
                        }]
                    });
                } catch (addError) {
                    console.error("Error adding BSC network:", addError);
                    throw new Error("Could not add Binance Smart Chain network");
                }
            } else {
                console.error("Error switching to BSC network:", switchError);
                throw new Error("Could not switch to Binance Smart Chain network");
            }
        }
    }

    // Buy Tokens Function
    async function buyTokens() {
        const isConnected = await checkWalletConnection();
        
        if (!isConnected) {
            const useMetaMask = confirm('Connect to MetaMask or Trust Wallet to continue. Click OK for MetaMask or Cancel for Trust Wallet');
            
            if (useMetaMask) {
                await connectMetaMask();
            } else {
                await connectTrustWallet();
            }
            
            // Check again after connection attempt
            if (!await checkWalletConnection()) {
                return;
            }
        }

        // Here you would add your token purchase logic
        alert('Token purchase initiated! Your tokens will arrive within 24 hours.');
        
        // Example transaction (replace with your actual contract details)
        try {
            const transactionParameters = {
                to: '0xYOUR_CONTRACT_ADDRESS', // Your contract address
                from: window.ethereum.selectedAddress,
                value: '0x' + (0.1 * Math.pow(10, 18)).toString(16), // 0.1 BNB
                data: '0xYOUR_CONTRACT_METHOD', // Your contract method
            };
            
            const txHash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
            
            console.log('Transaction Hash:', txHash);
            alert(`Transaction successful! Hash: ${txHash}`);
        } catch (error) {
            console.error('Transaction error:', error);
            alert(`Transaction failed: ${error.message}`);
        }
    }

    // Event Listeners
    metamaskButton.addEventListener('click', connectMetaMask);
    trustwalletButton.addEventListener('click', connectTrustWallet);
    buyButton.addEventListener('click', buyTokens);

    // Check if wallet is already connected on page load
    checkWalletConnection();
});
