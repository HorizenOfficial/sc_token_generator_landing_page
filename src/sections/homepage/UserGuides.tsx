import React from "react"
import { LinkRoundedBorderedBox } from "../../components/RoundedBorderedBoxes"
import ContentContainer from "../../templates/ContentContainer"
import { Constants } from "../../utils/Constants"

const UserGuides = () => {
    return (
        <ContentContainer>
            <section className="mb-24 md:mb-48">
                <div className={`text-center text-[38px] font-bold text-white mb-7`}>User Guides</div>
                <div className="grid md:grid-cols-2 auto-rows-fr xl:grid-cols-4 gap-[22px] text-white font-bold">
                    <LinkRoundedBorderedBox href="https://blog.horizen.io/cobalt-wallet-user-guide-2/">
                        Cobalt Wallet User Guide
                    </LinkRoundedBorderedBox>
                    <LinkRoundedBorderedBox href="https://blog.horizen.io/how-to-transfer-zen-from-sphere-to-cobalt-wallet/">
                        Sending ZEN to Cobalt
                    </LinkRoundedBorderedBox>
                    <LinkRoundedBorderedBox href="https://blog.horizen.io/create-a-token-on-tokenmint/">
                        Creating a Token
                    </LinkRoundedBorderedBox>
                    <LinkRoundedBorderedBox href="https://blog.horizen.io/how-to-create-and-mint-an-nft-on-tokenmint/">
                        Create NFT
                    </LinkRoundedBorderedBox>
                    <div className="hidden xl:block" />
                    <div className="col-span-2">
                        <LinkRoundedBorderedBox href={Constants.UserGuideUrl}>Full User Guide</LinkRoundedBorderedBox>
                    </div>
                </div>
            </section>
        </ContentContainer>
    )
}

export default UserGuides
