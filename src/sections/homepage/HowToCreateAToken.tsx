import React, { useState, useEffect, Dispatch } from "react"
import Modal from "react-modal"
import { IconWithTitleAndDescriptionRoundedBorderedBox } from "../../components/RoundedBorderedBoxes"

import CobaltWalletLogo from "../../assets/homepage/cobalt-wallet-logo.svg"
import ZenSymbol from "../../assets/homepage/zen-symbol.svg"
import LaunchToken from "../../assets/homepage/launch-token.png"
import ContentContainer from "../../templates/ContentContainer"
import { shallowEqual, useSelector, useDispatch } from "react-redux"
import { AppState } from "../../types/AppState"
import {
    OPEN_DESKTOP_ONLY_MODAL,
    CLOSE_MODALS
} from "../../store/actionTypes"
import DesktopOnlyModal from "../../components/DesktopOnlyModal"

const HowToCreateAToken = () => {
    const [isMobile, setIsMobile] = useState(false)
    const appState: AppState = useSelector(
        (state: AppState) => state,
        shallowEqual
    )
    const dispatch: Dispatch<any> = useDispatch()

    const onDesktopOnlyModalClose = () => {
        dispatch({
            type: CLOSE_MODALS
        })
    }

    useEffect(() => {
        const handleResize = () => {
            // tailwind 'md' = 768px
            window.innerWidth < 768 ? setIsMobile(true) : setIsMobile(false)
        }
        handleResize()
        window.addEventListener("resize", handleResize)
    }, [])

    return (
            <ContentContainer>
                <section className="mt-20 md:mt-60">
                    <div className={ `text-center text-[38px] font-bold text-white mb-8` }>How To Create A Token</div>
                    <div className="grid lg:grid-cols-3  gap-7">
                        <IconWithTitleAndDescriptionRoundedBorderedBox
                                icon={ <img src={ CobaltWalletLogo } alt="Cobalt Wallet" width={ 60 } height={ 60 }/> }
                                link={ process.env.REACT_APP_WALLET_INSTALL }
                                newTab
                                title="Download Cobalt Wallet"
                                description="Install the wallet and create a TokenMint address."
                        />
                        <IconWithTitleAndDescriptionRoundedBorderedBox
                                icon={ <img src={ ZenSymbol } alt="Zen Symbol" width={ 60 } height={ 60 }/> }
                                link={ "https://blog.horizen.io/how-to-transfer-zen-from-sphere-to-cobalt-wallet/" }
                                newTab
                                title="Fuel Your Cobalt Wallet"
                                description="ZEN is used as gas for making transactions."
                        />
                        <IconWithTitleAndDescriptionRoundedBorderedBox
                                icon={ <img src={ LaunchToken } alt="Launch Token" width={ 60 } height={ 60 }/> }
                                link={ process.env.REACT_APP_GENERATOR_URL! }
                                title="Launch Your Token"
                                description="Connect your Cobalt wallet and create a token."
                                customClickHandler={ (event : any) => { 
                                    if (isMobile) {
                                        event.preventDefault()
                                        dispatch({ type: OPEN_DESKTOP_ONLY_MODAL })
                                    }
                                } }
                        />
                    </div>
                    <Modal
                            style={ {overlay: {background: "rgba(145, 149, 152, 0.15)"}} }
                            className="bg-transparent min-w-0 h-0"
                            isOpen={ appState.modalOpen }
                            shouldCloseOnOverlayClick
                    >
                        <DesktopOnlyModal title="Launch Your Token" onModalClose={ onDesktopOnlyModalClose } />
                    </Modal>
                </section>
            </ContentContainer>
    )
}

export default HowToCreateAToken
