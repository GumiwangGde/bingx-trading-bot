# BingX Trading Bot - High-Performance Execution Tool

A professional-grade trading execution tool built with **Node.js** and **TypeScript**. This bot is designed for traders who require high-speed execution for managing multiple positions on the BingX Perpetual Futures (Demo/VST) market.

---

## 🚀 Key Features

- **High-Speed Execution**: Direct API integration for sub-second order placement and position management.
- **Panic Button (Close All)**: A specialized feature to instantly close all active positions, protecting capital during high market volatility.
- **Secure Authentication**: Implements HMAC-SHA256 digital signatures for every request to ensure data integrity and prevent unauthorized access.
- **DevSecOps Ready**: Built with environment isolation (`.env`), SSL/TLS handling, and strict IP Whitelisting protocols.
- **VST Demo Support**: Fully integrated with BingX Demo Trading for safe strategy testing.

---

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Communication**: Axios (REST API)
- **Security**: Crypto (HMAC-SHA256)
- **Configuration**: Dotenv

---

## 📋 Prerequisites

Before running the bot, ensure you have:
1. **Node.js** (v16 or higher)
2. **BingX API Key & Secret** (with Perpetual Futures permissions)
3. **Cloudflare WARP or VPN** (required if accessing from restricted regions like Indonesia)
4. **IP Whitelisted**: Ensure your public IP is registered in the BingX API Management dashboard.

---

## ⚙️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone [https://github.com/your-username/bingx-trading-bot.git](https://github.com/your-username/bingx-trading-bot.git)
   cd bingx-trading-bot

2. **Instal Dependecy**:
    ```bash
    npm install

3. **Configure Environment Variables: Create a .env file in the root directory:**
    BINGX_API_KEY=your_api_key_here
    BINGX_API_SECRET=your_api_secret_here