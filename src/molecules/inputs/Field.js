// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { filterProps } from "../../core/utils";
import { helperTextResolver } from "./_utils";

// Components
import { ControlLabel } from "./ControlLabel";
import { FieldHelperText } from "./FieldHelperText";
import { FieldLabel } from "./FieldLabel";

// Dummy component for StoryBook to work properly with DocGen, never to be used !
export function Field(props) {
    return <div {...props}>{null}</div>;
}

Field.propTypes = {
    /**
     * Additional className for field
     */
    className: PropTypes.string,
    /**
     * Label control (if handled by underlying input component)
     */
    controlLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    /**
     * Additional className for Label control (if handled by underlying input component)
     */
    controlLabelClassName: PropTypes.string,
    /**
     * Position for label control (if handled by underlying input component)
     */
    controlLabelPosition: PropTypes.string,
    /**
     * Additional props for label control (if handled by underlying input component)
     */
    controlLabelProps: PropTypes.shape(ControlLabel.propTypes),
    /**
     * If is disabled
     */
    disabled: PropTypes.bool,
    /**
     * Error message
     */
    error: PropTypes.string,
    /**
     * Additional props for field
     */
    fieldProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    /**
     * Helper message
     */
    helperText: PropTypes.string,
    /**
     * Additional className for helper text
     */
    helperTextClassName: PropTypes.string,
    /**
     * Additional props for helper text
     */
    helperTextProps: PropTypes.shape(FieldHelperText.propTypes),
    /**
     * Identifier
     */
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * Additional className for input
     */
    inputClassName: PropTypes.string,
    /**
     * Label
     */
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    /**
     * Additional className for label
     */
    labelClassName: PropTypes.string,
    /**
     * Label component to use
     */
    LabelComponent: PropTypes.elementType,
    /**
     * Additional props for label
     */
    labelProps: PropTypes.shape(FieldLabel.propTypes),
    /**
     * If is required
     */
    required: PropTypes.bool,
    /**
     * Success message
     */
    success: PropTypes.string,
    /**
     * Warning message
     */
    warning: PropTypes.string,
};

export function FieldHoc(InputComponent, baseName) {
    const _Field = React.forwardRef(function _Field(
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

        const fieldClassName = classnames(
            "thc-c-field",
            {
                "thc-c-field--warning": hasWarning,
                "thc-c-field--error": hasError,
            },
            className
        );
        const inputClassName = classnames("thc-c-field__input", inputClassNameProp);
        const labelClassName = classnames("thc-c-field__label", labelClassNameProp);
        const helperTextClassName = classnames("thc-c-field__helper-text", helperTextClassNameProp);

        return (
            <div {...filterProps(fieldProps)} className={fieldClassName} disabled={disabled === true} ref={ref}>
                {label && (
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
                    label={controlLabel}
                    labelClassName={controlLabelClassName}
                    labelPosition={controlLabelPosition}
                    labelProps={controlLabelProps}
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

    _Field.propTypes = {
        ...InputComponent.propTypes,
        ...Field.propTypes,
    };

    return _Field;
}
