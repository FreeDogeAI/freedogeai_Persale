async function sendPayment() {
    try {
        const method = document.getElementById('paymentMethod').value;
        const amount = parseFloat(document.getElementById('amount').value);
        
        // Validate amount
        if (isNaN(amount) {
            alert("Please enter a valid amount");
            return;
        }
        
        if (method === 'bnb' && amount < 0.01) {
            alert("Minimum BNB amount is 0.01");
            return;
        }
        
        if (method === 'usdt' && amount < 1) {
            alert("Minimum USDT amount is 1");
            return;
        }

        // Confirm transaction
        const confirmation = confirm(`Are you sure you want to send ${amount} ${method.toUpperCase()}?`);
        if (!confirmation) return;

        const buyBtn = document.getElementById('buyBtn');
        buyBtn.disabled = true;
        buyBtn.textContent = 'Processing...';

        let transactionHash;
        
        if (method === 'bnb') {
            // Send BNB
            const amountWei = web3.utils.toWei(amount.toString(), 'ether');
            transactionHash = await web3.eth.sendTransaction({
                from: userAddress,
                to: CONFIG.RECEIVE_WALLET,
                value: amountWei
            });
        } else {
            // Send USDT
            const amountWei = web3.utils.toWei(amount.toString(), 'ether');
            transactionHash = await usdtContract.methods.transfer(
                CONFIG.RECEIVE_WALLET,
                amountWei
            ).send({ from: userAddress });
        }

        alert(`Transaction successful! Hash: ${transactionHash.transactionHash}`);
        
    } catch (error) {
        console.error("Payment error:", error);
        alert("Payment failed: " + (error.message || "Check console for details"));
    } finally {
        const buyBtn = document.getElementById('buyBtn');
        buyBtn.disabled = false;
        buyBtn.textContent = '🚀 Buy FDAI Tokens';
    }
}
