import React from "react"
import ReactTooltip from "react-tooltip"
import tooltipIcon from "../../assets/tooltip_icon.svg"
import { SCAPI } from "../../network/explorer_types/SCAPI";
import { splitStringMiddle } from "../../utils/Utils";

export type FormInputProps = {
    title: string
    allValues: SCAPI.TokenBoxType[]
    value: string | undefined
    onChange: (value: string) => void
    rightText?: string
    disabled?: boolean
    titleTooltip?: any
    error?: string
    onFocus?: () => void
    onFocusLost?: () => void
}

const FormDropdown: React.FC<FormInputProps> = (
        {
            title,
            allValues,
            value,
            onChange,
            rightText,
            disabled,
            titleTooltip,
            error,
            onFocus,
            onFocusLost
        }
) => {

    let outlineColor = "outline-[#7A7E8C33]"
    if (disabled) {
        outlineColor = "outline-transparent"
    } else if (error) {
        outlineColor = "outline-ZBF_red"
    }

    const inputClasses = `${ disabled
            ? "bg-black"
            : `${ error ? "hover:outline-ZBF_red" : "hover:outline-ZBF_green" } bg-Hover_bckgrnd` } font-bold text-white mt-1 h-12 px-3 rounded 
            outline outline-1
            ${ error ? "focus-visible:outline-ZBF_red" : `focus-visible:outline-ZBF_green` }
             focus-visible:outline-1 ${ outlineColor }`
    return (
            <div className={ `${ disabled ? "bg-black p-4" : "" } grid` }>
                <div className="inline-flex">
                    <span className="text-sm tracking-[0.2em] font-bold uppercase text-Gray_text font-bold">{ title }</span>
                    { titleTooltip && (
                            <div>
                                <ReactTooltip
                                        id={ title.concat("_title_description") }
                                        effect="solid"
                                        multiline={ true }
                                >
                                    <span className="text-sm text-center">{ titleTooltip ?? "" }</span>
                                </ReactTooltip>
                                <img data-tip={ titleTooltip ?? "" }
                                     data-for={ title.concat("_title_description") }
                                     className="ml-2 mt-[0.2em] cursor-pointer"
                                     src={ tooltipIcon }/>
                            </div>
                    ) }
                </div>
                <div className="relative grid">
                    <span className="text-Content_gray text-base absolute right-[0.8em] top-[30%] overflow-hidden text-ellipsis w-[60%] whitespace-nowrap text-right">{ rightText ?? "" }</span>
                    <select className={ inputClasses }
                            disabled={ disabled ?? false }
                            value={ value }
                            onFocus={ onFocus }
                            onBlur={ onFocusLost }
                            onChange={ (event) => {
                                onChange(event.target.value)
                            } }>
                        { allValues.map((optionValue) => {
                            return <option className="font-bold"
                                           value={ optionValue.uuid }>{ optionValue.uuid === value!
                                    ? `${ optionValue.symbol }`
                                    : `${ optionValue.symbol } - ${ splitStringMiddle(optionValue.uuid, 20) }` }
                            </option>
                        }) }
                    </select>
                </div>

                { error && (
                        <span className="text-ZBF_red font-xs pl-3">{ error }</span>
                ) }
            </div>
    )
}

export default FormDropdown