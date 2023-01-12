import React from "react"

const BasicRoundedBorderedBox: React.FC<{children: any}> = ({children}) => {
    return (
            <div className="text-white bg-[#0E0E16] border rounded-[5px] border-[rgba(122,126,140,0.2)] hover:border-ZBF_green">
                { children }
            </div>
    )
}

type LinkRoundedBorderedBoxProps = {
    href: string
    children: React.ReactNode
}

const LinkRoundedBorderedBox: React.FC<LinkRoundedBorderedBoxProps> = ({href, children}) => {
    return (
            <BasicRoundedBorderedBox>
                <a
                        href={ href }
                        className="text-center py-5 px-[25%] text-[22px] flex items-center justify-center text-white h-full"
                >
                    { children }
                </a>
            </BasicRoundedBorderedBox>
    )
}

const IconRoundedBorderedBox: React.FC<{ icon?: React.ReactElement; small?: boolean; children: any }> = (
        {
            icon,
            children,
            small = false,
        }) => {
    return (
            <BasicRoundedBorderedBox>
                <div className={ `flex items-center h-full ${ small ? "p-3" : "px-6 py-7 min-h-[8em]" }` }>
                    { icon }
                    <div className={ small ? "ml-3" : "ml-5" }>{ children }</div>
                </div>
            </BasicRoundedBorderedBox>
    )
}

const IconWithTitleAndDescriptionRoundedBorderedBox: React.FC<{
    icon?: React.ReactElement
    link?: string
    newTab?: boolean
    title: string
    description: string
    customClickHandler?: (event?: any) => void
}> = ({icon, link, newTab, title, description, customClickHandler}) => {
    return link
            ? (
                    <a href={ link } target={ newTab ? "_blank" : "" } onClick={customClickHandler}>
                        <IconRoundedBorderedBox icon={ icon }>
                            <span className="block text-[22px] font-bold leading-[27px]">{ title }</span>
                            <span className="block text-lg text-[#C8CFD4] leading-[22px]">{ description }</span>
                        </IconRoundedBorderedBox>
                    </a>
            )
            : (
                    <IconRoundedBorderedBox icon={ icon }>
                        <span className="block text-[22px] font-bold leading-[27px]">{ title }</span>
                        <span className="block text-lg text-[#C8CFD4] leading-[22px]">{ description }</span>
                    </IconRoundedBorderedBox>
            )
}

export {
    BasicRoundedBorderedBox,
    LinkRoundedBorderedBox,
    IconRoundedBorderedBox,
    IconWithTitleAndDescriptionRoundedBorderedBox,
}
