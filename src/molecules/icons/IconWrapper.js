// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { alterElement } from "../../core/utils";

// Components
import { Icon, ICON_SIZE } from "./Icon";

export const ICON_POSITION = {
    TOP: "top",
    RIGHT: "right",
    BOTTOM: "bottom",
    LEFT: "left",
};

export const IconWrapper = React.forwardRef(function IconWrapper(
    {
        children,
        className,
        icon,
        iconClassName: iconClassNameProp,
        iconProps = {},
        fullWidth = false,
        onClick,
        position = ICON_POSITION.LEFT,
        size,
        ...otherProps
    },
    ref
) {
    const rootClassName = classnames(
        "thc-c-icon-wrapper",
        {
            "thc-c-icon-wrapper--full-width": fullWidth,
            "thc-c-icon-wrapper--top": ICON_POSITION.TOP === position,
            "thc-c-icon-wrapper--right": ICON_POSITION.RIGHT === position,
            "thc-c-icon-wrapper--bottom": ICON_POSITION.BOTTOM === position,
            "thc-c-icon-wrapper--left": ICON_POSITION.LEFT === position,
        },
        className
    );
    const iconClassName = classnames("thc-c-icon-wrapper__icon", iconClassNameProp, iconProps.className);

    return (
        <div {...otherProps} className={rootClassName} ref={ref}>
            {alterElement(children, { className: "thc-c-icon-wrapper__content" })}
            {icon && (
                <Icon {...iconProps} className={iconClassName} onClick={onClick} size={size}>
                    {icon}
                </Icon>
            )}
        </div>
    );
});

IconWrapper.propTypes = {
    /**
     * Children to display
     */
    children: PropTypes.node,
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * Icon
     */
    icon: Icon.propTypes.icon,
    /**
     * Additional className for Icon
     */
    iconClassName: PropTypes.string,
    /**
     * Additional props for Icon
     */
    iconProp: PropTypes.shape(Icon.propTypes),
    /**
     * If is full width
     */
    fullWidth: PropTypes.bool,
    /**
     * Click handler
     */
    onClick: PropTypes.func,
    /**
     * Position for icon
     */
    position: PropTypes.oneOf(Object.values(ICON_POSITION)),
    /**
     * Size for icon
     */
    size: PropTypes.oneOf(Object.values(ICON_SIZE)),
};
