// Libs
import classnames from "classnames";
import React from "react";

export interface ListProps extends React.PropsWithChildren<{}> {
    /**
     * Additional className
     */
    className?: string;
    /**
     * If has separator
     */
    hasSeparator?: boolean;
}

export const List = React.forwardRef<HTMLUListElement, ListProps>(function List(
    { children, className, hasSeparator = false, ...otherProps },
    ref
) {
    const listClassName = classnames("thc-c-list", { "thc-c-list--separator": hasSeparator }, className);

    return (
        <ul {...otherProps} className={listClassName} ref={ref}>
            {children}
        </ul>
    );
});
