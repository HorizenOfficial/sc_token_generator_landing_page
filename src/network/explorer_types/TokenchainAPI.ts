import { Transaction } from "./Transaction"

export declare namespace TokenchainAPI {
    export interface TokenTransactionType extends Transaction {
        version: number;
    }

    export interface TokenDeclareTransactionType extends TokenTransactionType {
        tokenSymbol: string;
    }
}

export type Balance = {
    uuid: string
    balance: string
    symbol: string
    precision: number
};