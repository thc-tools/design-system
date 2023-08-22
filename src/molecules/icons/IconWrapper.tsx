// Libs
import classnames from "classnames";
import React from "react";

// Utils
import { alterElement } from "../../core/utils";

// Components
import { Icon, IconProps, IconSize, Icons } from "./Icon";

export type IconPosition = "top" | "right" | "bottom" | "left";

export interface IconWrapperProps extends React.PropsWithChildren<{}> {
    /**
     * Additional className
     */
    className?: string;
    /**
     * Icon
     */
    icon: Icons | React.ReactNode;
    /**
     * Additional className for Icon
     */
    iconClassName?: string;
    /**
     * Additional props for Icon
     */
    iconProps?: IconProps;
    /**
     * If is full width
     */
    fullWidth?: boolean;
    /**
     * Click handler
     */
    onClick?: React.MouseEventHandler<SVGSVGElement>;
    /**
     * Position for icon
     */
    position?: IconPosition;
    /**
     * Size for icon
     */
    size?: IconSize;
}

export const IconWrapper = React.forwardRef<HTMLDivElement, IconWrapperProps>(function IconWrapper(
    {
        children,
        className,
        icon,
        iconClassName: iconClassNameProp,
        iconProps = {},
        fullWidth = false,
        onClick,
        position = "left",
        size,
        ...otherProps
    },
    ref
) {
    const rootClassName = classnames(
        "thc-c-icon-wrapper",
        {
            "thc-c-icon-wrapper--full-width": fullWidth,
            "thc-c-icon-wrapper--top": position === "top",
            "thc-c-icon-wrapper--right": position === "right",
            "thc-c-icon-wrapper--bottom": position === "bottom",
            "thc-c-icon-wrapper--left": position === "left",
        },
        className
    );
    const iconClassName = classnames("thc-c-icon-wrapper__icon", iconClassNameProp, iconProps.className);

    return (
        <div {...otherProps} className={rootClassName} ref={ref}>
            {alterElement(children, { className: "thc-c-icon-wrapper__content" })}
            {icon && (
                <Icon {...iconProps} className={iconClassName} onClick={onClick} size={size}>
                    {icon}
                </Icon>
            )}
        </div>
    );
});
