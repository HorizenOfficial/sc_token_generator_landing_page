import React, { Dispatch, useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import "../styles/Header.css"
import { detectRoute } from "../utils/URLProvider"
import NavLink from "./NavLink"
import TokenmintButton, { TokenmintButtonStyle } from "./Common/TokenmintButton"
import TokenmintAlphaLogo from "../assets/tokenmint-alpha.svg"
import { shallowEqual, useSelector, useDispatch } from "react-redux"
import { AppState } from "../types/AppState"
import {
    OPEN_NAV_DRAWER,
    CLOSE_NAV_DRAWER,
} from "../store/actionTypes";

const HeaderOnePager = () => {
    const location = useLocation()
    const route = detectRoute(location.pathname)
    const appState: AppState = useSelector(
        (state: AppState) => state,
        shallowEqual
    )
    const dispatch: Dispatch<any> = useDispatch()

    const blockExplorerUrl = useSelector((state:AppState)=>state.blockExplorerUrl)

    const innerLink = (boldPaths: string[], text: string, link?: string, linkId?: string, external?: boolean, newTab?: boolean, subtext?: string, additionalClasses?: string, disabled?: boolean) => {
        const isActive = boldPaths.includes(route)
        const defaultPaddings = link ? "pt-[1.1rem]" : "pt-4"
        const paddings = (additionalClasses?.includes("px") || additionalClasses?.includes("py") || additionalClasses?.includes("p-")) ? "" : defaultPaddings
        if (link) {
            return (
                <span className={ `block mx-6 h-full font-bold text-lg ${ additionalClasses ?? "" } ${ paddings }` }>
                    { external ? (
                        <a
                            className="text-Content_gray md:routerNavLink whitespace-nowrap"
                            target={ newTab ? "_blank" : "" }
                            href={ link }
                        >
                            { text }
                        </a>
                    ) : (
                            <NavLink
                                className={ (isActive ? "active border-b-2 border-ZBF_green" : "").concat(
                                        "routerNavLink whitespace-nowrap"
                                ) }
                                to={ link }
                            >
                                { text }
                                { subtext && (
                                    <span className={ "text-xs" }>{ subtext }</span>
                                ) }
                            </NavLink>
                    ) }
                </span>
            )
        } else {
            return (
                subtext ? (
                        <div 
                            className={ `${ linkId } mx-6 h-full font-bold text-lg whitespace-nowrap ${ additionalClasses ?? "" } ${ paddings } ${ disabled ? "text-Gray_text hover:cursor-not-allowed" : "hover:cursor-pointer routerNavLink" }` }
                        >
                            <div>{ text }</div>
                            { subtext && (
                                <div className={ "text-xs" }>{ subtext }</div>
                            ) }
                        </div>
                    ) :
                    <span
                        className={ `${ linkId } mx-6 h-full font-bold text-lg whitespace-nowrap ${ additionalClasses ?? "" } ${ paddings } ${ disabled ? "text-Gray_text hover:cursor-not-allowed" : "hover:cursor-pointer routerNavLink" }` }
                    >
                        {text}
                    </span>
            )
        }
    }

    return (
        <header className={ `max-w-screen-xl mx-auto h-32 lg:h-20 md:z-10 w-full` }>
            <div className="px-6 md:px-12 lg:px-8 xl:px-2 lg:justify-between flex min-w-full md:h-full">
                <div className="grid h-20 pt-4 lg:justify-around justify-between items-center lg:mr-7 mr-12">
                    <NavLink className="mr-6 my-auto" to="/">
                        <img className="h-10 object-contain" src={ TokenmintAlphaLogo } alt="logo"/>
                    </NavLink>
                    <div className="lg:w-10/12 w-full flex max-w-[1200px]"/>
                </div>
                <div className="sm:flex h-20 ml-auto">
                    <div className="hidden md:flex py-4 items-center">
                        <div className="md:flex lg:justify-around h-20 items-center py-2 mr-5">
                            { innerLink(["none"], "Cobalt Wallet", process.env.REACT_APP_WALLET_INSTALL!, undefined, true) }
                            { innerLink(["none"], "Block Explorer", blockExplorerUrl, undefined, true) }
                            {/*{ innerLink([URLProvider.URL_CONTACT], "Documentation", URLProvider.URL_CONTACT) }*/ }
                        </div>
                        <TokenmintButton
                                title="Launch app"
                                enabled
                                additionalClasses={ "px-5 py-[0.1em]" }
                                style={ TokenmintButtonStyle.GREEN_BORDERED }
                                link={ process.env.REACT_APP_GENERATOR_URL! }
                                onClick={ (event : any) => { 
                                    event.preventDefault()
                                    try {
                                        window.plausible("Launch App")
                                    } catch (_) {
                                    }
                                    window.location.href = process.env.REACT_APP_GENERATOR_URL!
                                } }
                        />
                    </div>
                    <div 
                        className=" md:hidden my-4 hover:cursor-pointer h-fit"
                        onClick={()=> {
                            appState.navDrawerOpen ? 
                                dispatch({ type: CLOSE_NAV_DRAWER }) : 
                                dispatch({ type: OPEN_NAV_DRAWER })
                        }}
                    >
                        <svg 
                            fill="white" 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 30 30" 
                            width="36" 
                            height="36"
                            className={`${ appState.navDrawerOpen ? "fill-ZBF_green" : "" } hover:fill-ZBF_green`}
                        >
                            <path 
                                d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            { appState.navDrawerOpen && (
                <div className="flex flex-col justify-center items-center relative z-10">
                    <div className="py-4 bg-Hover_bckgrnd text-center w-full">
                        { innerLink(["none"], "Cobalt Wallet", process.env.REACT_APP_WALLET_INSTALL!, undefined, true, undefined, undefined, "p-0") }
                    </div>
                    <div className="py-4 bg-Hover_bckgrnd text-center w-full">
                        { innerLink(["none"], "Block Explorer", blockExplorerUrl, undefined, true, undefined, undefined, "p-0") }
                    </div>
                    <div className="py-4 bg-Hover_bckgrnd text-center w-full">
                        { innerLink(["none"], "Launch App", undefined, undefined, true, undefined, 'Available only on desktop', "p-0", true) }
                    </div>
                </div>
            ) }
        </header>
    )
}

export default HeaderOnePager
