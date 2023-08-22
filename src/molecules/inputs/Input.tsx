// Libs
import classnames from "classnames";
import React, { useCallback, useMemo, useRef } from "react";

// Utils
import { useFocusAndBlur, useForkRef } from "../../core/hooks";
import { arrayify, filterProps, isReactElement, patchFormEventValue, wrapKeyUp, wrapPrevent } from "../../core/utils";

// Components
import { Icon } from "../icons";
import { FieldHoc } from "./Field";
import { InputAdornment, InputAdornmentProps } from "./InputAdornment";

export type InputType = "text" | "password" | "number" | "date";

function _adornmentWrapper(adornmentClassName: string, adornmentProps = {}) {
    return (component: React.ReactNode) => {
        if (isReactElement(component) && component.type === InputAdornment) {
            return React.cloneElement(component, {
                ...adornmentProps,
                className: classnames(adornmentClassName, component.props.className),
            });
        }

        return (
            <InputAdornment {...adornmentProps} className={adornmentClassName}>
                {component}
            </InputAdornment>
        );
    };
}

export interface InputProps {
    /**
     * Id for description element
     */
    "aria-describedby"?: string;
    /**
     * If for label element
     */
    "aria-labelledby"?: string;
    /**
     * Additional className for adornment
     */
    adornmentClassName?: string;
    /**
     * Additional props for adornment
     */
    adornmentProps?: InputAdornmentProps;
    /**
     * If authorize auto complete
     */
    autoComplete?: boolean;
    /**
     * Additional className for the Input
     */
    className?: string;
    /**
     * Additional className for the container
     */
    containerClassName?: string;
    /**
     * Additional props for the container
     */
    containerProps?: DivProps;
    /**
     * If is disabled
     */
    disabled?: boolean;
    /**
     * End adornment element(s)
     */
    endAdornment?: React.ReactNode;
    /**
     * If is full width
     */
    fullWidth?: boolean;
    /**
     * If is focused
     */
    focused?: boolean;
    /**
     * If has an error
     */
    hasError?: boolean;
    /**
     * Identifier
     */
    id?: string;
    /**
     * Underlying input component
     */
    InputComponent?: React.FunctionComponent<any> | React.ComponentClass<any> | string;
    /**
     * Props for the underlying input component
     */
    inputProps?:
        | React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
        | React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
    /**
     * Additional className for the underlying input component
     */
    inputClassName?: string;
    /**
     * Max possible value
     */
    max?: number;
    /**
     * Min possible value
     */
    min?: number;
    /**
     * If is multiline (textarea)
     */
    multiline?: boolean;
    /**
     * Name of input
     */
    name: string;
    /**
     * Change handler
     */
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    /**
     * Click handler
     */
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    /**
     * Blur handler
     */
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    /**
     * Focus handler
     */
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    /**
     * Placeholder
     */
    placeholder?: string;
    /**
     * If is readonly
     */
    readOnly?: boolean;
    /**
     * If is required
     */
    required?: boolean;
    /**
     * Number of rows (if multiline)
     */
    rows?: number;
    /**
     * If should show min/max
     */
    showMinMax?: boolean;
    /**
     * Start adornment element(s)
     */
    startAdornment?: React.ReactNode;
    /**
     * Step
     */
    step?: number;
    /**
     * Value
     */
    value: string | number | undefined;
    /**
     * Type of input
     */
    type: InputType;
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
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
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
        type: typeProp = "text",
        ...otherProps
    },
    ref
) {
    const inputRef = useRef<HTMLInputElement>(null);
    const forkedRef = useForkRef(inputRef, ref);

    const { focus: focusHook, _handleFocus, _handleBlur } = useFocusAndBlur(disabled, onFocus, onBlur);
    const focus = focusHook || focused;

    const type: InputType = typeProp === "date" ? "text" : typeProp;

    const _handleClick = useCallback(
        (event: React.MouseEvent<HTMLInputElement>) => {
            // If click is done outside concrete input, focus the input within
            if (inputRef.current && event.currentTarget === event.target) {
                inputRef.current.focus();
            }

            if (onClick) {
                wrapPrevent(onClick, disabled)(event);
            }
        },
        [inputRef, onClick, disabled]
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
        if (type !== "number") {
            return endAdornmentProp;
        }

        const handleIncrementClick: React.MouseEventHandler<SVGSVGElement> = (event) => {
            let newValue = (value as number) + step;
            if (max !== undefined) {
                newValue = Math.min(newValue, max);
            }

            const newEvent = patchFormEventValue(event, inputRef.current, newValue);

            onChange?.(newEvent);
            inputRef.current?.focus();
        };

        const handleDecrementClick: React.MouseEventHandler<SVGSVGElement> = (event) => {
            let newValue = (value as number) - step;
            if (min !== undefined) {
                newValue = Math.max(newValue, min);
            }

            const newEvent = patchFormEventValue(event, inputRef.current, newValue);

            onChange?.(newEvent);
            inputRef.current?.focus();
        };

        return [
            <div className="thc-c-input__number-buttons">
                <Icon className="thc-o-actionable" onClick={handleIncrementClick} role="button" size="xs" tabIndex={-1}>
                    angle-up
                </Icon>
                <Icon className="thc-o-actionable" onClick={handleDecrementClick} role="button" size="xs" tabIndex={-1}>
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
                <input
                    aria-describedby={ariaDescribedBy}
                    aria-labelledby={ariaLabelledBy}
                    autoComplete={autoComplete ? "autocomplete" : undefined}
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

export const TextField = FieldHoc(Input, "Text");
