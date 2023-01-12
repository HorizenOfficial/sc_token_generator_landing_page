import React from "react"
import closeIcon from "../assets/close_icon.png"
import warningIcon from "../assets/warning_sign.svg"
import { shallowEqual, useSelector } from "react-redux";
import { AppState } from "../types/AppState";

export type DesktopOnlyModalProps = {
    onModalClose: () => void
    title?: string
}

const DesktopOnlyModal: React.FC<DesktopOnlyModalProps> = (
        {
            onModalClose,
            title
        }
) => {

    const appState: AppState = useSelector(
            (state: AppState) => state,
            shallowEqual
    )

    return (
            <div
                className={ `${ appState.modalOpen ? "block" : "hidden" } bg-Hover_bckgrnd grid text-center pb-8 pt-6 relative mx-auto top-[10vh]` }>
                <button className="absolute top-6 right-6 w-8 h-8" onClick={ onModalClose }>
                    <img src={ closeIcon } className="object-contain" alt="" />
                </button>
                <img src={ warningIcon } className="w-16 h-16 mx-auto mb-4" alt="" />
                <span className="text-3xl font-bold text-white">{title}</span>
                <div className="text-Gray_text">Not available on mobile</div>
                <span className="text-normal text-Content_gray mt-10 bg-Main_bckgrnd mx-6 px-6 py-4">Please connect via desktop</span>
            </div>
    )
}

export default DesktopOnlyModal