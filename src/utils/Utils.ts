import BigNumber from "bignumber.js"
import dateformat from "dateformat"
import { TransactionJSON } from "../network/explorer_types/Transaction"
import { SCAPI } from "../network/explorer_types/SCAPI"
import { Constants } from "./Constants"
import TokenChainTransactionTypes = SCAPI.TokenChainTransactionTypes

export enum DateFormat {
    MMMDDYYYYhhmmssa = "MMM DD, YYYY hh:mm:ss a",
    mmmddyyyyhhMMssTT = "mmm dd, yyyy hh:MM:ss TT",
    yyyymmdd = "yyyy-mm-dd",
}

export function getPreviousDate(date: Date): string {
    const tempDate = new Date(date)
    tempDate.setDate(date.getDate() - 1)
    return dateformat(tempDate, DateFormat.yyyymmdd, true)
}

export function getNextDate(date: Date): string {
    const tempDate = new Date(date)
    tempDate.setDate(date.getDate() + 1)
    return dateformat(tempDate, DateFormat.yyyymmdd, true)
}

export function formatNumberString(input: string | undefined): string {
    if (input === undefined || input === "") {
        return ""
    }
    return new BigNumber(input).toFormat()
}
// strictDecimals will show all of the decimals even if they're zeros: 0.100 won't be formatted to 0.1, will keep 0.100
export function minimumUnitsToFormattedString(input: any, precision: number, strictDecimals?: boolean): string {
    if (input === undefined || input === "") {
        return ""
    }
    const inputBigNumber = new BigNumber(input)
    return inputBigNumber.dividedBy(10 ** precision).toFormat(strictDecimals ? precision : undefined)
}

export function toMinimumUnits(input: string, precision: number): string {
    if (input === undefined || input === "") {
        return ""
    }
    const inputBigNumber = new BigNumber(input.replace(/,/g, ""))
    return inputBigNumber.multipliedBy(10 ** precision).toFixed()
}

export const delay = (ms: any) => new Promise((res) => setTimeout(res, ms))

export function boxesSums(
    tx: SCAPI.Transaction & TransactionJSON,
    inputSymbol?: string
): { output: bigint | undefined; symbol: string } {
    let symbol = Constants.ZENSymbol
    const zeroBigInt: bigint = 0n
    if (inputSymbol) {
        symbol = inputSymbol
    } else {
        tx.vin?.forEach((box: SCAPI.NodeBox) => {
            if ((box as any).symbol) {
                symbol = (box as SCAPI.TokenBoxType).symbol
            }
        })
    }

    let voutSummables: Array<BigNumber>
    switch (tx.typeName) {
        case SCAPI.SidechainTransactionsTypes.SidechainCoreTransaction:
            voutSummables =
                tx.vout
                    ?.filter((box: SCAPI.NodeBox) => {
                        return box.typeName === SCAPI.SidechainBoxTypes.WithdrawalRequestBox
                    })
                    .flatMap((box: any) => {
                        const boxFormatted = box as SCAPI.NodeBox
                        return new BigNumber(boxFormatted.value as any)
                    }) ?? []
            break
        case SCAPI.SidechainTransactionsTypes.MC2SCAggregatedTransaction:
            voutSummables =
                tx.vout
                    ?.filter((box: SCAPI.NodeBox) => {
                        return box.typeName === SCAPI.SidechainBoxTypes.ZenBox
                    })
                    .flatMap((box: any) => {
                        const boxFormatted = box as SCAPI.NodeBox
                        return new BigNumber(boxFormatted.value as any)
                    }) ?? []
            break
        case TokenChainTransactionTypes.TokenFungibleTransferTransaction:
            const addresses =
                tx.vin
                    ?.filter((box: SCAPI.NodeBox) => {
                        return box.typeName === SCAPI.TokenChainBoxTypes.TokenFungible
                    })
                    .flatMap((box: SCAPI.NodeBox) => {
                        return box.proposition?.publicKey
                    }) ?? []

            voutSummables =
                tx.vout
                    ?.filter((box: SCAPI.NodeBox) => {
                        return (
                            box.typeName === SCAPI.TokenChainBoxTypes.TokenFungible &&
                            !addresses.includes(box.proposition?.publicKey)
                        )
                    })
                    .flatMap((box: any) => {
                        const boxFormatted = box as SCAPI.TokenFungibleBoxType
                        return new BigNumber(boxFormatted.tokenValue as any)
                    }) ?? []
            break
        default:
            voutSummables =
                tx.vout
                    ?.filter((box: SCAPI.NodeBox) => {
                        return box.typeName === SCAPI.TokenChainBoxTypes.TokenFungible
                    })
                    .flatMap((box: any) => {
                        const boxFormatted = box as SCAPI.TokenFungibleBoxType
                        return new BigNumber(boxFormatted.tokenValue as any)
                    }) ?? []
    }

    const vinSummables: Array<BigNumber> =
        tx.vin
            ?.filter((box: SCAPI.NodeBox) => {
                return box.typeName === SCAPI.TokenChainBoxTypes.TokenFungible
            })
            .flatMap((box: any) => {
                const boxFormatted = box as SCAPI.TokenFungibleBoxType
                return new BigNumber(boxFormatted.tokenValue as any)
            }) ?? []

    const vinSum = vinSummables.reduce((a: BigNumber, b: BigNumber) => a.plus(b), new BigNumber(zeroBigInt as any))
    const voutSum = voutSummables.reduce((a: BigNumber, b: BigNumber) => a.plus(b), new BigNumber(zeroBigInt as any))

    let outputSubs
    switch (tx.typeName) {
        case SCAPI.TokenChainTransactionTypes.TokenFungibleBurn:
            outputSubs = vinSum.minus(voutSum)
            break
        case SCAPI.TokenChainTransactionTypes.TokenFungibleMintTransaction:
            outputSubs = voutSum.minus(vinSum)
            break
        case SCAPI.TokenChainTransactionTypes.TokenTypeDeclareTransaction:
            outputSubs = undefined
            break
        default:
            outputSubs = voutSum
    }

    return { output: (outputSubs?.toString() as any as bigint) ?? zeroBigInt, symbol: symbol }
}

export function getElapsedTime(date: Date): string {
    const startTime = new Date(date)
    const endTime = new Date()
    let timeDiff = (endTime.getTime() - startTime.getTime()) / 1000
    timeDiff = Math.floor(timeDiff / 60)

    const minutes = timeDiff % 60
    const minutesAsString = minutes < 10 ? "0".concat(minutes.toString()) : minutes.toString()
    timeDiff = Math.floor(timeDiff / 60)

    const hours = timeDiff % 24
    timeDiff = Math.floor(timeDiff / 24)

    const days = timeDiff
    const totalHours = hours + days * 24
    const totalHoursAsString = totalHours < 10 ? "0".concat(totalHours.toString()) : totalHours.toString()

    if (totalHoursAsString === "00") {
        return minutesAsString.concat(" minutes ago")
    }

    return totalHoursAsString.concat(" hours and ").concat(minutesAsString.toString()).concat(" minutes ago")
}

export function splitStringMiddle(input: string, maxCharacters: number): string {
    // There's no need to cut
    if (maxCharacters >= input.length) {
        return input
    }

    let beginning = input.substring(0, input.length / 2)
    let end = input.substring(input.length / 2, input.length)
    while (beginning.length + end.length + 3 > maxCharacters) {
        beginning = beginning.substring(0, beginning.length - 1)
        end = end.substring(1, end.length)
    }

    return beginning.concat("...").concat(end)
}

export function maxSupplyDisplay(maxSupply: any, precision: number) {
    return maxSupply.toString() === "0" ? "Unlimited" : minimumUnitsToFormattedString(maxSupply, precision)
}

export const quantityIsValid = (quantity: string | undefined) => {
    if (quantity) {
        const quantityBigNumber = new BigNumber(quantity)
        return quantityBigNumber.isLessThanOrEqualTo(Constants.MaxNumber)
    }
    return true
}

export const isValidURI = (baseURI?: string): boolean => {
    let baseURIIsValid = baseURI !== undefined && baseURI !== ""
    if (baseURIIsValid) {
        try {
            const finalBaseURI = new URL(baseURI!)
            baseURIIsValid = baseURIIsValid && finalBaseURI !== undefined
        } catch (e) {
            baseURIIsValid = false
        }
    }
    return baseURIIsValid
}

declare global {
    interface Window {
      plausible: any;
    }
  }