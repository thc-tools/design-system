// Libs
import clsx from "clsx";
import React from "react";

// Utils
import { RTableCellProps, wrapKeyUp, wrapPrevent } from "../../core/utils";

// Components
import { IconWrapper } from "../icons";

export type SortDirection = "asc" | "desc";

export interface HeaderCellProps extends React.PropsWithChildren<RTableCellProps> {
    /**
     * Align content
     */
    align?: "left" | "center" | "right";
    /**
     * Additional className
     */
    className?: string;
    /**
     * If has sort
     */
    hasSort?: boolean;
    /**
     * If sort is active
     */
    isSortActive?: boolean;
    /**
     * Click handler
     */
    onSort?: (direction: SortDirection) => void | Promise<void>;
    /**
     * Additional root className
     */
    rootClassName?: string;
    /**
     * Sort direction
     */
    sortDirection?: SortDirection;
}

const SORT_OPPOSITES: Record<SortDirection, SortDirection> = {
    asc: "desc",
    desc: "asc",
};

export const HeaderCell = React.memo(function HeaderCell({
    align = "left",
    children,
    className,
    hasSort = false,
    isSortActive = false,
    onSort,
    rootClassName: rootClassNameProp,
    sortDirection = "asc",
    ...otherProps
}: HeaderCellProps) {
    const rootClassName = clsx(
        "ds-c-header-cell",
        { "ds-c-header-cell--sorted": hasSort && !!sortDirection && isSortActive },
        `ds-c-header-cell--${align}`,
        rootClassNameProp
    );

    const containerClassName = clsx(
        { "ds-o-actionable": hasSort },
        "ds-c-header-cell__container",
        "ds-u-typography--caption-medium",
        "ds-u-text--uppercase",
        className
    );

    const iconClassName = clsx("ds-c-header-cell__icon", {
        "ds-c-header-cell__icon--asc": !sortDirection || sortDirection === "asc",
        "ds-c-header-cell__icon--desc": sortDirection === "desc",
    });

    const handleClick = wrapPrevent(() => onSort(SORT_OPPOSITES[sortDirection ?? "desc"]), !hasSort);
    const handleKeyUp = wrapKeyUp(handleClick);

    return (
        <th
            {...otherProps}
            className={rootClassName}
            onClick={handleClick}
            onKeyUp={handleKeyUp}
            role="button"
            tabIndex={onSort ? 0 : -1}
        >
            <div className={containerClassName}>
                <IconWrapper
                    icon={hasSort ? "arrow-up" : undefined}
                    iconClassName={iconClassName}
                    size="s"
                    position={["left", "center"].includes(align) ? "right" : "left"}
                >
                    <div className="ds-o-flex-item--1 ds-c-header-cell__content">{children}</div>
                </IconWrapper>
            </div>
        </th>
    );
});
