// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export const PAGE_CONTENT_TYPES = {
    centered: "centered",
    default: "default",
    flex: "flex",
    withPanel: "withPanel",
};

export function PageContent({
    children,
    className,
    fullHeight = false,
    fullWidth = false,
    type = PAGE_CONTENT_TYPES.default,
}) {
    const rootClassName = classnames(
        "thc-c-page-content",
        {
            "thc-c-page-content--centered": type === PAGE_CONTENT_TYPES.centered,
            "thc-c-page-content--flex": type === PAGE_CONTENT_TYPES.flex,
            "thc-c-page-content--full-height": fullHeight,
            "thc-c-page-content--full-width": fullWidth,
            "thc-c-page-content--with-panel": type === PAGE_CONTENT_TYPES.withPanel,
        },
        className
    );

    if (type === PAGE_CONTENT_TYPES.withPanel) {
        const childrenArray = React.Children.toArray(children);

        return (
            <div className={rootClassName}>
                <div className="thc-c-page-content--with-panel__panel thc-o-paper">{childrenArray[0]}</div>
                <div className="thc-c-page-content--with-panel__detail">{childrenArray.slice(1)}</div>
            </div>
        );
    }

    return <div className={rootClassName}>{children}</div>;
}

PageContent.propTypes = {
    /**
     * Children to display
     */
    children: PropTypes.node,
    /**
     * If is full height
     */
    fullHeight: PropTypes.bool,
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * If is full width
     */
    fullWidth: PropTypes.bool,
    /**
     * Type of page layout
     */
    type: PropTypes.oneOf(Object.values(PAGE_CONTENT_TYPES)),
};
