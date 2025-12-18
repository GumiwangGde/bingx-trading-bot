import axios from 'axios';
import { CONFIG } from '../config/index.config.ts';
import { createSignature } from '../utils/signature.util.ts';

export class BingxService {
    private async makeRequest(method: 'GET' | 'POST', endpoint: string, params: any) {
        const timestamp = Date.now();
        const fullParams = { ...params, timestamp };

        // Change object into string query
        const queryString = Object.entries(fullParams)
            .map(([key, val]) => `${key}=${val}`)
            .join('&');

        const signature = createSignature(queryString, CONFIG.API_SECRET);
        const url = `${CONFIG.BASE_URL}${endpoint}?${queryString}&signature=${signature}`;

        const response = await axios({
            method,
            url,
            httpsAgent: CONFIG.HTTPS_AGENT,
            headers: { 'X-BX-APIKEY': CONFIG.API_KEY }
        });

        return response.data;
    } 

    // Checking Futures (VST) account balance
    async getBalance() {
        return this.makeRequest('GET', '/openApi/swap/v2/user/balance', {});
    }

    // Opening a new position (BUY/LONG)
    async openOrder(symbol: string, quantity: number) {
        const params = {
            symbol,
            side: 'BUY',
            positionSide: 'LONG',
            type: 'MARKET',
            quantity
        };
        return this.makeRequest('POST', '/openApi/swap/v2/trade/order', params);
    }

    // Closing all positions
    async closeAllPositions() {
        const positionsResponse = await this.makeRequest('GET', '/openApi/swap/v2/user/positions', {});
        const positions = positionsResponse.data || [];

        if (positions.length === 0) return { message: "There are no active positions to close." }

        const results = [];
        
        for (const pos of positions) {
            const closeParams = {
                symbol: pos.symbol,
                side: pos.positionSide === 'LONG' ? 'SELL' : 'BUY',
                positionSide: pos.positionSide,
                type: 'MARKET',
                quantity: Math.abs(parseFloat(pos.positionAmt))
            }

            const res = await this.makeRequest('POST', '/openApi/swap/v2/trade/order', closeParams);
            results.push(res);
        }

        return results;
    }

    async batchCancelOrders(symbol: string, orderIds: string[]) {
        const params = {
            symbol: symbol,
            orderIds: orderIds.join(','),
        }

        try {
            console.log(`Starting batch cancel for ${orderIds.length} orders on ${symbol}...`);
            const response = await this.makeRequest('POST', '/openApi/swap/v2/trade/batchCancel', params);
            console.log("Batch Cancel Berhasil!");
            return response.data;
        } catch (error: any) {
            console.error("Failed Batch Cancel:");
            console.error(error.response?.data || error.message);
            throw error;
        }
    }
}