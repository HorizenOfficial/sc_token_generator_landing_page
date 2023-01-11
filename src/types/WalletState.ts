export enum WalletStatus {
    NOT_EXISTING,
    NOT_CONNECTED,
    CONNECTING,
    CONNECTED,
    ERROR
}

export type WalletState = {
    modalOpen: boolean
    modalConnectedOpen: boolean
    walletAddress: string | undefined
    walletZENBalance: string | undefined
    walletError: string | undefined
    walletStatus: WalletStatus
    pendingTokenCreation: boolean
    pendingCollectionCreation: boolean
}

export function walletStateDescriptor(state: WalletState): string {
    switch (state.walletStatus) {
        case WalletStatus.NOT_EXISTING:
        case WalletStatus.NOT_CONNECTED:
            return "Connect Wallet"
        case WalletStatus.CONNECTING:
            return "Connecting Wallet"
        case WalletStatus.CONNECTED:
            return state.walletAddress!
        default:
            return ""
    }
}

export const initialWalletState: WalletState = {
    modalOpen: false,
    modalConnectedOpen: false,
    walletAddress: undefined,
    walletZENBalance: undefined,
    walletError: undefined,
    walletStatus: WalletStatus.NOT_CONNECTED,
    pendingTokenCreation: false,
    pendingCollectionCreation: false
}