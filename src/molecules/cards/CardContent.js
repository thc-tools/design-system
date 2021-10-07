// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { wrapLabel } from "../../core/utils";

export function CardContent({ children, className, ...otherProps }) {
    const contentClassName = classnames("thc-c-card__content", className);

    const wrappedChild = wrapLabel(children);

    return (
        <div className={contentClassName} {...otherProps}>
            {wrappedChild}
        </div>
    );
}

CardContent.propTypes = {
    /**
     * Content of card
     */
    children: PropTypes.node,
    /**
     * Additional className for content
     */
    className: PropTypes.string,
};
