// script.js — FreeDogeAI Token Satış Sistemi
let provider, signer, userAddress;
const CONTRACT_ADDRESS = "0xd924e01c7d319c5b23708cd622bd1143cd4fb360"; // BNB gönderilecek adres
const TOKEN_CONTRACT = "0x45583DB8b6Db50311Ba8e7303845ACc6958589B7"; // FDAI Token adresi
const TOKEN_PRICE = 12500000; // 1 BNB = 12.5M FDAI
const MIN_BNB = 0.035; // Minimum satın alma miktarı
const EXPECTED_CHAIN_ID = 56; // Binance Smart Chain (mainnet)

// Akıllı sözleşme ABI'si
const CONTRACT_ABI = [
  "function buyTokens() public payable"
];

// Mobil cihaz kontrolü
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// DOM elemanlarını kontrol eden yardımcı fonksiyon
function getElement(id) {
  const element = document.getElementById(id);
  if (!element) console.error(`Eleman bulunamadı: ${id}`);
  return element;
}

// MetaMask bağlantısı
async function connectMetaMask() {
  try {
    // Mobil cihazda MetaMask bağlantısı
    if (isMobile) {
      console.log("Mobil cihaz tespit edildi, MetaMask kontrolü yapılıyor...");
      if (!window.ethereum || !window.ethereum.isMetaMask) {
        console.log("Mobil cihazda MetaMask algılanamadı.");
        alert("To connect with MetaMask, please...
