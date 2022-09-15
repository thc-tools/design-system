// Libs
import clsx from "clsx";
import React from "react";

// Utils
import { wrapKeyUp, wrapPrevent } from "../../core/utils";

// Components
import { ListItemText } from "./ListItemText";

export interface ListItemProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className
     */
    className?: string;
    /**
     * If item is condensed
     */
    condensed?: boolean;
    /**
     * If is disabled
     */
    disabled?: boolean;
    /**
     * If is fullWidth
     */
    fullWidth?: boolean;
    /**
     * Click handler
     */
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    /**
     * Role for element
     */
    role?: string;
    /**
     * Tab index
     */
    tabIndex?: number;
}

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(function ListItem(
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
    const itemClassName = clsx(
        {
            "ds-o-actionable": !!onClick,
        },
        "ds-c-list-item",
        {
            "ds-c-list-item--condensed": condensed,
            "ds-c-list-item--fullWidth": fullWidth,
        },
        "ds-o-flex",
        className
    );
    const itemContainerClassName = "ds-c-list-item__container";

    const handleOnClick = wrapPrevent(onClick, disabled);
    const handleKeyUp = wrapKeyUp(handleOnClick);

    let child = children;
    if (typeof child === "string") {
        child = <ListItemText primary={child} />;
    }

    return (
        <li {...otherProps} className={itemClassName} disabled={disabled === true} ref={ref}>
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
