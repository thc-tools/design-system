// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { alterElement, filterProps } from "../../core/utils";

// Components
import { Icon, hasIcon } from "../icons";

export function InputAdornment({ children, className, onClick, ...otherProps }) {
    if (!children) {
        return null;
    }

    const rootClassName = classnames("thc-c-input-adornment", { "thc-o-actionable": Boolean(onClick) }, className);

    let child;

    if (typeof children === "string" && hasIcon(children)) {
        child = <Icon onClick={onClick}>{children}</Icon>;
    } else {
        child = alterElement(children, { onClick });
    }

    return (
        <div {...filterProps(otherProps)} className={rootClassName}>
            {child}
        </div>
    );
}

InputAdornment.propTypes = {
    /**
     * Content of the Adornment
     */
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    /**
     * Additional className for the Adornment
     */
    className: PropTypes.string,
};
