// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { useHover } from "../../core/hooks";
import { wrapPrevent, wrapKeyUp } from "../../core/utils";

// Components
import { IconWrapper, ICON_POSITION, ICON_SIZE } from "../icons";

export const HeaderCell = React.memo(function HeaderCell({
    children,
    className,
    disabled = false,
    icon,
    iconClassName,
    iconProps,
    onClick,
    ...otherProps
}) {
    const { hover, ...hoverEvents } = useHover(disabled);

    const rootClassName = classnames(
        { "thc-theme--color": hover },
        "thc-o-actionable",
        "thc-c-header-cell",
        "thc-u-text--subtitle-bold",
        className
    );

    const handleClick = wrapPrevent(onClick);
    const handleKeyUp = wrapKeyUp(handleClick);

    return (
        <div
            {...otherProps}
            className={rootClassName}
            onClick={handleClick}
            onKeyUp={handleKeyUp}
            {...hoverEvents}
            role="button"
            tabIndex={onClick ? 0 : -1}
        >
            <IconWrapper
                className={iconClassName}
                icon={icon}
                fullWidth
                size={ICON_SIZE.M}
                position={ICON_POSITION.RIGHT}
                {...iconProps}
            >
                <div className="thc-o-flex-item--1 thc-c-header-cell__content">{children}</div>
            </IconWrapper>
        </div>
    );
});

HeaderCell.propTypes = {
    /**
     * Children to display
     */
    children: PropTypes.node,
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * If is disabled
     */
    disabled: PropTypes.bool,
    /**
     * Icon
     */
    icon: PropTypes.string,
    /**
     * Additional className for Icon
     */
    iconClassName: PropTypes.string,
    /**
     * Additional props for Icon
     */
    iconProps: PropTypes.shape(IconWrapper.propTypes),
};
