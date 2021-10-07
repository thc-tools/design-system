// Libs
import React, { useCallback, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { useForkRef, useFocusAndBlur } from "../../core/hooks";
import { arrayify, filterProps, wrapKeyUp, wrapPrevent, patchFormEventValue } from "../../core/utils";

// Components
import { Icon, ICON_SIZE } from "../icons";
import { FieldHoc } from "./Field";
import { InputAdornment } from "./InputAdornment";

export const INPUT_TYPES = {
    TEXT: "text",
    PASSWORD: "password",
    NUMBER: "number",
    DATE: "date",
};

function _adornmentWrapper(adornmentClassName, adornmentProps = {}) {
    return (component) => {
        if (component.type === InputAdornment) {
            return React.cloneElement(component, {
                ...adornmentProps,
                className: classnames(adornmentClassName, component?.props.className),
            });
        }

        return (
            <InputAdornment {...adornmentProps} className={adornmentClassName}>
                {component}
            </InputAdornment>
        );
    };
}

/**
 * TextField allows users to enter text into a UI.
 *
 * ```js
 * import { TextField } from "./components/molecules/inputs"
 * ```
 *
 * ℹ️ `TextField`'s props are the join of props from `Input` and `Field`
 *
 * Or bare version:
 *
 * ```js
 * import { Input } from "./components/molecules/inputs"
 * ```
 */
export const Input = React.forwardRef(function Input(
    {
        "aria-describedby": ariaDescribedBy,
        "aria-labelledby": ariaLabelledBy,
        adornmentClassName: adornmentClassNameProp,
        adornmentProps,
        autoComplete,
        className,
        containerClassName: containerClassNameProp,
        containerProps,
        disabled = false,
        endAdornment: endAdornmentProp,
        focused = false,
        fullWidth = false,
        hasError = false,
        id,
        inputClassName: inputClassNameProp,
        InputComponent: InputComponentProp = "input",
        inputProps: inputPropsProp,
        max,
        min,
        multiline = false,
        name,
        onChange,
        onClick,
        onBlur,
        onFocus,
        placeholder,
        readOnly = false,
        required = false,
        rows = 5,
        showMinMax = true,
        startAdornment,
        step = 1,
        value,
        type: typeProp = INPUT_TYPES.TEXT,
        ...otherProps
    },
    ref
) {
    const inputRef = useRef();
    const forkedRef = useForkRef(inputRef, ref);

    const { focus: focusHook, _handleFocus, _handleBlur } = useFocusAndBlur(disabled, onFocus, onBlur);
    const focus = focusHook || focused;

    const type = typeProp === INPUT_TYPES.DATE ? INPUT_TYPES.TEXT : typeProp;

    const _handleClick = useCallback(
        (event) => {
            // If click is done outside concrete input, focus the input within
            if (inputRef.current && event.currentTarget === event.target) {
                inputRef.current.focus();
            }

            if (onClick) {
                wrapPrevent(onClick(event));
            }
        },
        [inputRef, onClick]
    );

    const rootClassName = classnames("thc-c-input", className);
    const containerClassName = classnames(
        "thc-c-input__container",
        {
            "thc-c-input--full-width": fullWidth,
            "thc-c-input--error": hasError && !disabled,
            "thc-c-input--focus": focus,
        },
        containerClassNameProp
    );
    const inputClassName = classnames("thc-c-input__input", inputClassNameProp);
    const adornmentClassName = classnames("thc-c-input__adornment", adornmentClassNameProp);

    let inputProps = inputPropsProp ?? {};
    let InputComponent = InputComponentProp;

    if (multiline && InputComponent === "input") {
        if (rows) {
            inputProps = {
                ...inputProps,
                type: undefined,
                rows,
            };

            InputComponent = "textarea";
        }
    }

    const endAdornment = useMemo(() => {
        if (type !== INPUT_TYPES.NUMBER) {
            return endAdornmentProp;
        }

        const handleIncrementClick = (event) => {
            let newValue = value + step;
            if (max !== undefined) {
                newValue = Math.min(newValue, max);
            }

            const newEvent = patchFormEventValue(event, inputRef.current, newValue);

            onChange(newEvent);
            inputRef.current.focus();
        };
        const handleDecrementClick = (event) => {
            let newValue = value - step;
            if (min !== undefined) {
                newValue = Math.max(newValue, min);
            }

            const newEvent = patchFormEventValue(event, inputRef.current, newValue);

            onChange(newEvent);
            inputRef.current.focus();
        };

        return [
            <div className="thc-c-input__number-buttons">
                <Icon
                    className="thc-o-actionable"
                    onClick={handleIncrementClick}
                    role="button"
                    size={ICON_SIZE.XS}
                    tabIndex={-1}
                >
                    angle-up
                </Icon>
                <Icon
                    className="thc-o-actionable"
                    onClick={handleDecrementClick}
                    role="button"
                    size={ICON_SIZE.XS}
                    tabIndex={-1}
                >
                    angle-down
                </Icon>
            </div>,
            ...arrayify(endAdornmentProp),
        ];
    }, [endAdornmentProp, max, min, onChange, step, type, value]);

    return (
        <div {...filterProps(otherProps)} className={rootClassName}>
            <div
                {...filterProps(containerProps)}
                className={containerClassName}
                onClick={_handleClick}
                onKeyUp={wrapKeyUp(_handleClick)}
                disabled={disabled === true}
                role="textbox"
            >
                {startAdornment &&
                    React.Children.map(startAdornment, _adornmentWrapper(adornmentClassName, adornmentProps))}
                <InputComponent
                    aria-describedby={ariaDescribedBy}
                    aria-labelledby={ariaLabelledBy}
                    autoComplete={autoComplete}
                    className={inputClassName}
                    id={id}
                    disabled={disabled === true}
                    max={max}
                    min={min}
                    name={name}
                    onChange={onChange}
                    onFocus={_handleFocus}
                    onBlur={_handleBlur}
                    placeholder={placeholder}
                    readOnly={readOnly || !onChange}
                    ref={forkedRef}
                    required={required}
                    value={value}
                    step={step}
                    type={type}
                    {...filterProps(inputProps)}
                />
                {endAdornment &&
                    React.Children.map(endAdornment, _adornmentWrapper(adornmentClassName, adornmentProps))}
            </div>
            {showMinMax && (min !== undefined || max !== undefined) && (
                <div className="thc-c-input__min-max">
                    <div>{min}</div>
                    <div>{max}</div>
                </div>
            )}
        </div>
    );
});

Input.propTypes = {
    /**
     * Id for description element
     */
    "aria-describedby": PropTypes.string,
    /**
     * If for label element
     */
    "aria-labelledby": PropTypes.string,
    /**
     * Additional className for adornment
     */
    adornmentClassName: PropTypes.string,
    /**
     * Additional props for adornment
     */
    adornmentProps: PropTypes.shape(InputAdornment.propTypes),
    /**
     * If authorize auto complete
     */
    autoComplete: PropTypes.bool,
    /**
     * Additional className for the Input
     */
    className: PropTypes.string,
    /**
     * Additional className for the container
     */
    containerClassName: PropTypes.string,
    /**
     * Additional props for the container
     */
    containerProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    /**
     * If is disabled
     */
    disabled: PropTypes.bool,
    /**
     * End adornment element(s)
     */
    endAdornment: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.element])),
    ]),
    /**
     * If is full width
     */
    fullWidth: PropTypes.bool,
    /**
     * If is focused
     */
    focused: PropTypes.bool,
    /**
     * If has an error
     */
    hasError: PropTypes.bool,
    /**
     * Identifier
     */
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * Underlying input component
     */
    InputComponent: PropTypes.elementType,
    /**
     * Props for the underlying input component
     */
    inputProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    /**
     * Additional className for the underlying input component
     */
    inputClassName: PropTypes.string,
    /**
     * Max possible value
     */
    max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * Min possible value
     */
    min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * If is multiline (textarea)
     */
    multiline: PropTypes.bool,
    /**
     * Name of input
     */
    name: PropTypes.string,
    /**
     * Change handler
     */
    onChange: PropTypes.func,
    /**
     * Click handler
     */
    onClick: PropTypes.func,
    /**
     * Blur handler
     */
    onBlur: PropTypes.func,
    /**
     * Focus handler
     */
    onFocus: PropTypes.func,
    /**
     * Placeholder
     */
    placeholder: PropTypes.string,
    /**
     * If is readonly
     */
    readOnly: PropTypes.bool,
    /**
     * If is required
     */
    required: PropTypes.bool,
    /**
     * Number of rows (if multiline)
     */
    rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * If should show min/max
     */
    showMinMax: PropTypes.bool,
    /**
     * Start adornment element(s)
     */
    startAdornment: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.element])),
    ]),
    /**
     * Value
     */
    value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    /**
     * Type of input
     */
    type: PropTypes.oneOf(Object.values(INPUT_TYPES)),
};

export const TextField = FieldHoc(Input, "Text");
