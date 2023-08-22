// Libs
import classnames from "classnames";
import React, { useState } from "react";
import { usePopper } from "react-popper";

// Utils
import { useForkRef } from "../../core/hooks";
import { DivProps, alterElement, isReactElement } from "../../core/utils";

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

export interface TooltipProps extends React.PropsWithChildren<{}> {
    /**
     * Additional className for arrow
     */
    arrowClassName?: string;
    /**
     * Additional props for arrow
     */
    arrowProps?: DivProps;
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
    tooltipProps?: DivProps;
}

export function Tooltip({
    arrowClassName: arrowClassNameProp,
    arrowProps,
    children,
    className,
    contentClassName: contentClassNameProp,
    disabled = false,
    hasEllipsis = false,
    placement = "bottom",
    tooltip,
    tooltipTitle,
    tooltipClassName: tooltipClassNameProp,
    tooltipProps,
    ...otherProps
}: TooltipProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const [popperEl, setPopperEl] = useState<HTMLDivElement | null>(null);
    const [arrowEl, setArrowEl] = useState<HTMLDivElement | null>(null);
    const { styles, attributes } = usePopper(anchorEl, popperEl, {
        placement,
        modifiers: [
            {
                name: "flip",
                options: {
                    fallbackPlacements: ["top", "right", "bottom", "left"],
                },
            },
            { name: "arrow", options: { element: arrowEl, padding: 10 } },
            {
                name: "offset",
                options: {
                    offset: [0, 6],
                },
            },
        ],
    });

    const forkedRef = useForkRef(setAnchorEl, isReactElement(children) ? children.props.ref : null);

    const rootClassName = classnames("thc-c-tooltip", className);
    const contentClassName = classnames(
        "thc-c-tooltip__content",
        { "thc-c-tooltip__content--ellipsis": hasEllipsis },
        contentClassNameProp
    );
    const tooltipClassName = classnames("thc-c-tooltip__tooltip", tooltipClassNameProp);
    const arrowClassName = classnames("thc-c-tooltip__arrow", arrowClassNameProp);

    return (
        <div {...otherProps} className={rootClassName} disabled={disabled === true}>
            {alterElement(React.Children.only(children), {
                ref: forkedRef,
                className: contentClassName,
            })}

            {!disabled && (
                <div
                    {...tooltipProps}
                    className={tooltipClassName}
                    ref={setPopperEl}
                    style={styles.popper}
                    {...attributes.popper}
                >
                    {tooltipTitle && (
                        <div className="thc-c-tooltip__tooltip-title thc-u-text--bold">{tooltipTitle}</div>
                    )}
                    <div className="thc-c-tooltip__tooltip-content">{tooltip}</div>
                    <div
                        {...arrowProps}
                        className={arrowClassName}
                        data-popper-arrow
                        ref={setArrowEl}
                        style={styles.arrow}
                        {...attributes.arrow}
                    />
                </div>
            )}
        </div>
    );
}
