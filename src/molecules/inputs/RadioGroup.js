// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { filterProps } from "../../core/utils";

// Components
import { FieldHoc } from "./Field";
import { Radio } from "./Radio";
import { RadioCard } from "./RadioCard";

export const RADIO_GROUP_TYPE = {
    RADIO: "radio",
    CARD: "card",
};

const RADIO_GROUP_TYPE_MAPPER = {
    [RADIO_GROUP_TYPE.RADIO]: Radio,
    [RADIO_GROUP_TYPE.CARD]: RadioCard,
};

export function RadioGroup({
    className,
    disabled = false,
    hasError,
    id,
    name,
    onChange,
    options = [],
    RadioComponent: RadioComponentProp,
    radioProps,
    type: typeProp,
    value,
    ...otherProps
}) {
    const rootClassName = classnames("thc-c-radio-group", className);

    const type = typeProp ?? (options[0]?.primary ? RADIO_GROUP_TYPE.CARD : RADIO_GROUP_TYPE.RADIO);
    const RadioComponent = RadioComponentProp ?? RADIO_GROUP_TYPE_MAPPER[type];

    return (
        <div {...filterProps(otherProps)} className={rootClassName} disabled={disabled === true}>
            {options.map(({ value: optionValue, disabled: optionDisabled, ...otherOptionProps }) => (
                <RadioComponent
                    key={optionValue}
                    {...radioProps}
                    {...otherOptionProps}
                    checked={optionValue === value}
                    disabled={optionDisabled || disabled}
                    hasError={hasError}
                    id={`${id}-${optionValue}`}
                    name={name}
                    onChange={onChange}
                    value={optionValue}
                />
            ))}
        </div>
    );
}

RadioGroup.propTypes = {
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * If is disabled
     */
    disabled: PropTypes.bool,
    /**
     * If has error
     */
    hasError: PropTypes.bool,
    /**
     * Identifier
     */
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * Name for input
     */
    name: PropTypes.string,
    /**
     * Change handler
     */
    onChange: PropTypes.func,
    /**
     * Options
     */
    options: PropTypes.arrayOf(
        PropTypes.shape({
            /**
             * If is disabled
             */
            disabled: RadioCard.propTypes.disabled,
            /**
             * Icon for RadioCard
             */
            icon: RadioCard.propTypes.icon,
            /**
             * Label for radio
             */
            label: Radio.propTypes.label,
            /**
             * Primary for RadioCard
             */
            primary: RadioCard.propTypes.primary,
            /**
             * Secondary for RadioCard
             */
            secondary: RadioCard.propTypes.secondary,
            /**
             * Value
             */
            value: Radio.propTypes.value,
        })
    ),
    /**
     * Override Radio component
     */
    RadioComponent: PropTypes.elementType,
    /**
     * Additional props for radio
     */
    radioProps: PropTypes.shape(Radio.propTypes),
    /**
     * Type of radio
     */
    type: PropTypes.oneOf(Object.values(RADIO_GROUP_TYPE)),
    /**
     * Value
     */
    value: Radio.propTypes.value,
};

export const RadioGroupField = FieldHoc(RadioGroup, "RadioGroup");
