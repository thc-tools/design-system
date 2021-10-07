// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { wrapPrevent } from "../../core/utils";

export function Overlay({ className, invisible = false, onClick, open = false, ...otherProps }) {
    const overlayClassName = classnames(
        "thc-c-overlay",
        {
            "thc-c-overlay--invisible": invisible,
        },
        className
    );

    const handleClick = wrapPrevent(onClick);

    if (!open) {
        return null;
    }

    return <div aria-hidden className={overlayClassName} onClick={handleClick} {...otherProps} />;
}

Overlay.propTypes = {
    /**
     * Additional className to overlay
     */
    className: PropTypes.string,
    /**
     * If overlay is invisible
     */
    invisible: PropTypes.bool,
    /**
     * Click handler
     */
    onClick: PropTypes.func,
    /**
     * If is open
     */
    open: PropTypes.bool,
};
