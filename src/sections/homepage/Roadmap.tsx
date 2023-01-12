import React from "react"
import ContentContainer from "../../templates/ContentContainer"

const roadmapLineClassName = `hidden md:block relative h-[18px] mb-[18px]
        before:[content:''] before:absolute before:top-[8px] before:w-full before:border-Gray_text before:border-t-[2px]
        after:[content:''] after:absolute after:top-0 after:left-0 after:bg-white after:h-[18px] after:w-[18px] after:rounded-full after:border-[6px] after:border-ZBF_green`

const roadmapLineClassMobile = `md:hidden relative mr-[36px] 
before:[content:''] before:absolute before:top-[2px] before:w-full before:border-Gray_text before:h-full before:-right-[10px] before:border-t-[0px] before:border-r-[2px]
after:[content:''] after:absolute after:top-[2px] after:left-0 after:bg-white after:h-[18px] after:w-[18px] after:rounded-full after:border-[6px] after:border-ZBF_green`

const RoadmapTextBig: React.FC<{children: any}> = ({ children }) => {
    return <p className="mb-3 text-left text-[22px] font-bold text-Gray_text">{children}</p>
}

const RoadmapTextMedium: React.FC<{children: any}> = ({ children }) => {
    return <p className="mb-2 text-left text-[16px] font-bold text-white">{children}</p>
}

const RoadmapLi: React.FC<{children: any}> = ({ children }) => {
    return (
        <li className="relative text-left text-[16px] font-normal text-Content_gray before:absolute before:w-0 before:h-0 before:border-ZBF_green before:border-l-[6px] before:border-t-[6px] before:border-b-[6px] before:border-t-[transparent] before:border-b-[transparent] before:top-[6px] before:left-0 pl-4">
            {children}
        </li>
    )
}

const RoadmapStep1 = () => {
    return (
        <div className="flex md:block">
            <div className={`${roadmapLineClassMobile}`} />
            <div>
                <RoadmapTextBig>Q3 2022</RoadmapTextBig>
                <div className={`${roadmapLineClassName} before:right-0 before:!w-[100vw]`} />
                <div className="space-y-6 pr-4">
                    <div>
                        <RoadmapTextMedium>NFTs</RoadmapTextMedium>
                        <ul>
                            <RoadmapLi>NFT implementation (MVP)</RoadmapLi>
                            <RoadmapLi>Enable creation by users via Token Generator</RoadmapLi>
                        </ul>
                    </div>

                    <div>
                        <RoadmapTextMedium>Cobalt Improvements</RoadmapTextMedium>
                        <ul>
                            <RoadmapLi>Wallet improvements and enhanced usability</RoadmapLi>
                            <RoadmapLi>Security improvements</RoadmapLi>
                            <RoadmapLi>Disaster recovery improvements</RoadmapLi>
                        </ul>
                    </div>
                </div>
                <br className="md:hidden"/>
            </div>
        </div>
    )
}

const RoadmapStep2 = () => {
    return (
        <div className="flex md:block md:col-span-2">
            <div className={`${roadmapLineClassMobile} before:border-dashed dash`} />
            <div>
                <RoadmapTextBig>Q4 2022 and beyond</RoadmapTextBig>
                <div className={`${roadmapLineClassName} before:border-dashed dash before:!w-[100vw]`} />
                <div className="grid md:grid-cols-2">
                    <div className="mb-4 md:mb-0 space-y-6 pr-4">
                        <div>
                            <RoadmapTextMedium>Cobalt</RoadmapTextMedium>
                            <ul>
                                <RoadmapLi>New integrations and partnerships</RoadmapLi>
                            </ul>
                        </div>
                        <div>
                            <RoadmapTextMedium>Mobile App</RoadmapTextMedium>
                            <ul>
                                <RoadmapLi>Scope and create app MVP</RoadmapLi>
                            </ul>
                        </div>
                    </div>
                    <div className="pr-4">
                        <RoadmapTextMedium>Things we’ll be thinking about:</RoadmapTextMedium>
                        <ul>
                            <RoadmapLi>Interoperability with the EVM sidechain</RoadmapLi>
                            <RoadmapLi>Migrate to account-based model</RoadmapLi>
                            <RoadmapLi>White-labeling capabilities</RoadmapLi>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Roadmap = () => {
    return (
        <section className="mb-24 md:mb-48 md:overflow-x-hidden">
            <ContentContainer>
                <div className="text-left text-[38px] font-bold text-white mb-7">Roadmap</div>
                <div className="grid md:grid-cols-3">
                    <RoadmapStep1 />
                    <RoadmapStep2 />
                </div>
            </ContentContainer>
        </section>
    )
}

export default Roadmap
