import React from "react"

const FooterSubheading: React.FC<{children: any}> = ({ children }) => {
    return (
        <span className="font-bold text-xl capitalize mb-3 block">
            { children }
        </span>
    )
}

export default FooterSubheading
