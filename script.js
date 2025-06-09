<script>
        const CONFIG = {
            RECEIVE_WALLET: "0xd924e01c7d319c5b23708cd622bd1143cd4fb360", // BURAYI KENDİ CÜZDAN ADRESİNLE DEĞİŞTİR
            TOKENS_PER_BNB: 120000000000,
            TOKENS_PER_USDT: 200000000,
            BSC_CHAIN_ID: 56,
            USDT_CONTRACT: "0x55d398326f99059fF775485246999027B3197955",
            FDAI_CONTRACT: "0x8161698A74F2ea0035B9912ED60140893Ac0f39C" // FDAI Token Kontrat Adresi
        };

        let web3;
        let userAddress = "";
        let usdtContract;
        let fdaiContract;

        window.addEventListener('DOMContentLoaded', () => {
            document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
            document.getElementById('buyBtn').addEventListener('click', sendPayment);
            document.getElementById('amount').addEventListener('input', calculateFDAI);
            document.getElementById('paymentMethod').addEventListener('change', togglePaymentMethod);
            
            // Check if wallet is already connected
            if (window.ethereum) {
                checkConnectedWallet();
            }
        });

        async function checkConnectedWallet() {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    userAddress = accounts[0];
                    initializeWeb3();
                    await updateWalletUI();
                }
            } catch (error) {
                console.error("Error checking connected wallet:", error);
            }
        }

        async function initializeWeb3() {
            web3 = new Web3(window.ethereum);
            
            // USDT Kontrat ABI
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
            
            // FDAI Kontrat ABI (basitleştirilmiş)
            const fdaiAbi = [
                {
                    "constant": true,
                    "inputs": [{"name": "_owner", "type": "address"}],
                    "name": "balanceOf",
                    "outputs": [{"name": "balance", "type": "uint256"}],
                    "type": "function"
                }
            ];
            
            usdtContract = new web3.eth.Contract(usdtAbi, CONFIG.USDT_CONTRACT);
            fdaiContract = new web3.eth.Contract(fdaiAbi, CONFIG.FDAI_CONTRACT);
            
            try {
                const chainId = Number(await web3.eth.getChainId());
                if (chainId !== CONFIG.BSC_CHAIN_ID) {
                    await switchToBSCNetwork();
                }
            } catch (error) {
                console.log("Network check failed:", error);
                alert("Please switch to BSC network manually");
            }
        }

        async function updateWalletUI() {
            const shortAddress = `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
            document.getElementById('walletAddress').textContent = shortAddress;
            
            document.getElementById('walletInfo').style.display = 'block';
            document.getElementById('connectWalletBtn').textContent = '✅ Connected';
            document.getElementById('buyBtn').disabled = false;
            
            try {
                // BNB Bakiyesi
                const bnbBalance = await web3.eth.getBalance(userAddress);
                document.getElementById('bnbBalance').textContent = `${web3.utils.fromWei(bnbBalance, 'ether').slice(0, 8)} BNB`;
                
                // USDT Bakiyesi
                const usdtBalance = await usdtContract.methods.balanceOf(userAddress).call();
                document.getElementById('usdtBalance').textContent = `${(usdtBalance / 1e18).toFixed(2)} USDT`;
                
                // FDAI Bakiyesi (opsiyonel)
                const fdaiBalance = await fdaiContract.methods.balanceOf(userAddress).call();
                document.getElementById('fdaiBalance').textContent = `${(fdaiBalance / 1e18).toLocaleString()} FDAI`;
                
            } catch (error) {
                console.error("Balance fetch error:", error);
                // Hata durumunda kullanıcıyı bilgilendir
                alert("Balance check failed. Please make sure you're on BSC network and try again.");
            }
        }

        async function sendPayment() {
            const method = document.getElementById('paymentMethod').value;
            const amount = parseFloat(document.getElementById('amount').value);
            
            if (!amount || amount <= 0) {
                alert("Please enter a valid amount!");
                return;
            }
            
            try {
                // Önce işlemi onaylat
                const confirmMsg = `You are about to send ${amount} ${method.toUpperCase()} to:\n${CONFIG.RECEIVE_WALLET}\n\nYou will receive: ${calculateTokenAmount(amount, method).toLocaleString()} FDAI\n\nConfirm?`;
                
                if (!confirm(confirmMsg)) {
                    return;
                }
                
                if (method === 'bnb') {
                    await sendBNB();
                } else {
                    await sendUSDT();
                }
                
                // İşlem sonrası bakiyeleri güncelle
                setTimeout(updateWalletUI, 5000); // 5 saniye sonra bakiyeleri güncelle
                
            } catch (error) {
                console.error("Payment error:", error);
                alert("Transaction failed: " + (error.message || error));
            }
        }

        function calculateTokenAmount(amount, method) {
            return method === 'bnb' ? amount * CONFIG.TOKENS_PER_BNB : amount * CONFIG.TOKENS_PER_USDT;
        }

        // Diğer fonksiyonlar aynı şekilde kalacak...
        // (togglePaymentMethod, connectWallet, switchToBSCNetwork, sendBNB, sendUSDT vb.)
</script>
