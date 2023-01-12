import React from "react"
import { Link } from "../../types/Link"
import { Constants } from "../../utils/Constants"
import LinksGroup from "./LinksGroup"

const Links = () => {
    const categoryNames: {
        [index: string]: string
    } = {
        about: "About",
        documentation: "Documentation",
    }

    const linksData: {
        [index: string]: Link[]
    } = {
        about: [
            {
                label: "Horizen",
                href: "https://www.horizen.io",
                openNewTab: true,
            },
            {
                label: "Horizen Labs",
                href: "https://horizenlabs.io",
                openNewTab: true,
            },
            {
                label: "Zendoo",
                href: "https://www.horizen.io/zendoo",
                openNewTab: true,
            },
            {
                label: "Sphere by Horizen",
                href: "https://www.horizen.io/spherebyhorizen",
                openNewTab: true,
            },
        ],
        documentation: [
            {
                label: "TokenMint",
                href: `${ Constants.UserGuideUrl }`,
                openNewTab: true,
            },
        //     {
        //         label: "Cobalt Wallet",
        //         href: process.env.REACT_APP_WALLET_INSTALL!,
        //         openNewTab: true,
        //     },
        //     {
        //         label: "Sphere by Horizen",
        //         href: "https://www.horizen.io/spherebyhorizen",
        //         openNewTab: true,
        //     },
        ],
    }

    return (
            <div className="flex w-full md:w-fit md:grid md:grid-cols-2 md:space-x-2 lg:space-x-12">
                { Object.keys(linksData).map((linkCategory, i) => {
                    return (
                        <div className="mr-auto md:mr-0">
                            <LinksGroup title={ categoryNames[linkCategory] } links={ linksData[`${ linkCategory }`] } key={i}/>
                        </div>
                    )
                }) }
            </div>
    )
}

export default Links
