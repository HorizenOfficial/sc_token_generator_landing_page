import React from "react"

const NavContainer: React.FC<{children: any}> = ({ children }) => {
    return (
        <div className="px-6 sm:px-16 lg:px-0 max-w-screen-xl mx-auto">
            { children }
        </div>
    )
}

export default NavContainer
