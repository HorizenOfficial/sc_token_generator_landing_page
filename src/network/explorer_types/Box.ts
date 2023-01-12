import { SCAPI } from "./SCAPI"

export interface Box {
    id: string;
    typeName: string;
    nonce: string;
    proposition: GenericProposition;
    value: number;
    chain: string;
    network: string;
    mintHeight: number;
    spendableAt: number;
    mintTxid: string;
    mintIndex: number;
    spentTxid?: string;
    spentHeight?: number;
    confirmations?: number;
    isCoinBox?: boolean;
}

export type NodeBox = {
    id: string;
    typeName: string;
    nonce: string;
    proposition?: GenericProposition;
    vrfPubKey?: GenericProposition;
    blockSignProposition?: GenericProposition;
    value?: number;
}

export type GenericProposition = {
    publicKey: string;
}
export type Unlockers = {
    boxKey: { signature: string };
    closedBoxId: string;
}