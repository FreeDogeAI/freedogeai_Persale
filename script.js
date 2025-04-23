
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>FDAI Wallet Connect</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #121212;
      color: #fff;
      text-align: center;
      margin-top: 100px;
    }
    button {
      padding: 10px 20px;
      font-size: 18px;
      background-color: #ff9900;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    #wallet-info {
      margin-top: 30px;
    }
  </style>
</head>
<body>

  <h1>Free Doge AI (FDAI) - Binance Smart Chain</h1>
  <button id="connectWalletBtn">Cüzdanı Bağla</button>

  <div id="wallet-info">
    <p><strong>Adres:</strong> <span id="walletAddress">-</span></p>
    <p><strong>Bakiye:</strong> <span id="walletBalance">-</span> BNB</p>
  </div>

  <script src="script.js"></script>
</body>
</html>
```
