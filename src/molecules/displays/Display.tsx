// Libs
import classnames from "classnames";
import React from "react";

// Utils
import { alterElement, wrapKeyUp, wrapLabel, wrapPrevent } from "../../core/utils";

// Components
import { Icon, IconPosition, IconProps, IconWrapper, IconWrapperProps } from "../icons";
import { Tooltip } from "../modals";

export type DisplayType = "row" | "column";

const DISPLAY_TYPES_ICON_POSITION_MAPPER: Record<DisplayType, IconPosition> = {
    row: "right",
    column: "left",
};

export interface DisplayProps extends React.PropsWithChildren<{}> {
    /**
     * Additional className for display
     */
    className?: string;
    /**
     * Helper icon
     */
    helperIcon?: IconProps["children"];
    /**
     * Additional className for helper Icon
     */
    helperIconClassName?: string;
    /**
     * Additional props for helper Icon
     */
    helperIconProps?: IconProps;
    /**
     * Helper text as a tooltip
     */
    helperText?: string;
    /**
     * Icon component
     */
    icon: IconWrapperProps["icon"];
    /**
     * Additional className for icon
     */
    iconClassName?: string;
    /**
     * Additional props for icon
     */
    iconProps?: IconWrapperProps;
    /**
     * Label
     */
    label?: string;
    /**
     * Click handler
     */
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    /**
     * Role to the display
     */
    role?: string;
    /**
     * Tab index value
     */
    tabIndex?: number;
    /**
     * Type of display
     */
    type?: DisplayType;
    /**
     * Value
     */
    value: React.ReactNode;
    /**
     * Additional className for value
     */
    valueClassName?: string;
}

export function Display({
    children,
    className,
    helperIcon = "question-circle",
    helperIconClassName: helperIconClassNameProp,
    helperIconProps,
    helperText,
    icon,
    iconClassName: iconClassNameProp,
    iconProps,
    label,
    onClick,
    role = "button",
    tabIndex = 0,
    type = "row",
    value,
    valueClassName: valueClassNameProp,
    ...otherProps
}: DisplayProps) {
    const displayClassName = classnames(
        "thc-c-display",
        {
            "thc-o-actionable": !!onClick,
            "thc-c-display--horizontal": type === "row",
            "thc-c-display--vertical": type === "column",
        },
        className
    );
    const iconClassName = classnames("thc-c-display__icon ", iconClassNameProp);
    const helperIconClassName = classnames("thc-c-display__helper-text", helperIconClassNameProp);
    const valueClassName = classnames("thc-c-display__value", valueClassNameProp);

    const handleOnClick = wrapPrevent(onClick);
    const handleKeyUp = wrapKeyUp(handleOnClick);

    let child = alterElement(value ?? children, { className: valueClassName });

    if (icon) {
        child = (
            <IconWrapper
                {...iconProps}
                className={iconClassName}
                icon={icon}
                position={DISPLAY_TYPES_ICON_POSITION_MAPPER[type]}
            >
                {child}
            </IconWrapper>
        );
    }

    return (
        /* The <div> element has a child <role> attribute that allows keyboard interaction */
        /* eslint-disable-next-line jsx-a11y/no-static-element-interactions */
        <div
            {...otherProps}
            className={displayClassName}
            onClick={handleOnClick}
            onKeyUp={handleKeyUp}
            role={onClick ? role : undefined}
            tabIndex={onClick ? tabIndex : undefined}
        >
            {label && (
                <div className="thc-c-display__label-container">
                    {alterElement(wrapLabel(label), { className: "thc-c-display__label thc-u-text--label" })}
                    {helperText && (
                        <Tooltip tooltip={helperText} placement={TOOLTIP_PLACEMENT.TOP}>
                            <Icon size="s" {...helperIconProps} className={helperIconClassName}>
                                {helperIcon}
                            </Icon>
                        </Tooltip>
                    )}
                </div>
            )}
            {child}
        </div>
    );
}
