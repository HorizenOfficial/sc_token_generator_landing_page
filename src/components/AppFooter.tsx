import React from "react"
import generatorLogo from "../assets/generator_logo.svg"
import FooterSubheading from "./Footer/FooterSubheading"
import Links from "./Footer/Links"
import SocialNetworks from "./SocialNetworks"
import { shallowEqual, useSelector } from "react-redux"
import { AppState, blurBackground } from "../types/AppState"
import { IconRoundedBorderedBox } from "./RoundedBorderedBoxes"
import ContentContainer from "../templates/ContentContainer"

const DiscordBox = () => {
    return (
            <a href="/">
                <IconRoundedBorderedBox
                        small
                        icon={
                            <svg
                                    width="31"
                                    className="w-[60px]"
                                    height="22"
                                    viewBox="0 0 31 22"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                        d="M26.7028 2.74754C24.6055 1.09005 22.0523 0.130542 19.3941 0.000918297L19.0287 0.423495C21.4058 1.04871 23.6223 2.18357 25.5281 3.75116C23.0916 2.41484 20.4245 1.56319 17.6713 1.24226C15.918 1.04659 14.1479 1.06413 12.3987 1.29456C12.2496 1.29893 12.1011 1.31645 11.9549 1.3469C9.90825 1.59624 7.9106 2.15719 6.02965 3.01078C5.06389 3.43336 4.48965 3.75024 4.48965 3.75024C6.48492 2.09976 8.82259 0.926162 11.3285 0.316892L11.0674 0C8.40996 0.133198 5.85775 1.09232 3.75869 2.74663C1.37289 7.47898 0.0872904 12.7003 0 18.0121C0 18.0121 2.1926 21.8151 7.96118 22C7.96118 22 8.92707 20.838 9.71013 19.8344C7.88015 19.3698 6.26588 18.2778 5.14212 16.7443C5.14212 16.7443 5.40319 16.9292 5.87308 17.1934C5.89894 17.1934 5.92478 17.2195 5.97741 17.2457C6.05577 17.298 6.13413 17.325 6.21235 17.3778C6.82644 17.7209 7.46312 18.021 8.11788 18.2757C9.35591 18.7838 10.6414 19.1643 11.9549 19.4114C14.1872 19.8452 16.4799 19.8541 18.7154 19.4376C20.013 19.195 21.2817 18.8143 22.5002 18.3019C23.5558 17.8988 24.5629 17.3761 25.5021 16.7437C24.3364 18.3101 22.6644 19.4129 20.7775 19.86C21.5606 20.8373 22.5002 21.9729 22.5002 21.9729C24.0448 22.0122 25.5757 21.6723 26.9622 20.9824C28.3486 20.2926 29.5493 19.2732 30.4615 18.0114C30.374 12.7002 29.0884 7.47942 26.7028 2.74754ZM10.3627 15.5568C9.63857 15.5016 8.96176 15.1715 8.46793 14.6328C7.9741 14.094 7.69972 13.3864 7.69972 12.6516C7.69972 11.9168 7.9741 11.2092 8.46793 10.6705C8.96176 10.1317 9.63857 9.80164 10.3627 9.7464C11.0869 9.80164 11.7636 10.1317 12.2575 10.6705C12.7513 11.2092 13.0257 11.9168 13.0257 12.6516C13.0257 13.3864 12.7513 14.094 12.2575 14.6328C11.7636 15.1715 11.0869 15.5016 10.3627 15.5568ZM19.89 15.5568C19.3129 15.6009 18.7361 15.4681 18.2347 15.1755C17.7333 14.883 17.3307 14.4445 17.0793 13.917C16.828 13.3895 16.7395 12.7976 16.8256 12.2185C16.9116 11.6395 17.1681 11.1001 17.5616 10.6707C17.9551 10.2413 18.4674 9.94185 19.0316 9.8114C19.5958 9.68096 20.1858 9.72556 20.7246 9.93941C21.2634 10.1533 21.7259 10.5264 22.052 11.0102C22.378 11.494 22.5525 12.066 22.5525 12.6516C22.5787 13.3937 22.3132 14.1161 21.8142 14.6606C21.3152 15.2051 20.6233 15.5273 19.89 15.5568Z"
                                        fill="white"
                                />
                            </svg>
                        }
                >
                    <a target={ "_blank" }
                       href="https://horizen.io/invite/discord">
                        <span className="leading-5 text-Gray_text w-full">Join the Horizen Discord server for support</span>
                    </a>
                </IconRoundedBorderedBox>
            </a>
    )
}

const AppFooter = () => {
    const appState: AppState = useSelector((state: AppState) => state, shallowEqual)

    return (
            <footer
                    className={ `${
                            blurBackground(appState) ? "blur-sm" : ""
                    } bg-Footer_bckgrnd text-white bottom-12 w-full mt-auto z-10` }
            >
                <ContentContainer>
                    <div className="pb-12 pt-14">
                        <div className="xl:hidden flex">
                            <a href="/">
                                <img className="mb-12 h-8" src={ generatorLogo } alt={ "Generator Logo" }/>
                            </a>
                        </div>
                        <div className="sm:flex sm:justify-between">
                            <div className="flex">
                                <div className="mr-20 hidden xl:block">
                                    <a href={ `/` }>
                                        <img className="mb-12 h-8" src={ generatorLogo } alt={ "Generator Logo" }/>
                                    </a>
                                </div>
                                <Links/>
                            </div>
                            <div className="hidden lg:flex mt-0 ">
                                <div className="mx-20 w-64 inline-block">
                                    <DiscordBox/>
                                </div>
                                <div className="w-[246px] inline-block">
                                    <FooterSubheading>Join Our Community</FooterSubheading>
                                    <SocialNetworks/>
                                </div>
                            </div>
                            <div className="lg:hidden w-64 mt-4 md:mt-0">
                                <DiscordBox/>
                            </div>
                        </div>
                        <div className="lg:hidden mt-10 md:flex md:justify-end">
                            <div>
                                <FooterSubheading>Join Our Community</FooterSubheading>
                                <SocialNetworks/>
                            </div>
                        </div>
                    </div>
                </ContentContainer>
            </footer>
    )
}

export default AppFooter
