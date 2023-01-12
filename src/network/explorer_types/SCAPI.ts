import { MainchainHeader, SCSignature } from "./Block"
import { GenericProposition, Unlockers } from "./Box"

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace SCAPI {
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

    export interface Transaction extends ITransaction{
        unlockers?: Unlockers[];
        newBoxes?: NodeBox[];
    }

    export interface MainchainTransaction extends Transaction {
        mc2scTransactionsMerkleRootHash: string;
        mainchainBlockHash: string;
    }

    export type BlockJSON = {
        chain?: string
        network?: string
        hash?: string
        height?: number
        version?: number
        time?: number
        timeNormalized?: Date
        previousBlockHash?: string
        nextBlockHash?: string
        transactionCount?: number
        mainchainHeaders?: MainchainHeader[]
        txs?: string[]
        confirmations?: number
        parentBlockHash?: string
        sidechainTransactionsMerkleRootHash?: string
        ommersMerkleRootHash?: string
        ommersCumulativeScore?: number
        signature?: SCSignature
    }

    export type StatusJSON = {
        blocksNumber: number
        network: string
        currentSyncStatus: string
        startDate: string
        syncedBlocks: number
        lastBlockHashSynced: string
        lastBlockHeightSynced: number
    }

    // Tokens sidechain

    export type NodeBox = {
        id: string;
        typeName: string;
        nonce: string;
        proposition?: GenericProposition;
        vrfPubKey?: GenericProposition;
        blockSignProposition?: GenericProposition;
        value?: number;
    }

    export type TokenBoxType = NodeBox & {
        mintHeight: number;
        symbol: string;
        uuid: string;
        tokenType: TokenType;
        precision: number;
        currentSupply: bigint;
        maxSupply: bigint;
        owner: string;
        name: string
        metadata: Record<string, string>;
        baseURI: string | null
    }

    export type TokenFungibleBoxType = NodeBox & {
        uuid: string;
        tokenValue: bigint;
    }

    export type TokenNonFungibleBoxType = NodeBox & {
        uuid: string;
        serialNumber: string;
        presalePrice: bigint;
        updatableMetadata: string;
        metadata: string;
        version: number;
        proposition: GenericProposition;
    }

    export enum TokenType {
        Fungible = "Fungible",
        NonFungible = "NonFungible",
    }

    // Base explorer types

    export enum SidechainTransactionsTypes {
        MainchainBlockReference = "MainchainBlockReference",
        MC2SCAggregatedTransaction = "MC2SCAggregatedTransaction",
        SidechainCoreTransaction = "SidechainCoreTransaction",
    }

    export enum SidechainBoxTypes {
        ZenBox = "ZenBox",
        BackwardTransferBox = "BackwardTransferBox",
        ForgerBox = "ForgerBox",
        WithdrawalRequestBox = "WithdrawalRequestBox"
    }

    // Auditchain types

    export enum TokenChainTransactionTypes {
        TokenTypeDeclareTransaction = "TokenDeclare",
        TokenFungibleMintTransaction = "TokenFungibleMint",
        TokenFungibleTransferTransaction = "TokenFungibleTransfer",
        TokenFungibleBurn = "TokenFungibleBurn"
    }

    export enum TokenChainBoxTypes {
        Token = "Token",
        TokenFungible = "TokenFungible",
    }
}
