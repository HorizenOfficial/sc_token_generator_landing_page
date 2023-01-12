import axios from "axios"
import { delay, toMinimumUnits } from "../utils/Utils"
import { SCAPI } from "./explorer_types/SCAPI"
import { Balance, TokenchainAPI } from "./explorer_types/TokenchainAPI"
import { TransactionJSON } from "./explorer_types/Transaction"
import TokenType = SCAPI.TokenType

export async function getWalletAddress(isRetry?: boolean): Promise<string | undefined> {
    let horizen = (window as any).horizen
    if (!horizen) {
        await delay(100)
    }

    const connectedWallet = await (window as any).horizen?.getConnectedWallet()
    if (!connectedWallet) {
        if (isRetry) {
            return Promise.reject(undefined)
        } else {
            return getWalletAddress(true)
        }
    }

    if (connectedWallet !== "") {
        return Promise.resolve(connectedWallet as string)
    }

    return undefined
}

export async function sendCollectionDeclare(
    symbol: string,
    name: string,
    maxSupply: string,
    proposition: string,
    baseURI: string
): Promise<string | undefined> {
    return (window as any).horizen?.sendTokenDeclareTx(
        {
            symbol: symbol.toLocaleUpperCase(),
            name,
            precision: 0,
            tokenType: 2,
            currentSupply: 0,
            maxSupply: toMinimumUnits(maxSupply, 0),
            proposition,
            baseURI
        }
    )
        .then((response: any) => {
            if (response !== undefined && response !== "") {
                return Promise.resolve(response as string)
            }

            return Promise.reject(undefined)
        })
        .catch((error: any) => {
            return Promise.reject(error)
        }) ?? undefined
}

export async function sendTokenDeclare(
    symbol: string,
    name: string,
    precision: number,
    maxSupply: string,
    proposition: string,
    metadata: any,
    mintingFunction = true,
    burningFunction = true
): Promise<string | undefined> {
    return (window as any).horizen?.sendTokenDeclareTx(
        {
            symbol: symbol.toLocaleUpperCase(),
            name,
            precision,
            tokenType: 1,
            currentSupply: 0,
            maxSupply: maxSupply,
            proposition,
            metadata,
            mintingFunction,
            burningFunction
        }
    )
        .then((response: any) => {
            if (response !== undefined && response !== "") {
                return Promise.resolve(response as string)
            }

            return Promise.reject(undefined)
        })
        .catch((error: any) => {
            return Promise.reject(error)
        }) ?? undefined
}

export async function sendTokenMint(
    destinationAddress: string,
    tokenUuid: string,
    amount: string
): Promise<string | undefined> {
    return (window as any).horizen?.sendTokenMintTx(
        {
            to: destinationAddress,
            tokenUuid,
            amount: amount
        }
    )
        .then((response: any) => {
            if (response !== undefined && response !== "" && (response as string).includes("success")) {
                return Promise.resolve(response as string)
            }

            return Promise.reject(undefined)
        })
        .catch((error: any) => {
            return Promise.reject(error)
        }) ?? undefined
}

export async function sendNFTMint(
    destinationAddress: string,
    tokenUuid: string,
    serialNumber: number
): Promise<string | undefined> {
    return (window as any).horizen?.sendNftMintTx(
        {
            uuid: tokenUuid,
            tokenNonFungibleReceivers: [
                {
                    proposition: destinationAddress,
                    serialNumber
                }
            ]
        }
    )
        .then((response: any) => {
            if (response !== undefined && response !== "" && (response as string).includes("success")) {
                return Promise.resolve(response as string)
            }
            return Promise.reject(undefined)
        })
        .catch((error: any) => {
            return Promise.reject(error)
        }) ?? undefined
}

function parseTransaction(
    tx: any
): (SCAPI.Transaction & TransactionJSON) | undefined {
    switch (tx.typeName) {
        case SCAPI.SidechainTransactionsTypes.MainchainBlockReference:
        case SCAPI.SidechainTransactionsTypes.MC2SCAggregatedTransaction:
            return tx as unknown as TransactionJSON &
                SCAPI.MainchainTransaction
        case SCAPI.SidechainTransactionsTypes.SidechainCoreTransaction:
            return tx as unknown as TransactionJSON &
                SCAPI.Transaction
        case SCAPI.TokenChainTransactionTypes.TokenTypeDeclareTransaction:
            return tx as unknown as TransactionJSON &
                TokenchainAPI.TokenDeclareTransactionType
        case SCAPI.TokenChainTransactionTypes.TokenFungibleMintTransaction:
        case SCAPI.TokenChainTransactionTypes.TokenFungibleTransferTransaction:
        case SCAPI.TokenChainTransactionTypes.TokenFungibleBurn:
            return tx as unknown as TransactionJSON &
                TokenchainAPI.TokenTransactionType
        default:
            return undefined
    }
}

export async function getSingleToken(
    tokenUuid: string
): Promise<SCAPI.TokenBoxType | void> {
    return await (window as any).horizen.getToken(tokenUuid)
        .then((response: any) => {
            return Promise.resolve(
                response as SCAPI.TokenBoxType
            )
        })
        .catch((error: any) => {
            return Promise.reject(error)
        })
}

export async function getMyTokens(tokenType: TokenType): Promise<Array<SCAPI.TokenBoxType> | void> {
    return await (window as any).horizen.getGeneratedTokens()
        .then((response: any) => {
            return Promise.resolve(
                response
                    .filter((token: SCAPI.TokenBoxType) => {
                        return token.tokenType === tokenType
                    })
                    .map((b: any) => {
                        return b as unknown as SCAPI.TokenBoxType
                    })
            )
        })
        .catch((error: any) => {
            return Promise.reject(error)
        })
}

export async function getAllTokens(
    pageNum?: number,
    limit?: number
): Promise<[ tokens: Array<SCAPI.TokenBoxType>, totalPages: boolean ] | void> {
    return (window as any).horizen.getAllTokens(pageNum, limit)
        .then((response: any) => {
            return Promise.all([
                response.tokens.map((b: any) => {
                    return b as unknown as SCAPI.TokenBoxType
                }),
                response.pagesTotal
            ])
        })
        .catch((error: any) => {
            return Promise.reject(error)
        })
}

export async function getBalanceByAddress(): Promise<Array<Balance> | void> {
    return await (window as any).horizen.getBalance()
        .then((response: any) => {
            return Promise.all(response) as unknown as Array<Balance>
        })
        .catch((error: any) => {
            return Promise.reject(error)
        })
}

export async function getTransactionsByToken(
    uuid: string,
    pageNum?: number
): Promise<[ txs: Array<SCAPI.Transaction & TransactionJSON>, pagesTotal: number ] | void> {
    return await (window as any).horizen.getTokenTransactions(uuid, pageNum ?? 0)
        .then((response: any) => {
            return Promise.all([
                response.txs.map((tx: any) => parseTransaction(tx)),
                response.pagesTotal
            ])
        })
        .catch((error: any) => {
            return Promise.reject(error)
        })
}

export async function getTxFees(): Promise<{ tokenDeclareFee: number; tokenMintFee: number; NFTDeclareFee: number; NFTMintFee: number; }> {
    // TODO: Try catch to be removed once method is available in wallet prod
    try {
        return await (window as any).horizen.getTxFees()
            .then((response: any) => {
                return Promise.resolve(response)
            })
            .catch((error: any) => {
                return Promise.reject(error)
            })
    } catch (e) {
        throw new Error("Not existing method")
    }
}

export function getSidechainId() {
    return axios.get(process.env.REACT_APP_MAINCHAIN_URL!.concat(`/api/scinfo?onlyAlive=1`))
        .then((response: any) => {
            return response.data.items.filter((sc: any) => sc.customName && sc.customName.includes("TokenMint Chain"))[ 0 ].scid
        })
}

export async function getNFTs(collectionUuid?: string,
                              serialNumber?: string,
                              page?: number
): Promise<[ nfts: Array<SCAPI.TokenNonFungibleBoxType>, totalPages: number ] | void> {
    // TODO: Try catch to be removed once method is available in wallet prod
    try {
        // getNFTsByCollection is filtered by address
        return await (window as any).horizen.getNFTsByCollection(collectionUuid, serialNumber, page)
            .then((response: any) => {
                return Promise.all([
                    response.boxes.map((b: any) => {
                        return b as unknown as SCAPI.TokenNonFungibleBoxType
                    }),
                    response.pagesTotal
                ])
            })
            .catch((error: any) => {
                return Promise.reject(error)
            })
    } catch (e) {
        throw new Error("Not existing method")
    }
}

// Not filtered by address
export async function getAllCollections(collectionUuid?: string[], pageNum?: number
): Promise<Array<SCAPI.TokenBoxType> | void> {
    // TODO: Try catch to be removed once method is available in wallet prod
    try {
        return await (window as any).horizen.getAllCollections(collectionUuid, pageNum)
            .then((response: any) => {
                return response.map((b: any) => {
                    return b as unknown as SCAPI.TokenBoxType
                })
            })
            .catch((error: any) => {
                return Promise.reject(error)
            })
    } catch (e) {
        throw new Error("Not existing method")
    }
}

export async function getAllMyNFTs(): Promise<Array<any> | void> {
    let nftsPage = 0
    let needsToLoadMoreNFTs = true
    let addressNFTs: Array<SCAPI.TokenBoxType> = []

    while (needsToLoadMoreNFTs) {
        await getNFTs(undefined, undefined, nftsPage)
            .then((response: any) => {
                addressNFTs.push(...response[ 0 ])
                needsToLoadMoreNFTs = response[ 1 ] > nftsPage + 1
                nftsPage = nftsPage + 1
            })
            .catch((error) => {
                needsToLoadMoreNFTs = false
            })
    }

    return Promise.resolve(addressNFTs)
}

export async function getNetworkId(isRetry?: boolean): Promise<string> {
    let horizen = (window as any).horizen
    if (!horizen) {
        await delay(150)
    }
    const walletNetworkId = await (window as any).horizen?.getSelectedNetworkId()
    if (!walletNetworkId) {
        if (isRetry) {
            return Promise.reject(undefined)
        } else {
            return getNetworkId(true)}
    }

    return walletNetworkId;
}
