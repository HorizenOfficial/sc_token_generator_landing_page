import { BigNumber } from 'bignumber.js';

const BLOCK_EXPLORER_PROD = "https://explorer.tokenmint.global";
const BLOCK_EXPLORER_TESTNET = "https://explorer-testnet.tokenmint.global";
const BLOCK_EXPLORER_TESTNET_DEV = "https://explorer-testnet-dev.tokenmint.global";


export class Constants {
    public static ZENSymbol = "ZEN"
    public static ZENPrecision = 8
    // 115792089237316195423570985008687907853269984665640564039457584007913129639936
    public static MaxNumber = new BigNumber(2**256 - 1)
 
    public static BLOCK_EXPLORER_NETWORK_MAP = {
        "1" : BLOCK_EXPLORER_PROD,
        "2" : BLOCK_EXPLORER_TESTNET,
        "3" : BLOCK_EXPLORER_TESTNET_DEV
    }

    public static UserGuideUrl = "https://downloads.horizen.io/file/web-assets/Tokenmint_Platform_User_Guide_v1.0.pdf";
}