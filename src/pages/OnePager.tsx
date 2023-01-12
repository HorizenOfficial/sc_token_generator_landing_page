import React from "react"
import CobaltWallet from "../sections/homepage/CobaltWallet"
import FAQSection from "../sections/homepage/FAQSection"
import HowToCreateAToken from "../sections/homepage/HowToCreateAToken"
import MainBanner from "../sections/homepage/MainBanner"
import UserGuides from "../sections/homepage/UserGuides"
import TokenmintComponents from "../sections/homepage/TokenmintComponents"
import Roadmap from "../sections/homepage/Roadmap"

const OnePager = () => {
    return (
        <main>
            <MainBanner />
            <HowToCreateAToken />
            <TokenmintComponents />
            <CobaltWallet />
            <div
                className="bg-none md:bg-contain md:bg-center md:bg-no-repeat"
                style={{
                    backgroundImage: `url(${require("../assets/tokenmint_roadmap_secondary.png")})`,
                }}
            >
                <UserGuides />
                <Roadmap />
            </div>
            <FAQSection />
            <div className="absolute bg-ZBF_green opacity-40 blur-one-pager w-full h-48 -z-10" />
        </main>
    )
}

export default OnePager
