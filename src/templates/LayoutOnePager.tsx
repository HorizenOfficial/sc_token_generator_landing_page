import React from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Helmet } from "react-helmet"
import AppFooter from "../components/AppFooter"
import Footer from "../components/Footer/Footer/Footer"
import HeaderOnePager from "../components/HeaderOnePager"
import contactBackground from "../assets/contact_background.svg"
import onepagerBackground from "../assets/onepager_background.svg"
import onepagerBackgroundVideo from "../assets/videos/onepager_background_video.mp4"
import { detectRoute } from "../utils/URLProvider"
import SkinnyBanner from "../components/SkinnyBanner"
import { shallowEqual, useSelector } from "react-redux"
import { AppState, blurBackground } from "../types/AppState"

const LayoutOnePager: React.FC<{children?: any}> = ({children}) => {
    const location = useLocation()
    const route = detectRoute(location.pathname)
    const appState: AppState = useSelector(
        (state: AppState) => state,
        shallowEqual
    )

    const backgroundImage = () => {
        switch (route) {
            case "/":
                return (
                    <video
                        src={ onepagerBackgroundVideo }
                        loop
                        autoPlay
                        muted
                        poster={ onepagerBackground }
                        className="hidden md:block absolute w-full h-[42em] object-contain"
                    />
                )
            default:
                return (
                    <img
                        src={ contactBackground }
                        className="absolute w-full h-[42em] object-cover"
                        alt="tokenmint background"
                    />
                )
        }
    }

    const bannerEnabled = process.env?.REACT_APP_WARNING_BANNER_VISIBLE === "true"

    return (
        <div className="bg-Main_bckgrnd min-h-[100vh] flex flex-col">
            { backgroundImage() }
            { bannerEnabled && (
                <SkinnyBanner/>
            ) }
            <div className={ `${ blurBackground(appState) && appState.modalOpen ? "blur-sm" : ""} md:z-10`}>
                <HeaderOnePager/>
                <div className={ `${ blurBackground(appState) && appState.navDrawerOpen ? "blur-sm" : "" } md:z-10`}>
                    <Helmet>
                        <script
                        defer
                        data-domain={process.env.REACT_APP_PLAUSIBLE}
                        src="https://plausible.io/js/plausible.js"
                        ></script>
                    </Helmet>
                    { children }
                    <Outlet/>
                </div>
                <AppFooter/>
                <Footer/>
            </div>
        </div>
    )
}

export default LayoutOnePager
