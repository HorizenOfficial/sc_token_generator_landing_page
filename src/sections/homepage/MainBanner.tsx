import React, { Dispatch } from "react"
import Modal from "react-modal"
import ContentContainer from "../../templates/ContentContainer"
import TokenmintButton, { TokenmintButtonStyle } from "../../components/Common/TokenmintButton"
import { shallowEqual, useSelector, useDispatch } from "react-redux"
import { AppState } from "../../types/AppState"
import DesktopOnlyModal from "../../components/DesktopOnlyModal"
import {
    OPEN_DESKTOP_ONLY_MODAL,
    CLOSE_MODALS
} from "../../store/actionTypes"

const MainBanner = () => {
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

    return (
        <ContentContainer>
            <section className="md:mt-44">
                <span className={`text-[52px] font-bold text-white leading-[58px]`}>
                    Quick and Easy Token
                    <br /> Launch for Anyone
                </span>

                <ul className="my-8 text-white text-lg list-disc marker:text-ZBF_green list-inside">
                    <li>No developer skills needed</li>
                    <li>Custom tokenomics</li>
                    <li>Fully transparent</li>
                </ul>

                <div className="md:hidden h-20">
                    <TokenmintButton
                        title="Launch app"
                        enabled
                        additionalClasses={ "px-5 py-[1em] absolute" }
                        style={ TokenmintButtonStyle.GREEN_BORDERED }
                        link={ process.env.REACT_APP_GENERATOR_URL! }
                        onClick={ (event : any) => { 
                            event.preventDefault()
                            dispatch({ type: OPEN_DESKTOP_ONLY_MODAL })
                        } }
                    />
                </div>

                <Modal
                        style={ {overlay: {background: "rgba(145, 149, 152, 0.15)"}} }
                        className="bg-transparent min-w-0 h-0"
                        isOpen={ appState.modalOpen }
                        shouldCloseOnOverlayClick
                >
                    <DesktopOnlyModal title="Launch App" onModalClose={ onDesktopOnlyModalClose } />
                </Modal>
            </section>
        </ContentContainer>
    )
}

export default MainBanner
