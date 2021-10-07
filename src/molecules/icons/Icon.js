// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { alterElement } from "../../core/utils";

// Icons
import icons from "./icons.json";

export const ICONS = Object.keys(icons);

export const ICON_SIZE = {
    XS: "xs",
    S: "s",
    M: "m",
    L: "l",
};

export function hasIcon(iconName) {
    return ICONS.includes(iconName);
}

export const Icon = React.forwardRef(function Icon(
    { children, className, icon, size = ICON_SIZE.M, ...otherProps },
    ref
) {
    const iconClassName = classnames(
        "thc-c-icon",
        {
            "thc-u-icon--XS": size === ICON_SIZE.XS,
            "thc-u-icon--S": size === ICON_SIZE.S,
            "thc-u-icon--M": size === ICON_SIZE.M,
            "thc-u-icon--L": size === ICON_SIZE.L,
        },
        className
    );

    const iconName = icon ?? children;

    if (typeof iconName !== "string") {
        return alterElement(iconName, { className: iconClassName, ...otherProps });
    }

    if (!hasIcon(iconName)) {
        return <span style={{ color: "red", textDecoration: "underline", margin: "5px" }}>{iconName}</span>;
    }

    const traces = icons[iconName];

    return (
        <svg
            className={iconClassName}
            data-icon={iconName}
            fill="none"
            ref={ref}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            {...otherProps}
        >
            {traces.map((trace, i) => (
                <path
                    className="thc-c-icon__path"
                    key={i}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d={trace}
                    fill="currentcolor"
                />
            ))}
        </svg>
    );
});

Icon.propTypes = {
    /**
     * Icon to display
     */
    children: PropTypes.oneOfType([PropTypes.oneOf(ICONS), PropTypes.node]),
    /**
     * Additional className for icon
     */
    className: PropTypes.string,
    /**
     * Icon to display
     */
    icon: PropTypes.oneOfType([PropTypes.oneOf(ICONS), PropTypes.node]),
    /**
     * Icon size
     */
    size: PropTypes.oneOf(Object.values(ICON_SIZE)),
};
