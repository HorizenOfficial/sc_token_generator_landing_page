import React from "react"
import arrowCollapse from "../assets/arrow_collapse.png"
import calendar from "../assets/calendar.png"
import { getNextDate, getPreviousDate } from "../utils/Utils"

export type ListHeaderProps = {
    title: string
    secondaryTitle?: string
    currentPage?: number
    totalPages?: number
    currentCalendarDate?: Date,
    onCalendarClicked?: (coordinates: [ x: number, y: number ]) => void,
    onCalendarPreviousDateSelected?: () => void,
    onCalendarNextDateSelected?: () => void,
    onPreviousClick?: () => void
    onNextClick?: () => void
    onFirstClick?: () => void
    onLastClick?: () => void
    innerSearchPlaceholder?: string
    onInnerSearchChange?: (search: string) => void
}

const ListHeader: React.FC<ListHeaderProps> = (
    {
        title,
        secondaryTitle,
        currentPage,
        totalPages,
        currentCalendarDate,
        onCalendarClicked,
        onCalendarPreviousDateSelected,
        onCalendarNextDateSelected,
        onPreviousClick,
        onNextClick,
        onFirstClick,
        onLastClick,
        innerSearchPlaceholder,
        onInnerSearchChange
    }
) => {

    const paginationBlock = () => {
        return (
            <div className="ml-auto grid grid-cols-10 justify-items-center">
                <button onClick={ onFirstClick }
                        className="pagination-button text-ZBF_blue h-full col-span-2 border border-ZBF_dark px-4">First
                </button>
                <button onClick={ onPreviousClick }
                        className="pagination-button text-ZBF_blue h-full col-span-1 border border-ZBF_dark px-4">
                    <img className="pagination-arrow h-2/4 object-contain" src={ arrowCollapse }/>
                </button>
                <span
                    className="text-Gray_text text-base col-span-4 mt-2 whitespace-nowrap">{ `Page ${ currentPage } of ${ totalPages ?? "-" }` }</span>
                <button onClick={ onNextClick }
                        className="pagination-button text-ZBF_blue h-full col-span-1 border border-ZBF_dark px-4">
                    <img className="pagination-arrow rotate-180 h-2/4 object-contain" src={ arrowCollapse }/>
                </button>
                <button onClick={ onLastClick }
                        className="pagination-button text-ZBF_blue h-full col-span-2 border border-ZBF_dark px-4">Last
                </button>
            </div>
        )
    }

    const innerSearchInput = () => {
        return (
            <div className="w-1/4 ml-2">
                <input className="h-10 border border-Content_gray bg-Main_bckgrnd px-4 w-full text-white"
                       placeholder={ innerSearchPlaceholder ?? "" }
                       title={ innerSearchPlaceholder ?? "" }
                       onChange={ (event) => {
                           if (onInnerSearchChange) {
                               onInnerSearchChange(event.target.value)
                           }
                       } }/>
            </div>
        )
    }

    const titleSection = () => {
        if (secondaryTitle && currentCalendarDate && currentPage !== undefined) {
            return (
                <div>
                    <p className="font-bold text-white text-[34px] mb-1 mr-4">{ title }</p>
                    <p className="text-lg text-Content_gray mt-2">{ secondaryTitle ?? "" }</p>
                    <div className="inline-flex w-full mb-3 mt-4 pl-2">
                        <div className="h-full contents">
                            <button
                                className="text-normal lg:px-1 px-4 text-ZBF_blue"
                                onClick={ () => onCalendarPreviousDateSelected!() }
                            >
                                ← { getPreviousDate(currentCalendarDate) }
                            </button>
                            <button
                                className="col-span-2 mx-4"
                                type="button"
                                onClick={ (event) => {
                                    onCalendarClicked!([ event.clientX, event.clientY ])
                                } }
                            >
                                <img
                                    className="mx-auto h-7 calendar-button"
                                    src={ calendar }
                                    alt="Calendar"
                                />
                            </button>
                            <button
                                className="text-normal lg:px-1 px-4 text-ZBF_blue"
                                onClick={ () => onCalendarNextDateSelected!() }
                            >
                                { getNextDate(currentCalendarDate) } →
                            </button>
                        </div>

                        { paginationBlock() }
                        { innerSearchInput() }
                    </div>
                </div>
            )
        } else if (currentCalendarDate && currentPage !== undefined) {
            return (
                <div>
                    <p className="font-bold text-white text-[34px] mb-1 mr-4">{ title }</p>
                    <div className="inline-flex w-full mb-3 mt-4 pl-2">
                        <div className="h-full contents">
                            <button
                                className="text-normal lg:px-1 px-4 text-ZBF_blue"
                                onClick={ () => onCalendarPreviousDateSelected!() }
                            >
                                ← { getPreviousDate(currentCalendarDate) }
                            </button>
                            <button
                                className="col-span-2 mx-4"
                                type="button"
                                onClick={ (event) => {
                                    onCalendarClicked!([ event.clientX, event.clientY ])
                                } }
                            >
                                <img
                                    className="mx-auto h-7 calendar-button"
                                    src={ calendar }
                                    alt="Calendar"
                                />
                            </button>
                            <button
                                className="text-normal lg:px-1 px-4 text-ZBF_blue"
                                onClick={ () => onCalendarNextDateSelected!() }
                            >
                                { getNextDate(currentCalendarDate) } →
                            </button>
                        </div>

                        { paginationBlock() }
                        { innerSearchInput() }
                    </div>
                </div>
            )
        } else if (secondaryTitle && currentPage !== undefined) {
            return (
                <div>
                    <p className="font-bold text-white text-[34px] mb-1 mr-4">{ title }</p>
                    <div className="inline-flex w-full mb-3">
                        <p className="text-lg text-Content_gray mt-2">{ secondaryTitle ?? "" }</p>
                        { paginationBlock() }
                        { innerSearchInput() }
                    </div>
                </div>
            )
        } else if (secondaryTitle) {
            return (
                <div>
                    <p className="font-bold text-white text-[34px] mb-1 mr-4">{ title }</p>
                    <div className="inline-flex w-full mb-3">
                        <p className="text-lg text-Content_gray mt-2">{ secondaryTitle ?? "" }</p>
                    </div>
                </div>
            )
        } else if (currentPage !== undefined) {
            return (
                <div className="inline-flex w-full">
                    <p className="font-bold text-white text-[34px] mb-1 mr-4 whitespace-nowrap">{ title }</p>
                    <div className="inline-flex w-full mb-3">
                        { paginationBlock() }
                        { innerSearchInput() }
                    </div>
                </div>
            )
        } else {
            return (
                <h2 className="font-bold text-white text-[34px] mb-4">{ title }</h2>
            )
        }
    }

    return (
        titleSection()
    )
}

export default ListHeader
