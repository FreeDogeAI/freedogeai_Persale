<!DOCTYPE html><html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FreeDogeAI Token Presale</title>
  <script src="https://cdn.jsdelivr.net/npm/web3@1.9.0/dist/web3.min.js"></script>
  <style>
    body {
      background-color: #000;
      color: #FFD700;
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 20px;
    }
    button {
      padding: 12px 24px;
      margin: 10px;
      background-color: #FFD700;
      color: #000;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
    }
    select, a {
      margin-top: 10px;
      display: inline-block;
      color: #FFD700;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <h1 id="title">FreeDogeAI Token Presale</h1><button onclick="connectViaMetaMask()">Connect with MetaMask</button> <button onclick="connectViaTrustWallet()">Connect with TrustWallet</button>

  <p id="walletAddress">Wallet not connected</p>
  <p id="walletBalance"></p>
  <input type="number" id="bnbAmount" placeholder="Enter BNB" />
  <p id="tokenAmount">0 FDAI</p>
  <button id="buyBtn">Buy Tokens</button>  <h2 id="about">About FreeDogeAI</h2>
  <p id="aboutText">FreeDogeAI is a meme-powered token combining AI hype and the spirit of Dogecoin.</p>
  <a id="whiteLink" href="whitepaper.pdf" download>Download Whitepaper</a>  <footer>
    <p id="communityText">Join our community:</p>
    <a href="https://t.me/freedogeaiFDAI" target="_blank">Telegram</a> |
    <a href="https://x.com/FreeDogeAI_FDAI" target="_blank">Twitter (X)</a>
  </footer>  <script>
    const connectViaMetaMask = () => {
      window.location.href = "https://metamask.app.link/dapp/freedogeai.github.io";
    };

    const connectViaTrustWallet = () => {
      window.location.href = "https://link.trustwallet.com/open_url?coin_id=20000714&url=https://freedogeai.github.io";
    };

    document.getElementById("bnbAmount").addEventListener("input", () => {
      const bnb = parseFloat(document.getElementById("bnbAmount").value);
      document.getElementById("tokenAmount").textContent = !isNaN(bnb) && bnb > 0 ? `${(bnb * 12500000).toLocaleString()} FDAI` : "0 FDAI";
    });
  </script></body>
</html>
