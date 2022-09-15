// Libs
import clsx from "clsx";
import React from "react";

// Utils
import { RDivProps, filterProps } from "../../core/utils";
import { helperTextResolver } from "./_utils";

// Components
import { ControlLabelPosition, ControlLabelProps } from "./ControlLabel";
import { FieldHelperText, FieldHelperTextProps } from "./FieldHelperText";
import { FieldLabel, FieldLabelProps } from "./FieldLabel";

export interface FieldProps {
    /**
     * Additional className for field
     */
    className?: string;
    /**
     * Label control (if handled by underlying input component)
     */
    controlLabel?: React.ReactNode;
    /**
     * Additional className for Label control (if handled by underlying input component)
     */
    controlLabelClassName?: string;
    /**
     * Position for label control (if handled by underlying input component)
     */
    controlLabelPosition?: ControlLabelPosition;
    /**
     * Additional props for label control (if handled by underlying input component)
     */
    controlLabelProps?: ControlLabelProps;
    /**
     * If is disabled
     */
    disabled?: boolean;
    /**
     * Error message
     */
    error?: string;
    /**
     * Additional props for field
     */
    fieldProps?: RDivProps;
    /**
     * Helper message
     */
    helperText?: string;
    /**
     * Additional className for helper text
     */
    helperTextClassName?: string;
    /**
     * Additional props for helper text
     */
    helperTextProps?: FieldHelperTextProps;
    /**
     * Identifier
     */
    id?: string;
    /**
     * Additional className for input
     */
    inputClassName?: string;
    /**
     * Label
     */
    label?: React.ReactNode;
    /**
     * Additional className for label
     */
    labelClassName?: string;
    /**
     * Label component to use
     */
    LabelComponent?: React.FunctionComponent<any> | React.ComponentClass<any> | string;
    /**
     * Additional props for label
     */
    labelProps?: FieldLabelProps;
    /**
     * If is required
     */
    required?: boolean;
    /**
     * Success message
     */
    success?: string;
    /**
     * Warning message
     */
    warning?: string;
}

// Dummy component for StoryBook to work properly with DocGen, never to be used !
export function Field(props: FieldProps) {
    return <div {...props}>{null}</div>;
}

export function FieldHoc<P extends RDivProps = any>(
    InputComponent: React.FunctionComponent<any>,
    baseName: string,
    { innerLabel = false }: { innerLabel?: boolean } = {}
): React.ForwardRefExoticComponent<React.PropsWithoutRef<P & FieldProps> & React.RefAttributes<HTMLDivElement>> {
    const _Field = React.forwardRef<HTMLDivElement, P & FieldProps>(function _Field(
        {
            className,
            controlLabel,
            controlLabelClassName,
            controlLabelPosition,
            controlLabelProps,
            disabled = false,
            error,
            fieldProps,
            helperText,
            helperTextClassName: helperTextClassNameProp,
            helperTextProps,
            id,
            inputClassName: inputClassNameProp,
            label,
            labelClassName: labelClassNameProp,
            LabelComponent = FieldLabel,
            labelProps,
            required,
            success,
            warning,
            ...otherProps
        },
        ref
    ) {
        const { hasError, hasSuccess, hasWarning, helperTextMessage } = helperTextResolver(
            disabled,
            error,
            success,
            warning,
            helperText
        );

        const fieldClassName = clsx(
            "ds-c-field",
            {
                "ds-c-field--warning": hasWarning,
                "ds-c-field--error": hasError,
            },
            className
        );
        const inputClassName = clsx("ds-c-field__input", inputClassNameProp);
        const labelClassName = clsx("ds-c-field__label", labelClassNameProp);
        const helperTextClassName = clsx("ds-c-field__helper-text", helperTextClassNameProp);

        return (
            <div {...filterProps(fieldProps)} className={fieldClassName} disabled={disabled === true} ref={ref}>
                {label && !innerLabel && (
                    <LabelComponent
                        className={labelClassName}
                        disabled={disabled}
                        id={`${id}-label`}
                        hasError={hasError}
                        required={required}
                        {...labelProps}
                    >
                        {label}
                    </LabelComponent>
                )}
                <InputComponent
                    {...otherProps}
                    aria-labelledby={label ? `${id}-label` : undefined}
                    aria-describedby={helperTextMessage ? `${id}-description` : undefined}
                    className={inputClassName}
                    label={innerLabel ? label : controlLabel}
                    labelClassName={innerLabel ? labelClassNameProp : controlLabelClassName}
                    labelPosition={controlLabelPosition}
                    labelProps={innerLabel ? labelProps : controlLabelProps}
                    disabled={disabled}
                    hasError={hasError}
                    id={id}
                    required={required}
                />
                {helperTextMessage && (
                    <FieldHelperText
                        {...helperTextProps}
                        className={helperTextClassName}
                        disabled={disabled}
                        id={`${id}-description`}
                        hasError={hasError}
                        hasSuccess={hasSuccess}
                        hasWarning={hasWarning}
                    >
                        {helperTextMessage}
                    </FieldHelperText>
                )}
            </div>
        );
    });

    _Field.displayName = `${baseName ?? InputComponent.displayName}Field`;

    return _Field;
}
