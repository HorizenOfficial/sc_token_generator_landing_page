import React from "react"
import generatorIcon from "../../assets/onepager_generator_icon.svg"
import explorerIcon from "../../assets/onepager_explorer_icon.svg"
import walletIcon from "../../assets/wallet_icon.svg"
import doubleArrow from "../../assets/arrow_double.png"
import blockchains from "../../assets/onepager_blockchains.svg"
import ContentContainer from "../../templates/ContentContainer"

const TokenmintComponents = () => {
    const component = (image: string, title: string, subtitle: string, smallerImage?: boolean) => {
        return (
                <div className="w-[28%]">
                    <div className="grid w-16 h-16 md:w-28 md:h-28 mx-auto bg-Hover_bckgrnd">
                        <svg viewBox="0 0 100 100">
                            <path d="M25,2 L2,2 L2,25" fill="none" stroke="#26DB8D" strokeWidth="1"/>
                            <path d="M2,75 L2,98 L25,98" fill="none" stroke="#26DB8D" strokeWidth="1"/>
                            <path d="M75,98 L98,98 L98,75" fill="none" stroke="#26DB8D" strokeWidth="1"/>
                            <path d="M98,25 L98,2 L75,2" fill="none" stroke="#26DB8D" strokeWidth="1"/>
                        </svg>
                        <img src={ image } className={ `h-8 w-8 ${ smallerImage ? "md:h-16 md:w-16" : "md:h-20 md:w-20" } mx-auto mb-[1em] ${ smallerImage && "md:mb-[1.5em]" }` } alt="Tokenmint component" />
                    </div>
                    <p className="text-white font-bold text-sm mt-6">{ title }</p>
                    <p className="text-Content_gray text-sm mt-1">{ subtitle }</p>
                </div>
        )
    }
    return (
            <ContentContainer>
                <section className="mt-20 md:mt-40">
                    <div className={ `text-center text-[38px] font-bold text-white mb-10` }>TokenMint Platform Structure
                    </div>
                    <div className="flex md:w-1/2 text-center mx-auto">
                        { component(generatorIcon, "Token Generator", "Create new token") }
                        <img className="w-[8%] object-contain mb-[6.5em]" src={ doubleArrow } alt="" />
                        { component(walletIcon, "Cobalt Wallet", "Mint, store, manage and transact tokens created on TokenMint", true) }
                        <img className="w-[8%] object-contain mb-[6.5em]" src={ doubleArrow } alt="" />
                        { component(explorerIcon, "TokenMint Block Explorer", "Display and track all transactions on TokenMint") }
                    </div>
                    <img className="mt-4 md:w-2/3 mx-auto" src={ blockchains } alt="" />
                    <div className="absolute left-0 bg-Gray_text blur-layout opacity-60 w-full h-24 mt-[-6em]"/>
                </section>
            </ContentContainer>
    )
}

export default TokenmintComponents
