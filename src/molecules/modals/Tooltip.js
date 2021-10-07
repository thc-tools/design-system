// Libs
import React, { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { usePopper } from "react-popper";

// Utils
import { useForkRef } from "../../core/hooks";
import { alterElement } from "../../core/utils";

export const TOOLTIP_PLACEMENT = {
    AUTO: "auto",
    AUTO_START: "auto-start",
    AUTO_END: "auto-end",
    TOP: "top",
    TOP_START: "top-start",
    TOP_END: "top-end",
    BOTTOM: "bottom",
    BOTTOM_START: "bottom-start",
    BOTTOM_END: "bottom-end",
    RIGHT: "right",
    RIGHT_START: "right-start",
    RIGHT_END: "right-end",
    LEFT: "left",
    LEFT_START: "left-start",
    LEFT_END: "left-end",
};

export function Tooltip({
    arrowClassName: arrowClassNameProp,
    arrowProps,
    children,
    className,
    contentClassName: contentClassNameProp,
    disabled = false,
    hasEllipsis = false,
    placement = TOOLTIP_PLACEMENT.BOTTOM,
    tooltip,
    tooltipTitle,
    tooltipClassName: tooltipClassNameProp,
    tooltipProps,
    ...otherProps
}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [popperEl, setPopperEl] = useState(null);
    const [arrowEl, setArrowEl] = useState(null);
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

    const forkedRef = useForkRef(setAnchorEl, children?.props.ref);

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

Tooltip.propTypes = {
    /**
     * Additional className for arrow
     */
    arrowClassName: PropTypes.string,
    /**
     * Additional props for arrow
     */
    arrowProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    /**
     * Children to anchor to
     */
    children: PropTypes.element,
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * If is disabled
     */
    disabled: PropTypes.bool,
    /**
     * If has ellipsis
     */
    hasEllipsis: PropTypes.bool,
    /**
     * Placement of tooltip
     */
    placement: PropTypes.oneOf(Object.values(TOOLTIP_PLACEMENT)),
    /**
     * Tooltip content
     */
    tooltip: PropTypes.node,
    /**
     * Tooltip title
     */
    tooltipTitle: PropTypes.node,
    /**
     * Additional className for tooltip
     */
    tooltipClassName: PropTypes.string,
    /**
     * Additional props for tooltip
     */
    tooltipProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};
