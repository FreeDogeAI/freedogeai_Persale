const CONFIG = {
    RECEIVE_WALLET: "0xd924e01c7d319c5b23708cd622bd1143cd4fb360",
    TOKENS_PER_BNB: 120000000000,
    TOKENS_PER_USDT: 200000000,
    BSC_CHAIN_ID: 56,
    USDT_CONTRACT: "0x55d398326f99059fF775485246999027B3197955"
};

let web3;
let userAddress = "";
let usdtContract;

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
    document.getElementById('buyBtn').addEventListener('click', sendPayment);
    document.getElementById('amount').addEventListener('input', calculateFDAI);
    document.getElementById('paymentMethod').addEventListener('change', togglePaymentMethod);
    
    if (window.ethereum?.selectedAddress) {
        connectWallet();
    }
});

function togglePaymentMethod() {
    const method = document.getElementById('paymentMethod').value;
    if (method === 'bnb') {
        document.getElementById('rateInfo').textContent = '1 BNB = 120,000,000,000 FDAI';
        document.getElementById('amount').placeholder = 'Enter amount (e.g., 0.1 BNB)';
        document.getElementById('amount').step = '0.01';
        document.getElementById('amount').min = '0.01';
    } else {
        document.getElementById('rateInfo').textContent = '1 USDT = 200,000,000 FDAI';
        document.getElementById('amount').placeholder = 'Enter amount (e.g., 1 USDT)';
        document.getElementById('amount').step = '1';
        document.getElementById('amount').min = '1';
    }
    calculateFDAI();
}

async function connectWallet() {
    try {
        if (!window.ethereum) {
            if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                const currentUrl = window.location.href.replace(/^https?:\/\//, '');
                window.location.href = `https://metamask.app.link/dapp/${currentUrl}`;
            } else {
                window.open("https://metamask.io/download.html", "_blank");
            }
            return;
        }
        
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        userAddress = accounts[0];
        web3 = new Web3(window.ethereum);
        
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
            "outputs": [{"name": "success", "type": "bool"}],
            "type": "function"
        }];

        usdtContract = new web3.eth.Contract(usdtAbi, CONFIG.USDT_CONTRACT);

        const chainId = await web3.eth.getChainId();
        if (chainId !== CONFIG.BSC_CHAIN_ID) {
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: `0x${CONFIG.BSC_CHAIN_ID.toString(16)}` }],
                });
            } catch (switchError) {
                if (switchError.code === 4902) {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: `0x${CONFIG.BSC_CHAIN_ID.toString(16)}`,
                            chainName: 'Binance Smart Chain',
                            nativeCurrency: {
                                name: 'BNB',
                                symbol: 'BNB',
                                decimals: 18
                            },
                            rpcUrls: ['https://bsc-dataseed.binance.org/'],
                            blockExplorerUrls: ['https://bscscan.com']
                        }],
                    });
                } else {
                    throw switchError;
                }
            }
        }

        const bnbBalance = await web3.eth.getBalance(userAddress);
        const usdtBalance = await usdtContract.methods.balanceOf(userAddress).call();

        document.getElementById('walletAddress').textContent = userAddress;
        document.getElementById('bnbBalance').textContent = web3.utils.fromWei(bnbBalance, 'ether');
        document.getElementById('usdtBalance').textContent = web3.utils.fromWei(usdtBalance, 'ether');
        document.getElementById('walletInfo').style.display = 'block';

        document.getElementById('buyBtn').disabled = false;
    } catch (error) {
        console.error("Error connecting wallet:", error);
        alert("Failed to connect wallet. Please try again.");
    }
}

function calculateFDAI() {
    const amount = document.getElementById('amount').value;
    const method = document.getElementById('paymentMethod').value;
    const fdaiAmountSpan = document.getElementById('fdaiAmount');

    if (!amount || amount <= 0) {
        fdaiAmountSpan.textContent = '0';
        return;
    }

    let fdaiAmount;
    if (method === 'bnb') {
        fdaiAmount = amount * CONFIG.TOKENS_PER_BNB;
    } else {
        fdaiAmount = amount * CONFIG.TOKENS_PER_USDT;
    }

    fdaiAmountSpan.textContent = fdaiAmount.toLocaleString();
}

async function sendPayment() {
    const amount = document.getElementById('amount').value;
    const method = document.getElementById('paymentMethod').value;

    if (!amount || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    try {
        if (method === 'bnb') {
            const weiAmount = web3.utils.toWei(amount, 'ether');
            await web3.eth.sendTransaction({
                from: userAddress,
                to: CONFIG.RECEIVE_WALLET,
                value: weiAmount
            });
        } else {
            const weiAmount = web3.utils.toWei(amount, 'ether');
            await usdtContract.methods.transfer(CONFIG.RECEIVE_WALLET, weiAmount).send({ from: userAddress });
        }

        alert("Payment successful! Your tokens will be reflected in your wallet within 24 hours.");
    } catch (error) {
        console.error("Payment error:", error);
        alert("Payment failed. Please try again.");
    }
}
