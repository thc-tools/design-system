// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Components
import { Icon, IconWrapper, ICON_SIZE, ICON_POSITION } from "../icons";
import { Tooltip } from "./Tooltip";

export function IconTooltip({
    children,
    className,
    icon = "question-circle",
    iconClassName = "thc-u-text--secondary",
    iconPosition = ICON_POSITION.RIGHT,
    iconProps,
    iconSize = ICON_SIZE.S,
    tooltip,
    tooltipClassName,
    tooltipProps,
    tooltipTitle,
    ...otherProps
}) {
    const rootClassName = classnames("thc-c-icon-tooltip", className);

    return (
        <IconWrapper
            {...otherProps}
            className={rootClassName}
            icon={
                <Tooltip {...tooltipProps} className={tooltipClassName} tooltip={tooltip} tooltipTitle={tooltipTitle}>
                    <Icon {...iconProps} className={iconClassName} size={iconSize}>
                        {icon}
                    </Icon>
                </Tooltip>
            }
            size={iconSize}
            position={iconPosition}
        >
            {children}
        </IconWrapper>
    );
}

IconTooltip.propTypes = {
    /**
     * Children to display
     */
    children: PropTypes.node,
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * Tooltip icon
     */
    icon: PropTypes.string,
    /**
     * Additional Icon className
     */
    iconClassName: PropTypes.string,
    /**
     * Icon position
     */
    iconPosition: IconWrapper.propTypes.position,
    /**
     * Additional iconProps
     */
    iconProps: PropTypes.shape(Icon.propTypes),
    /**
     * Icon size
     */
    iconSize: IconWrapper.propTypes.size,
    /**
     * Tooltip
     */
    tooltip: PropTypes.node,
    /**
     * Additional Tooltip className
     */
    tooltipClassName: PropTypes.string,
    /**
     * Additional Tooltip props
     */
    tooltipProps: PropTypes.shape(Tooltip.propTypes),
    /**
     * Tooltip title
     */
    tooltipTitle: PropTypes.node,
};
