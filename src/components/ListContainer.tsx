import React from "react"
import TokenMintSpinner from "../templates/TokenMintSpinner";

export type ListContainerProps = {
    titleSection: any
    elements: Array<string>
    elementsConfig: Array<string>
    isLoading: boolean
    isEmpty: boolean
    tableContent?: any
    children?: any
    fixedHeight?: string
    customEmptyMessage?: string
}

const ListContainer: React.FC<ListContainerProps> = (
        {
            titleSection,
            elements,
            elementsConfig,
            isLoading,
            isEmpty,
            tableContent,
            children,
            fixedHeight,
            customEmptyMessage
        }
) => {

    const headerContent = () => {
        if (elements.length === 0) {
            throw Error("No elements to add to header")
        }
        if (elements.length !== elementsConfig.length) {
            throw Error("Elements and config must have the same length")
        }
        return elements.map((elem, index) => {
            return (
                    <th
                            key={ `key_${ elem }` }
                            className={ (index === 0 ? "pl-4 " : "")
                                    .concat(
                                            index === elements.length - 1
                                                    ? "text-right pr-4"
                                                    : "text-left"
                                    )
                                    .concat(" text-Gray_text tracking-wider text-sm tracking-[0.2em] font-bold w-")
                                    .concat(elementsConfig[index]) }
                    >
                        { elem.toUpperCase() }
                    </th>
            )
        })
    }

    return (
            <div className={ fixedHeight ?? "" }>
                { titleSection }
                <div className={ `${ fixedHeight ?? "" } py-4 overflow-y-auto` }>
                    <div className={ `${ fixedHeight ?? "" } ` }>
                        { tableContent && !isLoading && (
                                <table className="w-full table-fixed">
                                    { isEmpty && (
                                            <p className="text-center text-Gray_text text-xl my-4">
                                                { customEmptyMessage ?? "No elements found" }
                                            </p>
                                    ) }
                                    { !isEmpty && (
                                            <>
                                                <thead className="border-b border-Gray_text/20">
                                                <tr
                                                        data-testid="header"
                                                        className="h-10 text-gray-light"
                                                >
                                                    { headerContent() }
                                                </tr>
                                                </thead>
                                                { tableContent }
                                            </>
                                    ) }
                                </table>
                        ) }
                        { isLoading && (
                                <div className="w-14 mx-auto">
                                    <TokenMintSpinner/>
                                </div>
                        ) }
                        { children }
                    </div>
                </div>
            </div>
    )
}

export default ListContainer
