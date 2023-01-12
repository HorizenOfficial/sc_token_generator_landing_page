import { delay } from "../../utils/Utils"

export function getSidechainId() {
    return Promise.resolve("312d210ab35cc9ccba61efa4816efcd581b349eea0dc9df6c4b1a51b23f32eb4")
}

export async function getTxFees(delayed?: boolean) {
    if (delayed) {
        await delay(2000)
    }

    return Promise.resolve({
        tokenDeclareFee: 10,
        tokenMintFee: 0,
        NFTDeclareFee: 0.25,
        NFTMintFee: 0
    })
}