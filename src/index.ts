import { BingxService } from './services/bingx.service.ts';

const bingx = new BingxService();

async function runDemo() {
    try {
        const balance = await bingx.getBalance();
        console.log(`VST Balance: ${balance.data.balance.balance}`);

        console.log("\n--- Executing OPEN BUY ---");
        const order = await bingx.openOrder('BTC-USDT', 0.01);
        console.log("Order Placed Successfully:", order.data.orderId);

        console.log("\n--- Waiting 5 seconds before Closing All Positions ---");
        await new Promise(resolve => setTimeout(resolve, 5000));

        const closeResult = await bingx.closeAllPositions();
        console.log("All positions have been closed successfully!", closeResult);

    } catch (error: any) {
        console.error("Error:", error.response?.data || error.message);
    }
}

runDemo();