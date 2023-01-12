import React from "react"
import ReactTooltip from "react-tooltip"
import tooltipIcon from "../../assets/tooltip_icon.svg"

export enum FormInputStyle {
    BLACK,
    NORMAL
}

export type FormInputProps = {
    title: string
    value: string | undefined
    onChange: (value: string) => void
    disabled?: boolean
    titleTooltip?: any
    error?: string
    onFocus?: () => void
    onFocusLost?: () => void
    extraSize?: boolean
    style?: FormInputStyle
    placeholder?: string
}

const FormInput: React.FC<FormInputProps> = (
        {
            title,
            value,
            onChange,
            disabled,
            titleTooltip,
            error,
            onFocus,
            onFocusLost,
            extraSize,
            style,
            placeholder
        }
) => {

    let outlineColor = "outline-[#7A7E8C33]"
    if (disabled) {
        outlineColor = "outline-transparent"
    } else if (error) {
        outlineColor = "outline-ZBF_red"
    }

    const inputClasses = `${ style === FormInputStyle.BLACK
            ? "bg-black font-bold"
            : `${ error ? "hover:outline-ZBF_red" : disabled ? "" : "hover:outline-ZBF_green" } bg-Hover_bckgrnd font-normal` } ${ disabled ? "text-Content_gray" : "text-white" } mt-1 ${ extraSize ? "h-32" : "h-12" } px-3 rounded 
            outline outline-1
            ${ error ? "focus-visible:outline-ZBF_red" : `${ disabled ? "" : "focus-visible:outline-ZBF_green" }` }
             focus-visible:outline-1 ${ outlineColor }`
    return (
            <div className={ `${ style === FormInputStyle.BLACK ? "bg-black p-4" : "" } grid` }
                 data-testid={ title.concat("_inputContainer") }>
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
                                     className="ml-2 mt-[0.1em] cursor-pointer"
                                     src={ tooltipIcon }/>
                            </div>
                    ) }
                </div>
                { extraSize ? (
                        <textarea className={ inputClasses.concat(" resize-none py-2") }
                                  disabled={ disabled ?? false }
                                  data-testid={ title.concat("_input") }
                                  value={ value }
                                  onFocus={ onFocus }
                                  onBlur={ onFocusLost }
                                  onChange={ (event) => {
                                      onChange(event.target.value)
                                  } }/>
                ) : (
                        <input className={ inputClasses }
                               disabled={ disabled ?? false }
                               data-testid={ title.concat("_input") }
                               value={ value }
                               placeholder={ placeholder }
                               onFocus={ onFocus }
                               onBlur={ onFocusLost }
                               onChange={ (event) => {
                                   onChange(event.target.value)
                               } }/>

                ) }

                { error && (
                        <span data-testid={ "error-message" } className="text-ZBF_red font-xs pl-3">{ error }</span>
                ) }
            </div>
    )
}

export default FormInput