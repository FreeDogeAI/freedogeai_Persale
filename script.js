<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FreeDogeAI Token Presale</title>
  <link rel="stylesheet" href="style.css">
  <script src="https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.umd.min.js"></script>
</head>
<body>
  <div class="container">
    <h1 id="title">FreeDogeAI Token Presale</h1>

    <select id="languageSelect">
      <option value="en">English</option>
      <option value="tr">Türkçe</option>
      <option value="ru">Русский</option>
      <option value="zh">中文</option>
      <option value="ar">العربية</option>
      <option value="fr">Français</option>
      <option value="de">Deutsch</option>
      <option value="es">Español</option>
      <option value="hi">हिन्दी</option>
      <option value="ja">日本語</option>
    </select>

    <div class="wallet-buttons">
      <button id="connectMetaMask">Connect with MetaMask</button>
      <button id="connectTrustWallet">Connect with TrustWallet</button>
    </div>

    <div id="walletAddress">Wallet not connected</div>
    <div id="bnbBalance">BNB Balance: --</div>

    <input type="number" id="bnbAmount" placeholder="Enter BNB amount">
    <div id="fdaiAmount">0 FDAI</div>
    <button id="buyButton" disabled>Buy Tokens</button>
    <div id="insufficientFunds" style="display: none; color: red;">Insufficient funds</div>

    <h2 id="about-title">About FreeDogeAI</h2>
    <p id="aboutText">Don't miss out! FreeDogeAI is here to shake the memecoin market. Be part of the hype before it's too late. This presale won't last forever — secure your place now.</p>

    <a id="whiteLink" href="FreeDogeAI_Whitepaper.pdf" download>Download Whitepaper</a>

    <footer>
      <p id="communityText">Join our community: <a href="https://t.me/freedogeaiFDAI" target="_blank">Telegram</a> | <a href="https://x.com/FreeDogeAI_FDAI" target="_blank">Twitter (X)</a></p>
    </footer>
  </div>

  <script src="script.js"></script>
</body>
</html>
  
