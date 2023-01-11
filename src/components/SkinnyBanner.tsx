import React from "react"
import ContentContainer from "../templates/ContentContainer"
import { AppState, blurBackground } from "../types/AppState";
import { shallowEqual, useSelector } from "react-redux";

const SkinnyBanner = () => {
    const appState: AppState = useSelector((state: AppState) => state, shallowEqual)
    return (
            <div className={ `${ blurBackground(appState) ? "blur-sm" : "" } border-b border-ZBF_green min-h-[3rem] z-10 text-white flex justify-center items-center text-base font-bold bg-[#26db8d4D]` }>
                <ContentContainer alignText="center">
                    <span>
                        { process.env.REACT_APP_WARNING_BANNER_TEXT ?? "" }
                        { process.env.REACT_APP_WARNING_BANNER_LINK && (
                                <a className="text-ZBF_green"
                                target={ "_blank" }
                                href={ process.env.REACT_APP_WARNING_BANNER_LINK }> { process.env.REACT_APP_WARNING_BANNER_LINK_TEXT ?? "" }</a>
                        ) }
                    </span>
                </ContentContainer>
            </div>
    )
}

export default SkinnyBanner