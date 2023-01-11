import { LocalStorageKey, removeItem, setItem } from "../components/Common/LocalStorageWrapper"
import {
    AppAction,
    AppState,
    RequestStatus,
    WalletConnectionAction,
    WalletConnectionErrorAction
} from "../types/AppState"
import { initialWalletState, WalletStatus } from "../types/WalletState"
import * as actionTypes from "./actionTypes"

const initialBlockExplorerUrl = process.env.REACT_APP_SIDECHAIN_URL!

export const initialState: AppState = {
    walletState: initialWalletState,
    tokenCreationStatus: RequestStatus.NOT_STARTED,
    tokenCreationError: undefined,
    blockExplorerUrl: initialBlockExplorerUrl,
    modalOpen: false,
    navDrawerOpen: false,
}

const reducer = (
    state: AppState = initialState,
    action: AppAction
): AppState => {
    switch (action.type) {
        case actionTypes.WALLET_CONNECTION_STARTED:
            return {
                ...state,
                walletState: {
                    ...state.walletState,
                    modalOpen: false,
                    walletError: undefined,
                    walletStatus: WalletStatus.CONNECTING
                },
                tokenCreationStatus: RequestStatus.CONNECTING,
                tokenCreationError: undefined,
                modalOpen: true
            }

        case actionTypes.WALLET_DISCONNECT_CLICK:
            removeItem(LocalStorageKey.IS_CONNECTED)
            return {
                ...state,
                walletState: {
                    ...state.walletState,
                    walletAddress: undefined,
                    walletZENBalance: undefined,
                    modalConnectedOpen: false,
                    walletStatus: WalletStatus.NOT_CONNECTED
                },
                blockExplorerUrl: initialBlockExplorerUrl
            }

        case actionTypes.WALLET_CONNECTION_SUCCESSFUL:
            const address = (action as WalletConnectionAction).walletAddress
            const blockExplorerUrl = (action as WalletConnectionAction).blockExplorerUrl
            const ZENBalance = (action as WalletConnectionAction).ZENBalance
            setItem(LocalStorageKey.IS_CONNECTED, "true")
            return {
                ...state,
                walletState: {
                    ...state.walletState,
                    modalOpen: false,
                    walletError: undefined,
                    walletAddress: address,
                    walletZENBalance: ZENBalance,
                    walletStatus: WalletStatus.CONNECTED
                },
                tokenCreationStatus: RequestStatus.NOT_STARTED,
                tokenCreationError: undefined,
                modalOpen: false,
                blockExplorerUrl
            }

        case actionTypes.WALLET_NOT_CONNECTED_CLICK:
            return {
                ...state,
                walletState: {
                    ...state.walletState,
                    modalOpen: true,
                    walletError: undefined
                },
                modalOpen: false
            }

        case actionTypes.WALLET_CONNECTED_CLICK:
            return {
                ...state,
                walletState: {
                    ...state.walletState,
                    modalConnectedOpen: true
                }
            }

        case actionTypes.WALLET_CONNECTION_ERROR:
            const error = (action as WalletConnectionErrorAction).error
            return {
                ...state,
                walletState: {
                    ...state.walletState,
                    modalOpen: true,
                    walletAddress: undefined,
                    walletZENBalance: undefined,
                    walletError: error,
                    walletStatus: WalletStatus.ERROR
                },
                tokenCreationStatus: RequestStatus.NOT_STARTED,
                tokenCreationError: undefined,
                modalOpen: false
            }

        case actionTypes.SHOW_MODAL_ERROR:
            const modalError = (action as WalletConnectionErrorAction).error
            return {
                ...state,
                walletState: {
                    ...state.walletState,
                    modalOpen: false,
                    walletAddress: undefined,
                    walletError: undefined,
                    walletStatus: WalletStatus.NOT_CONNECTED
                },
                tokenCreationStatus: RequestStatus.ERROR,
                tokenCreationError: modalError,
                modalOpen: true
            }


        case actionTypes.WALLET_CONNECTION_WINDOW_CLOSED:
            return {
                ...state,
                walletState: {
                    ...state.walletState,
                    modalOpen: false,
                    walletAddress: undefined,
                    walletZENBalance: undefined,
                    walletError: undefined,
                    walletStatus: WalletStatus.NOT_CONNECTED
                },
                tokenCreationStatus: RequestStatus.NOT_STARTED,
                tokenCreationError: undefined,
                modalOpen: false
            }

        case actionTypes.WALLET_MODAL_CLOSED:
            return {
                ...state,
                walletState: {
                    ...state.walletState,
                    modalOpen: false,
                    walletError: undefined
                },
                modalOpen: false
            }

        case actionTypes.WALLET_CONNECTED_LOADING:
            return {
                ...state,
                walletState: {
                    ...state.walletState,
                    walletStatus: WalletStatus.CONNECTING
                }
            }

        case actionTypes.WALLET_CONNECTED_MODAL_CLOSED:
            return {
                ...state,
                walletState: {
                    ...state.walletState,
                    modalConnectedOpen: false
                }
            }

        // TOKEN DECLARATION MODAL

        case actionTypes.TOKEN_DECLARATION_STARTED:
            return {
                ...state,
                walletState: {
                    ...state.walletState,
                    modalOpen: false,
                    walletError: undefined
                },
                tokenCreationStatus: RequestStatus.DECLARING_TOKEN,
                tokenCreationError: undefined,
                modalOpen: true
            }

        case actionTypes.TOKEN_DECLARATION_COMPLETED:
            return {
                ...state,
                walletState: {
                    ...state.walletState,
                    modalOpen: false,
                    walletError: undefined,
                    pendingTokenCreation: true,
                },
                tokenCreationStatus: RequestStatus.DECLARING_TOKEN_COMPLETED,
                tokenCreationError: undefined,
                modalOpen: true
            }

        case actionTypes.TOKEN_DECLARATION_CONFIRMED:
            return {
                ...state,
                walletState: {
                    ...state.walletState,
                    pendingTokenCreation: false
                }
            }

        // COLLECTION DECLARATION MODAL

        case actionTypes.COLLECTION_DECLARATION_STARTED:
            return {
                ...state,
                walletState: {
                    ...state.walletState,
                    modalOpen: false,
                    walletError: undefined
                },
                tokenCreationStatus: RequestStatus.DECLARING_COLLECTION,
                tokenCreationError: undefined,
                modalOpen: true
            }

        case actionTypes.COLLECTION_DECLARATION_COMPLETED:
            return {
                ...state,
                walletState: {
                    ...state.walletState,
                    modalOpen: false,
                    walletError: undefined,
                    pendingCollectionCreation: true
                },
                tokenCreationStatus: RequestStatus.DECLARING_COLLECTION_COMPLETED,
                tokenCreationError: undefined,
                modalOpen: true
            }

        case actionTypes.COLLECTION_DECLARATION_CONFIRMED:
            return {
                ...state,
                walletState: {
                    ...state.walletState,
                    pendingCollectionCreation: false
                }
            }

        case actionTypes.TOKEN_DECLARATION_MODAL_CLOSED:
        case actionTypes.TOKEN_MINT_MODAL_CLOSED:
        case actionTypes.TOKEN_BURN_MODAL_CLOSED:
            return {
                ...state,
                walletState: {
                    ...state.walletState,
                    walletError: undefined
                },
                modalOpen: false
            }

        // TOKEN MINT MODAL

        case actionTypes.TOKEN_MINT_STARTED:
            return {
                ...state,
                walletState: {
                    ...state.walletState,
                    modalOpen: false,
                    walletError: undefined
                },
                tokenCreationStatus: RequestStatus.MINTING_TOKEN,
                tokenCreationError: undefined,
                modalOpen: true
            }

        case actionTypes.TOKEN_MINT_COMPLETED:
            return {
                ...state,
                walletState: {
                    ...state.walletState,
                    modalOpen: false,
                    walletError: undefined
                },
                tokenCreationStatus: RequestStatus.MINTING_TOKEN_COMPLETED,
                tokenCreationError: undefined,
                modalOpen: true
            }

        // COLLECTION MINT MODAL

        case actionTypes.COLLECTION_MINT_STARTED:
            return {
                ...state,
                walletState: {
                    ...state.walletState,
                    modalOpen: false,
                    walletError: undefined
                },
                tokenCreationStatus: RequestStatus.MINTING_NFT,
                tokenCreationError: undefined,
                modalOpen: true
            }

        case actionTypes.COLLECTION_MINT_COMPLETED:
            return {
                ...state,
                walletState: {
                    ...state.walletState,
                    modalOpen: false,
                    walletError: undefined
                },
                tokenCreationStatus: RequestStatus.MINTING_NFT_COMPLETED,
                tokenCreationError: undefined,
                modalOpen: true
            }

        // TOKEN BURN MODAL

        case actionTypes.TOKEN_BURN_STARTED:
            return {
                ...state,
                walletState: {
                    ...state.walletState,
                    modalOpen: false,
                    walletError: undefined
                },
                tokenCreationStatus: RequestStatus.BURNING_TOKEN,
                tokenCreationError: undefined,
                modalOpen: true
            }

        case actionTypes.TOKEN_BURN_COMPLETED:
            return {
                ...state,
                walletState: {
                    ...state.walletState,
                    modalOpen: false,
                    walletError: undefined
                },
                tokenCreationStatus: RequestStatus.BURNING_TOKEN_COMPLETED,
                tokenCreationError: undefined,
                modalOpen: true
            }

        case actionTypes.CLOSE_MODALS:
            return {
                ...state,
                walletState: {
                    ...state.walletState,
                    modalOpen: false,
                    walletError: undefined
                },
                modalOpen: false
            }

        case actionTypes.OPEN_NAV_DRAWER:
            return {
                ...state,
                navDrawerOpen: true
            }

        case actionTypes.CLOSE_NAV_DRAWER:
            return {
                ...state,
                navDrawerOpen: false
            }

        case actionTypes.OPEN_DESKTOP_ONLY_MODAL:
            return {
                ...state,
                modalOpen: true
            }
    }

    return state
}

export default reducer