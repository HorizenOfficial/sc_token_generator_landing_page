import React from "react"
import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom"

const NavLink: React.FC<NavLinkProps & React.RefAttributes<HTMLAnchorElement>> = (props) => {
    const { to, children, ...rest } = props
    return (
        <RouterNavLink
            to={ to }
            { ...rest }
        >
            { children }
        </RouterNavLink>
    )
}

export default NavLink
