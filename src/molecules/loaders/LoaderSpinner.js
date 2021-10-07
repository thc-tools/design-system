// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Icons
import { Icon } from "../icons";

export function LoaderSpinner({ className, iconClassName: iconClassNameProp, iconProps, isLoading = false }) {
    const rootClassName = classnames(
        "thc-c-loader-spinner",
        {
            "thc-c-loader-spinner--loading": isLoading,
        },
        className
    );
    const iconClassName = classnames("thc-c-loader-spinner__icon", iconClassNameProp);

    return (
        <div className={rootClassName}>
            {isLoading && (
                <Icon {...iconProps} className={iconClassName}>
                    dot
                </Icon>
            )}
        </div>
    );
}

LoaderSpinner.propTypes = {
    /**
     * Additional className for loader
     */
    className: PropTypes.string,
    /**
     * Additional className for the icon
     */
    iconClassName: PropTypes.string,
    /**
     * Additional props for the icon
     */
    iconProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    /**
     * If is loading
     */
    isLoading: PropTypes.bool,
};
