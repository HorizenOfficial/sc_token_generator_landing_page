import React from "react"
import ReactSwitch from "react-switch"
import ReactTooltip from "react-tooltip"
import tooltipIcon from "../../assets/tooltip_icon.svg"

export type FormCheckboxProps = {
    title: string
    value: boolean
    disabled: boolean
    onChange: () => void
    titleTooltip?: any
    tooltip?: any
}

const FormCheckbox: React.FC<FormCheckboxProps> = (
        {
            title,
            value,
            disabled,
            onChange,
            titleTooltip,
            tooltip
        }
) => {

    return (
            <div className="block">
                <div className="inline-flex">
                <span className="text-sm font-bold tracking-[0.2em] uppercase text-Gray_text pt-[2px]">{ title }
                </span>
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
                <div
                        className="float-right"
                        data-tip={ tooltip ?? "" }
                        data-testid={ title.concat("_description") }
                        data-for={ title.concat("_description") }
                        data-background-color="#101019">
                    <ReactSwitch className={ `${ value ? "active" : "inactive" } float-right` } checked={ value }
                                 data-testid={ title.concat("_switch") }
                                 disabled={ disabled } onChange={ onChange }
                                 onColor={ "#26DB8D" } offColor={ "#7A7E8C" } checkedIcon={ false }
                                 height={ 10 } width={ 26 } handleDiameter={ 28 }
                                 uncheckedIcon={ false }
                    />
                </div>
                { tooltip && (
                        <ReactTooltip
                                id={ title.concat("_description") }
                                effect="solid"
                                multiline={ true }
                        >
                            <span className="text-sm text-center">{ tooltip ?? "" }</span>
                        </ReactTooltip>
                ) }
            </div>
    )
}

export default FormCheckbox