import React from "react"

export enum TokenmintButtonStyle {
    GREEN_BORDERED,
    NOT_BORDERED,
}

interface TokenmintButtonProps {
    title: string
    enabled: boolean
    link?: string
    newTab?: boolean
    style: TokenmintButtonStyle
    onClick?: ( event?: any) => void
    additionalClasses?: string
    dataTestId?: string
    children?: any
}

const TokenmintButton: React.FC<TokenmintButtonProps> = (
        {
            title,
            enabled,
            link,
            newTab,
            style,
            onClick,
            additionalClasses,
            dataTestId
        }) => {

    const defaultPaddings = "py-1 px-5 lg:px-10 xl:px-10"
    const paddings = (additionalClasses?.includes("px") || additionalClasses?.includes("py") || additionalClasses?.includes("p-")) ? "" : defaultPaddings
    const classes = `border rounded-md text-xs lg:text-base xl:text-base font-bold uppercase tracking-[0.3em] leading-5 lg:leading-10 xl:leading-10 mx-auto
            ${ style === TokenmintButtonStyle.GREEN_BORDERED ? "border-ZBF_green" : "border-transparent" } disabled:border-Hover_bckgrnd
            bg-Hover_bckgrnd hover:bg-ZBF_green hover:disabled:bg-Hover_bckgrnd
            disabled:text-Gray_text text-white ${ additionalClasses ?? "" } ${ paddings }`

    return link
            ? <a
                    className={ classes }
                    data-testid={ dataTestId ?? "" }
                    href={ link }
                    target={ newTab ? "_blank" : "" }
                    onClick={ onClick }>
                { title }
            </a>
            : <button
                    className={ classes }
                    data-testid={ dataTestId ?? "" }
                    disabled={ !enabled }
                    onClick={ onClick }>
                { title }
            </button>
}

export default TokenmintButton
