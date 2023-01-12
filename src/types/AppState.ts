import { WalletState } from "./WalletState"

export type AppState = {
    walletState: WalletState
    tokenCreationStatus: RequestStatus
    tokenCreationError?: string
    blockExplorerUrl: string
    modalOpen: boolean
    navDrawerOpen: boolean
}

export function blurBackground(state: AppState) {
    return state.modalOpen || state.navDrawerOpen || state.walletState.modalOpen || state.walletState.modalConnectedOpen
}

export type AppAction = {
    type: string
}

export type WalletConnectionAction = AppAction & {
    walletAddress: string
    blockExplorerUrl: string
    ZENBalance: string | undefined
}

export type WalletConnectionErrorAction = AppAction & {
    error: string
}

export type DispatchType = (args: AppAction) => AppAction

export enum RequestStatus {
    NOT_STARTED,
    ERROR,
    CONNECTING,
    DECLARING_TOKEN,
    DECLARING_TOKEN_COMPLETED,
    DECLARING_COLLECTION,
    DECLARING_COLLECTION_COMPLETED,
    MINTING_TOKEN,
    MINTING_TOKEN_COMPLETED,
    MINTING_NFT,
    MINTING_NFT_COMPLETED,
    BURNING_TOKEN,
    BURNING_TOKEN_COMPLETED,
}