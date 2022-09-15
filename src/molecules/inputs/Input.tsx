// Libs
import clsx from "clsx";
import React, { useCallback, useMemo, useRef } from "react";

// Utils
import { useFocusAndBlur, useForkRef } from "../../core/hooks";
import {
    RDivProps,
    arrayify,
    filterProps,
    isReactElement,
    patchFormEventValue,
    wrapKeyUp,
    wrapPrevent,
} from "../../core/utils";

// Components
import { FieldLabel, FieldLabelProps } from "src/design-system/molecules/inputs/FieldLabel";
import { Icon } from "../icons";
import { FieldHoc } from "./Field";
import { InputAdornment, InputAdornmentProps } from "./InputAdornment";

export type InputType = "text" | "password" | "number" | "date";

function _adornmentWrapper(adornmentClassName: string, adornmentProps = {}) {
    return (component: React.ReactNode) => {
        if (isReactElement(component) && component.type === InputAdornment) {
            return React.cloneElement(component, {
                ...adornmentProps,
                className: clsx(adornmentClassName, component.props.className),
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
    "adornmentClassName"?: string;
    /**
     * Additional props for adornment
     */
    "adornmentProps"?: InputAdornmentProps;
    /**
     * If authorize auto complete
     */
    "autoComplete"?: boolean;
    /**
     * Additional className for the Input
     */
    "className"?: string;
    /**
     * Additional className for the container
     */
    "containerClassName"?: string;
    /**
     * Additional props for the container
     */
    "containerProps"?: RDivProps;
    /**
     * Container ref
     */
    "containerRef"?: React.Ref<HTMLDivElement>;
    /**
     * If is disabled
     */
    "disabled"?: boolean;
    /**
     * End adornment element(s)
     */
    "endAdornment"?: React.ReactNode;
    /**
     * If has full width
     */
    "hasFullWidth"?: boolean;
    /**
     * If is focused
     */
    "focused"?: boolean;
    /**
     * If has a background
     */
    "hasBackground"?: boolean;
    /**
     * If has an error
     */
    "hasError"?: boolean;
    /**
     * Identifier
     */
    "id"?: string;
    /**
     * Underlying input component
     */
    "InputComponent"?: React.FunctionComponent<any> | React.ComponentClass<any> | string;
    /**
     * Props for the underlying input component
     */
    "inputProps"?:
        | React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
        | React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
    /**
     * Additional className for the underlying input component
     */
    "inputClassName"?: string;
    /**
     * Label
     */
    "label"?: string;
    /**
     * Additional label classNAme
     */
    "labelClassName"?: string;
    /**
     * Additional label props
     */
    "labelProps"?: FieldLabelProps;
    /**
     * Max possible value
     */
    "max"?: number;
    /**
     * Min possible value
     */
    "min"?: number;
    /**
     * If is multiline (textarea)
     */
    "multiline"?: boolean;
    /**
     * Name of input
     */
    "name": string;
    /**
     * Change handler
     */
    "onChange"?: React.ChangeEventHandler<HTMLInputElement>;
    /**
     * Click handler
     */
    "onClick"?: React.MouseEventHandler<HTMLDivElement>;
    /**
     * Blur handler
     */
    "onBlur"?: React.FocusEventHandler<HTMLInputElement>;
    /**
     * Focus handler
     */
    "onFocus"?: React.FocusEventHandler<HTMLInputElement>;
    /**
     * Placeholder
     */
    "placeholder"?: string;
    /**
     * If is readonly
     */
    "readOnly"?: boolean;
    /**
     * If is required
     */
    "required"?: boolean;
    /**
     * Number of rows (if multiline)
     */
    "rows"?: number;
    /**
     * If should show min/max
     */
    "showMinMax"?: boolean;
    /**
     * If should show increment/decrement
     */
    "showIncrementDecrement"?: boolean;
    /**
     * Start adornment element(s)
     */
    "startAdornment"?: React.ReactNode;
    /**
     * Step
     */
    "step"?: number;
    /**
     * Input size
     */
    "size"?: "s" | "m" | "l";
    /**
     * Value
     */
    "value"?: string | number | undefined;
    /**
     * Type of input
     */
    "type"?: InputType;
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
        "adornmentClassName": adornmentClassNameProp,
        adornmentProps,
        autoComplete,
        className,
        "containerClassName": containerClassNameProp,
        containerProps,
        containerRef,
        disabled = false,
        "endAdornment": endAdornmentProp,
        focused = false,
        hasBackground = true,
        hasFullWidth = false,
        hasError = false,
        id,
        "inputClassName": inputClassNameProp,
        "InputComponent": InputComponentProp = "input",
        "inputProps": inputPropsProp,
        label,
        "labelClassName": labelClassNameProp,
        labelProps,
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
        showIncrementDecrement = true,
        startAdornment,
        step = 1,
        size,
        value,
        "type": typeProp = "text",
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

    const rootClassName = clsx("ds-c-input", className);
    const containerClassName = clsx(
        "ds-c-input__container",
        {
            "ds-c-input--full-width": hasFullWidth,
            "ds-c-input--error": hasError && !disabled,
            "ds-c-input--focus": focus,
            "ds-c-input__container--no-background": !hasBackground,
            "ds-c-input__container--with-label": !!label,
            "ds-c-input__container--S": size === "s",
            "ds-c-input__container--M": size === "m",
            "ds-c-input__container--L": size === "l",
        },
        containerClassNameProp
    );
    const inputClassName = clsx("ds-c-input__input ds-u-typography--subtitle", inputClassNameProp);
    const adornmentClassName = clsx("ds-c-input__adornment", adornmentClassNameProp);
    const labelClassName = clsx("ds-c-input__label ds-u-typography--body", labelClassNameProp);

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
        if (type !== "number" || !showIncrementDecrement) {
            return endAdornmentProp;
        }

        const handleIncrementClick: React.MouseEventHandler<SVGSVGElement> = (event) => {
            let newValue = (value as number) + step;
            if (max !== undefined) {
                newValue = Math.min(newValue, max);
            }

            const newEvent = patchFormEventValue(event, inputRef.current, newValue);

            onChange?.(newEvent as unknown as React.ChangeEvent<HTMLInputElement>);
            inputRef.current?.focus();
        };

        const handleDecrementClick: React.MouseEventHandler<SVGSVGElement> = (event) => {
            let newValue = (value as number) - step;
            if (min !== undefined) {
                newValue = Math.max(newValue, min);
            }

            const newEvent = patchFormEventValue(event, inputRef.current, newValue);

            onChange?.(newEvent as unknown as React.ChangeEvent<HTMLInputElement>);
            inputRef.current?.focus();
        };

        return [
            <div className="ds-c-input__number-buttons" key="number-actions">
                <Icon className="ds-o-actionable" onClick={handleIncrementClick} role="button" size="xs" tabIndex={-1}>
                    angle-up
                </Icon>
                <Icon className="ds-o-actionable" onClick={handleDecrementClick} role="button" size="xs" tabIndex={-1}>
                    angle-down
                </Icon>
            </div>,
            ...arrayify(endAdornmentProp),
        ];
    }, [endAdornmentProp, max, min, onChange, step, type, value]);

    return (
        <div {...filterProps(otherProps)} className={rootClassName} ref={containerRef}>
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
                {label && (
                    <FieldLabel
                        className={labelClassName}
                        disabled={disabled}
                        hasError={hasError}
                        id={`${id}-label`}
                        required={required}
                        {...labelProps}
                    >
                        {label}
                    </FieldLabel>
                )}
                <InputComponent
                    aria-describedby={ariaDescribedBy}
                    aria-labelledby={ariaLabelledBy}
                    autoComplete={autoComplete ? "autocomplete" : undefined}
                    className={inputClassName}
                    id={id ?? name}
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
                >
                    {InputComponent === "div" ? value : null}
                </InputComponent>
                {endAdornment &&
                    React.Children.map(endAdornment, _adornmentWrapper(adornmentClassName, adornmentProps))}
            </div>
            {showMinMax && (min !== undefined || max !== undefined) && (
                <div className="ds-c-input__min-max">
                    <div>{min}</div>
                    <div>{max}</div>
                </div>
            )}
        </div>
    );
});

export const TextField = FieldHoc(Input, "Text", { innerLabel: true });
