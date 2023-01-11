import { SCAPI } from "./SCAPI"
import { NodeMainchainBlockReferenceData, NodeTransaction } from "./Transaction"
import Transaction = SCAPI.Transaction

export interface IBlock {
    chain: string;
    network: string;
    confirmations?: number;
    height: number;
    hash: string;
    time: Date;
    timeNormalized: Date;
    previousBlockHash: string;
    nextBlockHash: string;
    transactionCount: number;
    processed: boolean;
    header: BlockHeader;
}

export type Block = IBlock & {
    sidechainTransactions: Transaction[];
    mainchainTransactions: Transaction[];
    mainchainHeaders: MainchainHeader[];
    ommers: string[];
    timestamp: number;
    toBuffer: () => Buffer;
}

export type NodeBlock = {
    header: BlockHeader;
    sidechainTransactions: NodeTransaction[];
    mainchainBlockReferencesData: MainchainBlockReferencesData[];
    mainchainHeaders: MainchainHeader[];
    ommers: string[];
    timestamp: number;
    parentId: string;
    id: string;
}

export type BlockJSON = {
    chain?: string;
    network?: string;
    hash?: string;
    height?: number;
    version?: number;
    time?: number;
    timeNormalized?: Date;
    previousBlockHash?: string;
    nextBlockHash?: string;
    transactionCount?: number;
    mainchainHeaders?: MainchainHeader[];
    txs?: string[];
    confirmations?: number;
    parentBlockHash?: string,
    sidechainTransactionsMerkleRootHash?: string;
    ommersMerkleRootHash?: string;
    ommersCumulativeScore?: number;
    signature?: SCSignature;
}

export type BlockHeader = {
    version: number;
    parentId: string;
    timestamp: number;
    forgingStakeInfo: ForgingStakeInfo;
    forgingStakeMerklePath: string;
    vrfProof: { vrfProof: string };
    sidechainTransactionsMerkleRootHash: string;
    mainchainMerkleRootHash: string;
    ommersMerkleRootHash: string;
    ommersCumulativeScore: number;
    signature: SCSignature;
    id: string;
}

export type ForgingStakeInfo = {
    blockSignPublicKey: { publicKey: string };
    vrfPublicKey: { publicKey: string };
    stakeAmount: number;
}

export type SCSignature = {
    signature: string;
    typeName?: string
}

export type MainchainBlockReferencesData = {
    headerHash: string;
    sidechainRelatedAggregatedTransaction?: NodeMainchainBlockReferenceData
    mProof?: string[]
    proofOfNoData?: string []
}

export type MainchainHeader = {
    version: number;
    hashPrevBlock: string;
    hashMerkleRoot: string;
    hashScTxsCommitment: string;
    time: number;
    bits: number;
    nonce: string;
    solution: string;
    hash: string;
}
