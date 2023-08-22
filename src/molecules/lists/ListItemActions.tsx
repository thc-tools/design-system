// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export interface ListItemActionsProps extends React.PropsWithChildren<{}> {
    /**
     * Additional className
     */
    className?: string;
}

export function ListItemActions({ children, className }: ListItemActionsProps) {
    const rootClassName = classnames("thc-c-list-item-actions", className);

    return <div className={rootClassName}>{children}</div>;
}
