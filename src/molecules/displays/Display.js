// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { alterElement, wrapLabel, wrapKeyUp, wrapPrevent } from "../../core/utils";

// Components
import { Icon, IconWrapper, ICON_POSITION, ICON_SIZE } from "../icons";
import { Tooltip, TOOLTIP_PLACEMENT } from "../modals";

export const DISPLAY_TYPES = {
    ROW: "row",
    COLUMN: "column",
};

const DISPLAY_TYPES_ICON_POSITION_MAPPER = {
    [DISPLAY_TYPES.ROW]: ICON_POSITION.RIGHT,
    [DISPLAY_TYPES.COLUMN]: ICON_POSITION.LEFT,
};

export function Display({
    children,
    className,
    helperIcon = "question-circle",
    helperIconClassName: helperIconClassNameProp,
    helperIconProps,
    helperText,
    icon,
    iconClassName: iconClassNameProp,
    iconProps,
    label,
    onClick,
    role = "button",
    tabIndex = 0,
    type = DISPLAY_TYPES.ROW,
    value,
    valueClassName: valueClassNameProp,
    ...otherProps
}) {
    const displayClassName = classnames(
        "thc-c-display",
        {
            "thc-o-actionable": !!onClick,
            "thc-c-display--horizontal": type === DISPLAY_TYPES.ROW,
            "thc-c-display--vertical": type === DISPLAY_TYPES.COLUMN,
        },
        className
    );
    const iconClassName = classnames("thc-c-display__icon ", iconClassNameProp);
    const helperIconClassName = classnames("thc-c-display__helper-text", helperIconClassNameProp);
    const valueClassName = classnames("thc-c-display__value", valueClassNameProp);

    const handleOnClick = wrapPrevent(onClick);
    const handleKeyUp = wrapKeyUp(handleOnClick);

    let child = alterElement(value ?? children, { className: valueClassName });

    if (icon) {
        child = (
            <IconWrapper
                {...iconProps}
                className={iconClassName}
                icon={icon}
                position={DISPLAY_TYPES_ICON_POSITION_MAPPER[type]}
            >
                {child}
            </IconWrapper>
        );
    }

    return (
        /* The <div> element has a child <role> attribute that allows keyboard interaction */
        /* eslint-disable-next-line jsx-a11y/no-static-element-interactions */
        <div
            {...otherProps}
            className={displayClassName}
            onClick={handleOnClick}
            onKeyUp={handleKeyUp}
            role={onClick ? role : undefined}
            tabIndex={onClick ? tabIndex : undefined}
        >
            {label && (
                <div className="thc-c-display__label-container">
                    {alterElement(wrapLabel(label), { className: "thc-c-display__label thc-u-text--label" })}
                    {helperText && (
                        <Tooltip tooltip={helperText} placement={TOOLTIP_PLACEMENT.TOP}>
                            <Icon {...helperIconProps} className={helperIconClassName} size={ICON_SIZE.S}>
                                {helperIcon}
                            </Icon>
                        </Tooltip>
                    )}
                </div>
            )}
            {child}
        </div>
    );
}

Display.propTypes = {
    /**
     * Children to display
     */
    children: PropTypes.node,
    /**
     * Additional className for display
     */
    className: PropTypes.string,
    /**
     * Helper icon
     */
    helperIcon: PropTypes.string,
    /**
     * Additional className for helper Icon
     */
    helperIconClassName: PropTypes.string,
    /**
     * Additional props for helper Icon
     */
    helperIconProps: PropTypes.shape(Icon.propTypes),
    /**
     * Helper text as a tooltip
     */
    helperText: PropTypes.string,
    /**
     * Icon component
     */
    icon: IconWrapper.propTypes.icon,
    /**
     * Additional className for icon
     */
    iconClassName: PropTypes.string,
    /**
     * Additional props for icon
     */
    iconProps: PropTypes.shape(IconWrapper.propTypes),
    /**
     * Label
     */
    label: PropTypes.string,
    /**
     * Click handler
     */
    onClick: PropTypes.func,
    /**
     * Role to the display
     */
    role: PropTypes.string,
    /**
     * Tab index value
     */
    tabIndex: PropTypes.number,
    /**
     * Type of display
     */
    type: PropTypes.oneOf(Object.values(DISPLAY_TYPES)),
    /**
     * Value
     */
    value: PropTypes.node,
};
