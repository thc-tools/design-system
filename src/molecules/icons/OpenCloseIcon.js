// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { wrapPrevent, wrapKeyUp } from "../../core/utils";

// Components
import { Icon } from "./Icon";

export function OpenCloseIcon({
    animatedIcon = "angle-down",
    className,
    disabled = false,
    onClick,
    open = false,
    ...otherProps
}) {
    const rootClassName = classnames(
        "thc-o-actionable",
        "thc-c-open-close-icon",
        {
            "thc-c-open-close-icon--open": open,
            "thc-c-open-close-icon--close": !open,
        },
        className
    );

    const handleClick = wrapPrevent(onClick, disabled);
    const handleKeyUp = wrapKeyUp(handleClick);

    return (
        <Icon
            {...otherProps}
            className={rootClassName}
            onKeyUp={handleKeyUp}
            onClick={handleClick}
            role="button"
            tabIndex={0}
        >
            {animatedIcon}
        </Icon>
    );
}

OpenCloseIcon.propTypes = {
    /**
     * Icon to animate
     */
    animatedIcon: PropTypes.string,
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * If is open
     */
    open: PropTypes.bool,
};
