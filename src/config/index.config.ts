import * as dotenv from 'dotenv';
import * as https from 'https';

dotenv.config();

export const CONFIG = {
    API_KEY: process.env.BINGX_API_KEY || '',
    API_SECRET: process.env.BINGX_API_SECRET || '',
    BASE_URL: 'https://open-api-vst.bingx.com',
    HTTPS_AGENT: new https.Agent({ rejectUnauthorized: false }) 
};