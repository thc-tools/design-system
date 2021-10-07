// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { wrapLabel } from "../../core/utils";

// Components
import { IconWrapper, ICON_POSITION } from "../icons";

export const DISPLAY_RESOURCE_STATUS = {
    INFO: "info",
    SUCCESS: "success",
    WARNING: "warning",
    ERROR: "error",
};

export const DisplayResource = React.forwardRef(function DisplayResource(
    {
        className,
        disabled = false,
        helper,
        icon,
        iconPosition = ICON_POSITION.LEFT,
        iconProps,
        iconSize,
        fullWidth = false,
        label,
        labelClassName: labelClassNameProp,
        status,
        ...otherProps
    },
    ref
) {
    const rootClassName = classnames(
        "thc-c-display-resource",
        { "thc-c-display-resource--full-width": fullWidth },
        className
    );

    const containerClassName = classnames("thc-c-display-resource__container", {
        "thc-c-display-resource__container--full-width": fullWidth,
    });

    const labelClassName = classnames(
        "thc-c-display-resource__label",
        {
            "thc-c-display-resource__label--full-width": fullWidth,
        },
        labelClassNameProp
    );

    const helperClassName = classnames("thc-c-display-resource__helper", {
        [`thc-u-status--${status}`]: !disabled && status,
    });

    const iconClassName = classnames("thc-c-display-resource__icon", {
        [`thc-u-status--${status}`]: !disabled && status,
    });

    let content = (
        <div className={containerClassName}>
            {label && <div className={labelClassName}>{wrapLabel(label)}</div>}
            {helper && <div className={helperClassName}>{wrapLabel(helper)}</div>}
        </div>
    );

    if (icon) {
        content = (
            <IconWrapper
                icon={icon}
                iconProps={{ ...iconProps, className: iconClassName }}
                position={iconPosition}
                size={iconSize}
                fullWidth={fullWidth}
            >
                {content}
            </IconWrapper>
        );
    }

    return (
        <div {...otherProps} className={rootClassName} disabled={disabled === true} ref={ref}>
            {content}
        </div>
    );
});

DisplayResource.propTypes = {
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * If is disabled
     */
    disabled: PropTypes.bool,
    /**
     * Add the fullWidth for the DisplayResource child
     */
    fullWidth: PropTypes.bool,
    /**
     * Helper text
     */
    helper: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    /**
     * Icon
     */
    icon: IconWrapper.propTypes.icon,
    /**
     * Icon size
     */
    iconSize: IconWrapper.propTypes.size,
    /**
     * Label
     */
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    /**
     * Optional status
     */
    status: PropTypes.oneOf(Object.values(DISPLAY_RESOURCE_STATUS)),
};
