import React from "react";
import createToken from "../assets/dashboard_button_create.png"
import mintToken from "../assets/dashboard_button_mint.png"
import airdropToken from "../assets/dashboard_button_airdrop.png"
import burnToken from "../assets/dashboard_button_burn.png"
import getTZEN from "../assets/dashboard_button_getZen.png"


export enum DashboardButtonType {
    CREATE_TOKEN,
    MINT_TOKEN,
    AIRDROP,
    BURN_TOKEN,

    CREATE_COLLECTION,
    MINT_NFT,

    GET_TZEN,
}

const DashboardButton: React.FC<{ type: DashboardButtonType, onClick: () => void }> = ({type, onClick}) => {
    let title: string
    let subtitle: string
    let image: string
    switch (type) {
        case DashboardButtonType.CREATE_TOKEN:
            title = "Create token"
            subtitle = "Create your own personal or community token."
            image = createToken
            break
        case DashboardButtonType.MINT_TOKEN:
            title = "Mint token"
            subtitle = "Mint new supply of your token."
            image = mintToken
            break
        case DashboardButtonType.AIRDROP:
            title = "Airdrop"
            subtitle = "Distribute your token."
            image = airdropToken
            break
        case DashboardButtonType.BURN_TOKEN:
            title = "Burn token"
            subtitle = "Reduce your token's overall supply."
            image = burnToken
            break
        case DashboardButtonType.CREATE_COLLECTION:
            title = "Create collection"
            subtitle = "Create your own personal or community collection"
            image = createToken
            break
        case DashboardButtonType.MINT_NFT:
            title = "Mint NFT"
            subtitle = "Mint an NFT as part of your collection"
            image = mintToken
            break
        case DashboardButtonType.GET_TZEN:
            title = "Get tZEN"
            subtitle = "Get some testnet ZEN to try out TokenMint."
            image = getTZEN
            break
    }

    return (
            <button className="grid mx-auto md:flex bg-Hover_bckgrnd rounded border border-[rgba(122,126,140,0.2)] hover:border-ZBF_green px-4 py-6"
                    onClick={ onClick }>
                <img className="w-[60px] h-[60px] my-auto object-contain mr-4" src={ image }/>
                <div className="grid">
                    <span className="text-white font-bold text-2xl text-left">{ title }</span>
                    <span className="text-Gray_text text-normal text-left">{ subtitle }</span>
                </div>
            </button>
    )
}

export default DashboardButton