import React from "react"

const ContentContainer: React.FC<{children: any, alignText?: string}> = ({ children, alignText }) => {
    return <div className={ `${ alignText && setTextAlignment(alignText) } px-6 md:px-12 lg:px-8 xl:px-2 max-w-screen-xl mx-auto` }>{children}</div>
}

const setTextAlignment = (alignText: string) => {
    switch (alignText) {
        case "left":
            return "text-left"
        case "right":
            return "text-right"
        case "center":
            return "text-center"
        default:
            return ""
    }
}

export default ContentContainer
