// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Components
import { Icon, ICON_SIZE } from "../icons";

export function ListItemIcon({
    accent = false,
    children,
    className,
    hover = false,
    icon,
    iconClassName: iconClassNameProp,
    iconProps,
    iconSize = ICON_SIZE.M,
    ...otherProps
}) {
    const rootClassName = classnames(
        "thc-c-list-item-icon",
        {
            "thc-c-list-item-icon--hover": hover,
            "thc-c-list-item-icon--accent": accent,
        },
        className
    );
    const iconClassName = classnames("thc-c-list-item-icon__icon", iconClassNameProp);

    return (
        <div {...otherProps} className={rootClassName}>
            <Icon {...iconProps} className={iconClassName} size={iconSize}>
                {icon ?? children}
            </Icon>
        </div>
    );
}

ListItemIcon.propTypes = {
    /**
     * If is with accent color
     */
    accent: PropTypes.bool,
    /**
     * Children to display
     */
    children: PropTypes.node,
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * If is visible on hover
     */
    hover: PropTypes.bool,
    /**
     * Icon
     */
    icon: Icon.propTypes.children,
    /**
     * Additional className for Icon
     */
    iconClassName: PropTypes.string,
    /**
     * Additional props for Icon
     */
    iconProps: PropTypes.shape(Icon.propTypes),
    /**
     * Size for Icon
     */
    iconSize: Icon.propTypes.size,
};
