import React, { Dispatch, useEffect } from "react"
import { useLocation } from "react-router-dom"
// import generatorLogo from "../assets/generator_logo.svg"
import generatorLogo from "../assets/tokenmint-alpha.svg"
import walletIcon from "../assets/wallet_icon.svg"
import "../styles/Header.css"
import { walletStateDescriptor, WalletStatus } from "../types/WalletState"
import { detectRoute, URLProvider } from "../utils/URLProvider"
import NavLink from "./NavLink"
import { minimumUnitsToFormattedString, splitStringMiddle } from "../utils/Utils";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AppState, blurBackground } from "../types/AppState";
import { WALLET_CONNECTED_CLICK, WALLET_NOT_CONNECTED_CLICK } from "../store/actionTypes";
import { FeatureFlag, featureFlags, FeatureFlagType } from "../utils/FeatureFlags";
import { useQueryClient } from "react-query";
import ReactTooltip from "react-tooltip";
import { Constants } from "../utils/Constants";

const Header = () => {
    const location = useLocation()
    const route = detectRoute(location.pathname)

    const appState: AppState = useSelector(
            (state: AppState) => state,
            shallowEqual
    )

    const dispatch: Dispatch<any> = useDispatch()
    const queryClient = useQueryClient()

    useEffect(() => {
        if (appState.walletState.walletStatus === WalletStatus.NOT_CONNECTED) {
            queryClient.invalidateQueries("getBalanceByAddress");
            queryClient.invalidateQueries("getMyTokens");
            queryClient.invalidateQueries("getAllTokens");
        }
    }, [appState])

    const innerLink = (boldPaths: string[], text: string, link?: string, linkId?: string) => {
        const isActive = boldPaths.includes(route)
        if (link) {
            return (
                    <span
                            className={ " mx-6 h-full pt-4 font-bold text-lg" }>
                    <NavLink
                            className={ (isActive ? "active border-b-2 border-ZBF_green" : "").concat(" routerNavLink whitespace-nowrap") }
                            to={ link }>
                            { text }
                        </NavLink>
                </span>
            )
        } else {
            return (
                    <span
                            className={ `${ linkId } hover:cursor-pointer mx-6 h-full pt-4 font-bold text-lg routerNavLink whitespace-nowrap` }>
                    { text }
                </span>
            )
        }
    }

    const onWalletClick = () => {
        switch (appState.walletState.walletStatus) {
            case WalletStatus.NOT_CONNECTED:
                dispatch({
                    type: WALLET_NOT_CONNECTED_CLICK
                })
                try {
                    window.plausible("Connect Wallet")
                } catch (_) {
                }
                break
            case WalletStatus.CONNECTED:
                dispatch({
                    type: WALLET_CONNECTED_CLICK
                })
        }
    }

    const isSubdomain = () => {
        return window.location.host.split(".")[0] === process.env.REACT_APP_SUBDOMAIN
    }

    const tabFaqFeatureFlag: FeatureFlag | undefined = featureFlags().find((item) => item.flag === FeatureFlagType.TAB_FAQ)
    const nftFeatureFlag: FeatureFlag | undefined = featureFlags().find((item) => item.flag === FeatureFlagType.NFT_TAB)

    return (
            <header
                    className={ `${ blurBackground(appState) ? "blur-sm" : "" } z-10 w-full max-w-screen-xl mx-auto lg:h-20 h-40 px-8` }>
                <div className="lg:flex lg:justify-between grid min-w-full h-full">
                    <div className="grid h-20 pt-4 lg:mr-7 mr-12">
                        { isSubdomain() ? (
                                <a className="mr-6 my-auto"
                                   href={ process.env.REACT_APP_TOKENMINT_URL }>
                                    <img
                                            className="h-10 object-contain"
                                            src={ generatorLogo }
                                            alt="logo"
                                    />
                                </a>
                        ) : (
                                <NavLink className="mr-6 my-auto"
                                         to="/">
                                    <img
                                            className="h-10 object-contain"
                                            src={ generatorLogo }
                                            alt="logo"
                                    />
                                </NavLink>
                        ) }

                        <div className="lg:w-10/12 w-full flex max-w-[1200px]">
                        </div>
                    </div>
                    <div className="flex lg:justify-around absolute right-1/2 left-1/2 h-20 items-center py-2">
                        { innerLink(
                                ["/", URLProvider.URL_TOKEN_MINT, URLProvider.URL_TOKEN_BURN, URLProvider.URL_TOKEN_CREATOR],
                                "Tokens",
                                "/"
                        ) }
                        { nftFeatureFlag?.enabled
                                ? innerLink(
                                        [URLProvider.URL_NFTs, URLProvider.URL_COLLECTION_CREATOR, URLProvider.URL_NFT_MINT],
                                        "NFTs",
                                        URLProvider.URL_NFTs
                                )
                                : (
                                        <button
                                                className={ `${ [URLProvider.URL_NFTs].includes(route) ? "active" : "" } mx-6 pb-1 h-full font-bold text-base routerNavLink` }
                                                onClick={ () => {

                                                } }>
                                            <ReactTooltip
                                                    id="description"
                                                    effect="solid"
                                                    multiline
                                            />
                                            <span
                                                    className="font-bold"
                                                    data-tip="Coming soon"
                                                    data-for="description"
                                                    data-background-color="#101019"
                                            >NFTs
                                            </span>
                                        </button>
                                ) }
                        { tabFaqFeatureFlag?.enabled && innerLink(
                                [URLProvider.URL_FAQ],
                                "FAQ",
                                URLProvider.URL_FAQ
                        ) }
                    </div>
                    <div className="h-20 flex">
                        { appState.walletState.walletZENBalance && (
                                <span className="my-auto relative left-[0.25em] py-[0.6em] px-4 border border-[rgba(122,126,140,0.2)] rounded font-bold text-white bg-Hover_bckgrnd">
                                    { minimumUnitsToFormattedString(appState.walletState.walletZENBalance, Constants.ZENPrecision) }{ ` ${ Constants.ZENSymbol }` }
                                </span>
                        ) }

                        <button className="my-auto inline-flex rounded border border-[rgba(122,126,140,0.2)] bg-black hover:bg-Hover_bckgrnd p-2 z-10"
                                onClick={ onWalletClick }>
                        <span
                                className="font-bold text-base text-white my-auto mr-4 ml-3">{ splitStringMiddle(walletStateDescriptor(appState.walletState) ?? "", 20) }</span>
                            <img
                                    className="h-7 object-contain"
                                    src={ walletIcon }/>
                        </button>
                    </div>
                </div>
            </header>
    )
}

export default Header
