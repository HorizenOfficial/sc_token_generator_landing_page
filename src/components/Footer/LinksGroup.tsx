import React from "react"
import FooterSubheading from "./FooterSubheading"
import { Link } from "../../types/Link"

type LinksGroupProps = {
    title: string
    links: Link[]
}

const LinksGroup: React.FC<LinksGroupProps> = ({title, links}) => {
    return (
            <div key={ `${ title }_parent` }>
                <FooterSubheading>{ title }</FooterSubheading>
                <ul>
                    { links.map((link) => {
                        return (
                                <li
                                        key={ link.label }
                                        className="mb-2">
                                    <a
                                            className="text-Gray_text hover:text-white"
                                            href={ link.href }
                                            target={ link.openNewTab ? "_blank" : "" }
                                            rel="noopener noreferrer"
                                    >
                                        { link.label }
                                    </a>
                                </li>
                        )
                    }) }
                </ul>
            </div>
    )
}

export default LinksGroup
