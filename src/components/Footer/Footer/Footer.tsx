import React from "react"
import { AppState, blurBackground } from "../../../types/AppState"
import { shallowEqual, useSelector } from "react-redux"
import ContentContainer from "../../../templates/ContentContainer"
import { getSidechainId } from "../../../network/APIRepository"
import { useQuery } from "react-query"
import { FeatureFlag, featureFlags, FeatureFlagType } from "../../../utils/FeatureFlags";

const Footer = () => {
    const appState: AppState = useSelector((state: AppState) => state, shallowEqual)

    const {data: scid, isLoading} = useQuery("scid", () => getSidechainId())
    const showSidechainIDFeatureFlag: FeatureFlag | undefined = featureFlags().find((item) => item.flag === FeatureFlagType.FOOTER_SIDECHAIN_ID)

    return (
        <footer
            id="footer"
            data-testid="footer"
            style={ {color: "white"} }
            className={ `${ blurBackground(appState) ? "blur-sm" : "" } bg-black border-t border-ZBF_green` }
        >
            <ContentContainer>
                <div className={ `${ showSidechainIDFeatureFlag?.enabled ? "flex" : "" } " py-2 items-center justify-center md:justify-between min-h-[3rem] text-Gray_text"` }>
                    { showSidechainIDFeatureFlag?.enabled && (
                        <div className="hidden md:block">
                            TokenMint Chain ID: { isLoading ? "Loading..." : scid }
                        </div>
                    ) }
                    <div className="text-Gray_text text-center my-6">
                        © { new Date().getFullYear() } TokenMint by Horizen. All rights reserved.{ " " }
                        <a className="text-ZBF_green" href="/terms">
                            <div>Legal</div>
                        </a>
                    </div>
                </div>
            </ContentContainer>
        </footer>
    )
}

export default Footer
