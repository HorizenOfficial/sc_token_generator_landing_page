import React from "react"
import TokenmintButton, { TokenmintButtonStyle } from "../../components/Common/TokenmintButton"

import CobaltWalletImg from "../../assets/homepage/cobalt-wallet.png"
import ContentContainer from "../../templates/ContentContainer"

const CobaltWallet = () => {
    return (
        <ContentContainer>
            <section className="grid md:grid-cols-2 gap-20 my-24 md:my-48">
                <div className="lg:mt-14">
                    <div className={ `text-left text-[38px] font-bold text-white` }>Cobalt Wallet</div>
                    <div className={ `text-left text-lg text-Gray_text mt-6 max-w-[556px]` }>
                        Cobalt Wallet allows you to mint and manage your tokens directly from your web browser.
                        Cobalt
                        is available on all chromium based browsers.
                    </div>
                    <div className="mt-6 inline-flex">
                        <TokenmintButton
                            title="Download Cobalt"
                            enabled
                            style={ TokenmintButtonStyle.GREEN_BORDERED }
                            link={ process.env.REACT_APP_WALLET_INSTALL }
                            newTab
                            additionalClasses={"px-7 py-[0.1em] leading-10"}
                        />
                    </div>
                </div>
                <div className="flex lg:block items-center">
                    <img src={ CobaltWalletImg } alt="Cobalt Wallet"/>
                </div>
            </section>
        </ContentContainer>
    )
}

export default CobaltWallet
