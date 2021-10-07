// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Components
import { IconWrapper, OpenCloseIcon, ICON_POSITION } from "../../molecules/icons";
import { FieldLabel } from "../../molecules/inputs";

export const FILTER_LABEL_ORDER = {
    ASC: "asc",
    DESC: "desc",
};

export const FILTER_LABEL_ORDER_REVERSE = {
    [FILTER_LABEL_ORDER.ASC]: FILTER_LABEL_ORDER.DESC,
    [FILTER_LABEL_ORDER.DESC]: FILTER_LABEL_ORDER.ASC,
};

export const FILTER_LABEL_ORDER_ICON = {
    [FILTER_LABEL_ORDER.ASC]: false,
    [FILTER_LABEL_ORDER.DESC]: true,
};

export function FilterLabel({
    children,
    className,
    iconClassName: iconClassNameProp,
    iconProps,
    label,
    onSortClick,
    sortOrder = FILTER_LABEL_ORDER.ASC,
    ...otherProps
}) {
    const rootClassName = classnames("thc-c-filter-label", className);
    const iconClassName = classnames(
        "thc-o-flex thc-o-flex--horizontal",
        "thc-c-filter-label__icon",
        iconClassNameProp
    );

    const child = label ?? children;
    return (
        <FieldLabel {...otherProps} className={rootClassName}>
            <IconWrapper
                {...iconProps}
                className={iconClassName}
                icon={<OpenCloseIcon animatedIcon="caret-down" open={FILTER_LABEL_ORDER_ICON[sortOrder]} />}
                onClick={() => onSortClick(FILTER_LABEL_ORDER_REVERSE[sortOrder])}
                position={ICON_POSITION.RIGHT}
            >
                {child}
            </IconWrapper>
        </FieldLabel>
    );
}

FilterLabel.propTypes = {
    /**
     * Children to display
     */
    children: PropTypes.node,
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * Addition Icon className
     */
    iconClassName: PropTypes.string,
    /**
     * Additional iconProps
     */
    iconProps: PropTypes.shape(IconWrapper.propTypes),
    /**
     * Label to display
     */
    label: PropTypes.node,
    /**
     * Sort click handler
     */
    onSortClick: PropTypes.func,
    /**
     * Sort order
     */
    sortOrder: PropTypes.oneOf(Object.values(FILTER_LABEL_ORDER)),
};
