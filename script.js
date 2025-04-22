// script.js let web3; let userAddress = "";

const TOKENS_PER_BNB = 12500000; const TOKEN_DROP_ADDRESS = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7"; const MINIMUM_BNB = 0.035;

const providerOptions = { walletconnect: { package: window.WalletConnectProvider.default, options: { rpc: { 56: "https://bsc-dataseed.binance.org/" }, chainId: 56, qrcodeModalOptions: { mobileLinks: ["trust", "metamask", "coinbase"] } } } };

const web3Modal = new window.Web3Modal.default({ cacheProvider: false, providerOptions, theme: "dark" });

const connectBtn = document.getElementById("connectBtn"); const walletAddress = document.getElementById("walletAddress"); const bnbAmountInput = document.getElementById("bnbAmount"); const tokenAmount = document.getElementById("tokenAmount"); const buyBtn = document.getElementById("buyBtn"); const languageSelect = document.getElementById("languageSelect");

connectBtn.addEventListener("click", async () => { try { const provider = await web3Modal.connect(); web3 = new Web3(provider); const accounts = await web3.eth.getAccounts(); userAddress = accounts[0]; walletAddress.textContent = Connected: ${userAddress}; } catch (error) { console.error("Connection failed:", error); walletAddress.textContent = "Connection failed"; } });

bnbAmountInput.addEventListener("input", () => { const bnb = parseFloat(bnbAmountInput.value); tokenAmount.textContent = !isNaN(bnb) && bnb > 0 ? ${(bnb * TOKENS_PER_BNB).toLocaleString()} FDAI : "0 FDAI"; });

buyBtn.addEventListener("click", async () => { const bnb = parseFloat(bnbAmountInput.value); if (!userAddress) return alert("Please connect your wallet first."); if (isNaN(bnb) || bnb < MINIMUM_BNB) return alert(Minimum is ${MINIMUM_BNB} BNB);

try { const valueInWei = web3.utils.toWei(bnb.toString(), "ether"); await web3.eth.sendTransaction({ from: userAddress, to: TOKEN_DROP_ADDRESS, value: valueInWei }); alert("Transaction sent successfully!"); } catch (error) { console.error("Transaction failed:", error); alert("Transaction failed."); } });

const translations = { en: { title: "FreeDogeAI Token Presale", connect: "Connect Wallet", notconnected: "Wallet not connected", dontmiss: "Don’t miss the presale!", buy: "Buy Tokens", about: "About FreeDogeAI", aboutdesc: "FreeDogeAI is a meme-powered token combining AI hype and the spirit of Dogecoin. Get in early and don’t miss the moon ride!", readwhite: "Download Whitepaper", community: "Join our community for updates" }, tr: { title: "FreeDogeAI Token Ön Satışı", connect: "Cüzdanı Bağla", notconnected: "Cüzdan bağlı değil", dontmiss: "Ön satışı kaçırma!", buy: "Token Satın Al", about: "FreeDogeAI Hakkında", aboutdesc: "FreeDogeAI, Dogecoin ruhu ve yapay zeka hype'ını birleştiren mizahi bir tokendir. Erken gir, roketi kaçırma!", readwhite: "Whitepaper'ı indir", community: "Topluluğumuza katılın" }, ar: { title: "عرض ما قبل البيع FreeDogeAI", connect: "اتصل بالمحفظة", notconnected: "المحفظة غير متصلة", dontmiss: "لا تفوت العرض المسبق!", buy: "شراء الرموز", about: "حول FreeDogeAI", aboutdesc: "FreeDogeAI هو رمز مستوحى من meme يجمع بين حماس الذكاء الاصطناعي وروح Dogecoin. كن من الأوائل!", readwhite: "تحميل الورقة البيضاء", community: "انضم إلى مجتمعنا للتحديثات" } // Diğer diller buraya eklenebilir };

languageSelect.addEventListener("change", () => { const selected = languageSelect.value; const items = document.querySelectorAll("[data-i18n]"); items.forEach(el => { const key = el.getAttribute("data-i18n"); if (translations[selected] && translations[selected][key]) { el.textContent = translations[selected][key]; } }); });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
