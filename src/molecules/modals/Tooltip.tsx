// Libs
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { usePopper } from "react-popper";

// Utils
import { Portal } from "src/design-system/molecules/modals/Portal";
import { TooltipContent } from "src/design-system/molecules/modals/TooltipContent";
import { TooltipTitle } from "src/design-system/molecules/modals/TooltipTitle";
import { useForkRef, useHover } from "../../core/hooks";
import { RDivProps, alterElement, isReactElement } from "../../core/utils";

export type TooltipPlacement =
    | "auto"
    | "auto-start"
    | "auto-end"
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "right"
    | "right-start"
    | "right-end"
    | "left"
    | "left-start"
    | "left-end";

export type TooltipSize = "xxs" | "xs" | "s" | "m" | "l" | "fit";

export interface TooltipProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className for arrow
     */
    arrowClassName?: string;
    /**
     * Additional props for arrow
     */
    arrowProps?: RDivProps;
    /**
     * Additional className
     */
    className?: string;
    /**
     * Additional className for content
     */
    contentClassName?: string;
    /**
     * If is disabled
     */
    disabled?: boolean;
    /**
     * If has ellipsis
     */
    hasEllipsis?: boolean;
    /**
     * Placement of tooltip
     */
    placement?: TooltipPlacement;
    /**
     * Size of tooltip
     */
    size?: TooltipSize;
    /**
     * Tooltip content
     */
    tooltip?: React.ReactNode;
    /**
     * Tooltip title
     */
    tooltipTitle?: React.ReactNode;
    /**
     * Additional className for tooltip
     */
    tooltipClassName?: string;
    /**
     * Additional props for tooltip
     */
    tooltipProps?: RDivProps;
}

export function Tooltip({
    children,
    className: classNameProp,
    contentClassName: contentClassNameProp,
    disabled = false,
    hasEllipsis = false,
    placement = "top",
    tooltip,
    tooltipTitle,
    tooltipProps,
    size = "fit",
}: TooltipProps): JSX.Element {
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const [popperEl, setPopperEl] = useState<HTMLDivElement | null>(null);
    const { styles, attributes, update } = usePopper(anchorEl, popperEl, {
        placement,
        modifiers: [
            {
                name: "flip",
                options: {
                    fallbackPlacements: ["top", "right", "bottom", "left"],
                },
            },
            {
                name: "offset",
                options: {
                    offset: [0, 6],
                },
            },
        ],
    });

    const className = clsx(
        "ds-c-tooltip",
        {
            "ds-c-tooltip--L": size === "l",
            "ds-c-tooltip--M": size === "m",
            "ds-c-tooltip--S": size === "s",
            "ds-c-tooltip--XS": size === "xs",
            "ds-c-tooltip--XXS": size === "xxs",
            "ds-c-tooltip--fit-content": size === "fit",
        },
        classNameProp
    );
    const contentClassName = clsx(
        "ds-c-tooltip__chip",
        { "ds-c-tooltip__child--ellipsis": hasEllipsis },

        contentClassNameProp
    );

    const child = React.Children.only(children);
    const forkedRef = useForkRef(setAnchorEl, isReactElement(child) ? child.props.ref : null);
    const { hover, onMouseEnter, onMouseLeave } = useHover(disabled, (hover) => {
        if (hover && update) {
            update();
        }
    });

    useEffect(() => {
        if (!anchorEl) {
            return;
        }

        anchorEl.addEventListener("mouseenter", onMouseEnter);
        anchorEl.addEventListener("mouseleave", onMouseLeave);

        return () => {
            anchorEl.removeEventListener("mouseenter", onMouseEnter);
            anchorEl.removeEventListener("mouseleave", onMouseLeave);
        };
    }, [anchorEl, onMouseEnter, onMouseLeave]);

    return (
        <>
            {alterElement(child, {
                ref: forkedRef,
                className: contentClassName,
            })}

            {!disabled && (tooltipTitle || tooltip) && hover && (
                <Portal>
                    <div
                        {...tooltipProps}
                        className={className}
                        ref={setPopperEl}
                        style={styles.popper}
                        {...attributes.popper}
                        data-show={hover.toString()}
                    >
                        {tooltipTitle && <TooltipTitle>{tooltipTitle}</TooltipTitle>}
                        {typeof tooltip === "string" ? <TooltipContent>{tooltip}</TooltipContent> : tooltip}
                    </div>
                </Portal>
            )}
        </>
    );
}
