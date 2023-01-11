import React from "react"
import { useQuery } from "react-query"
import FAQItem from "../../components/FAQItem"
import { getSidechainId } from "../../network/APIRepository"
import ContentContainer from "../../templates/ContentContainer"
import { FeatureFlag, featureFlags, FeatureFlagType } from "../../utils/FeatureFlags"

const FAQSection = () => {
    const { data: scid, status } = useQuery("scid", getSidechainId)
    const showSidechainIDFeatureFlag: FeatureFlag | undefined = featureFlags().find(
        (item) => item.flag === FeatureFlagType.FOOTER_SIDECHAIN_ID
    )

    return (
        <ContentContainer>
            <section className="text-white pb-32 md:pb-44">
                <div className={`text-left text-[38px] font-bold break-normal`}>FAQ</div>
                {showSidechainIDFeatureFlag?.enabled && status !== "loading" && (
                    <FAQItem
                        question="What is the sidechain ID for the TokenMint platform?"
                        answer={<>The sidechain ID for TokenMint is {scid}.</>}
                    />
                )}
                <FAQItem
                    question="What blockchain does TokenMint run on?"
                    answer={<>TokenMint is a sidechain that runs on the Horizen public blockchain.</>}
                />
                <FAQItem
                    question="How secure is TokenMint?"
                    answer={
                        <>
                            TokenMint will go through a phased rollout to ensure security since the very beginning.
                            Horizen Labs will protect and limit the access to TokenMint nodes until the staked amount
                            will be enough to consider attacks unlikely to happen. At that point node operators will
                            strenghten security and decentralization.
                        </>
                    }
                />
                {/* <FAQItem
                    question="Is it free to create a token on TokenMint?"
                    answer={
                        <>
                            The Token Generator makes two transactions when creating a token, the new token declaration and minting. The new token transaction comes with a fee of 0.42 ZEN during the alpha phase to reduce non-serious participants.
                        </>
                    }
                /> */}
                <FAQItem
                    question="What type of token can I create on TokenMint?"
                    answer={
                        <>
                            You can create both fungible tokens and non-fungible tokens (NFTs) on the TokenMint network
                            currently. We are looking to support interoperability in the future.
                        </>
                    }
                />
                <FAQItem
                    question="What’s the maximum supply for my token?"
                    answer={
                        <>
                            There is no limit to the number of tokens you can create. You can create any fixed number of
                            tokens or an unlimited supply of tokens.
                        </>
                    }
                />
                <FAQItem
                    question="What tokens does the Cobalt wallet support?"
                    answer={
                        <>
                            Cobalt currently supports any fungible tokens and NFTs that are created on TokenMint, and
                            can support ZEN transfers from the Horizen mainchain via Sphere wallet for the purpose of
                            paying transaction fees.
                        </>
                    }
                />
                <FAQItem
                    question="Is there a mobile version of Cobalt?"
                    answer={<>Not yet. Cobalt is currently only available as a web browser extension.</>}
                />
            </section>
        </ContentContainer>
    )
}

export default FAQSection
