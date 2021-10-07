// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { wrapKeyUp, wrapPrevent } from "../../core/utils";

// Components
import { ListItemText } from "./ListItemText";

export const ListItem = React.forwardRef(function ListItem(
    {
        children,
        className,
        condensed = false,
        disabled = false,
        fullWidth = false,
        onClick,
        role = "button",
        tabIndex = 0,
        ...otherProps
    },
    ref
) {
    const itemClassName = classnames(
        {
            "thc-o-actionable": !!onClick,
        },
        "thc-c-list-item",
        {
            "thc-c-list-item--condensed": condensed,
            "thc-c-list-item--fullWidth": fullWidth,
        },
        className
    );
    const itemContainerClassName = "thc-c-list-item__container";

    const handleOnClick = wrapPrevent(onClick, disabled);
    const handleKeyUp = wrapKeyUp(handleOnClick);

    let child = children;
    if (typeof child === "string") {
        child = <ListItemText primary={child} />;
    }

    return (
        <li {...otherProps} className={itemClassName} disabled={disabled === true} ref={ref}>
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div
                className={itemContainerClassName}
                disabled={disabled === true}
                onClick={handleOnClick}
                onKeyUp={handleKeyUp}
                role={onClick ? role : undefined}
                tabIndex={onClick ? tabIndex : undefined}
            >
                {child}
            </div>
        </li>
    );
});

ListItem.propTypes = {
    /**
     * Children
     */
    children: PropTypes.node,
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * If item is condensed
     */
    condensed: PropTypes.bool,
    /**
     * If is disabled
     */
    disabled: PropTypes.bool,
    /**
     * If is fullWidth
     */
    fullWidth: PropTypes.bool,
    /**
     * Click handler
     */
    onClick: PropTypes.func,
    /**
     * Role for element
     */
    role: PropTypes.string,
    /**
     * Tab index
     */
    tabIndex: PropTypes.number,
};
