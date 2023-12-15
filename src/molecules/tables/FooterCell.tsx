// Libs
import clsx from "clsx";
import React from "react";
import { RTableCellProps } from "src/design-system/core/utils";

// Components

export interface FooterCellProps extends React.PropsWithChildren<RTableCellProps> {
    /**
     * Additional className
     */
    className?: string;
    /**
     * If no spacing
     */
    noSpacing?: boolean;
}

export function FooterCell({
    children,
    className: classNameProp,
    noSpacing = false,
    ...otherProps
}: FooterCellProps): JSX.Element {
    const className = clsx("ds-c-footer-cell", { "ds-c-footer-cell--spaced": !noSpacing }, classNameProp);

    return (
        <td {...otherProps} className={className}>
            <div className="ds-c-footer-cell__container ds-u-typography--body">{children}</div>
        </td>
    );
}
