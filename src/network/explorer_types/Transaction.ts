import { Constants } from "../../utils/Constants"
import { NodeBox, Unlockers } from "./Box"
import { SCAPI } from "./SCAPI"

export interface NodeTransaction {
    modifierTypeId: number;
    id: string;
    fee: number;
    newBoxes: NodeBox[];
    unlockers: Unlockers[];
    typeName: string;
}

export interface NodeMainchainBlockReferenceData extends NodeTransaction {
    mc2scTransactionsMerkleRootHash: string;
}

interface ITransaction {
    chain: string;
    network: string;
    blockHeight: number;
    blockHash?: string;
    blockTime?: Date;
    blockTimeNormalized?: Date;
    fee: number;
    inputCount: number;
    outputCount: number;
    typeName: string;
    modifierTypeId: number;
    txid: string;
}

export interface Transaction extends ITransaction {
    unlockers?: Unlockers[];
    newBoxes?: NodeBox[];
}

export interface MainchainTransaction extends Transaction {
    mc2scTransactionsMerkleRootHash: string;
    mainchainBlockHash: string;
}

export interface TransactionJSON extends ITransaction {
    vin?: NodeBox[];
    vout?: NodeBox[];
    confirmations?: number;
}

// Helper methods
type KnownToken = {
    symbol: string
    uuid: string
    precision: number
}

export function getTokenSymbolAndPrecision(transaction: TransactionJSON, knownTokens?: KnownToken[]): [ tokenSymbol: string | undefined, tokenPrecision: number ] {
    if (!transaction) {
        return [ undefined, Constants.ZENPrecision ]
    }
    if (transaction.vout) {
        const tokenTypeBox = transaction.vout.find((box: SCAPI.NodeBox) => {
            return box.typeName === SCAPI.TokenChainBoxTypes.Token
        })
        if (tokenTypeBox) {
            const tokenTypeBoxCast = tokenTypeBox as SCAPI.TokenBoxType
            return [ tokenTypeBoxCast.symbol, tokenTypeBoxCast.precision ]
        }

        const tokenFungibleTypeBox = transaction.vout.find((box: SCAPI.NodeBox) => {
            return box.typeName === SCAPI.TokenChainBoxTypes.TokenFungible
        })
        if (tokenFungibleTypeBox) {
            const filt = knownTokens?.filter((token: KnownToken) => {
                return token.uuid === (tokenFungibleTypeBox as SCAPI.TokenFungibleBoxType).uuid
            })
            if (filt && filt.length > 0) {
                return [ filt[ 0 ].symbol, filt[ 0 ].precision ]
            }
        }
    }

    return [ undefined, Constants.ZENPrecision ]
}