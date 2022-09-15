// Libs
import clsx from "clsx";
import React from "react";
import useResizeAware from "react-resize-aware";
import { wrapLabel } from "src/design-system/core/utils";
import { IconPosition, IconSize, IconWrapper, IconWrapperProps, Icons } from "src/design-system/molecules/icons";

// Components

export type TagVariant = "tag" | "voucher";

export interface TagProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className
     */
    className?: string;
    /**
     * Icon
     */
    icon?: Icons;
    /**
     * Additional Icon className
     */
    iconClassName?: string;
    /**
     * Icon's position
     */
    iconPosition?: IconPosition;
    /**
     * Additional icon props
     */
    iconProps?: IconWrapperProps;
    /**
     * Icon's size
     */
    iconSize?: IconSize;
    /**
     * Label
     */
    label?: string;
    /**
     * Tag variant
     */
    variant?: TagVariant;
}

export const Tag = React.forwardRef<HTMLDivElement, TagProps>(function Tag(
    {
        children,
        className: classNameProp,
        icon,
        iconClassName: iconClassNameProp,
        iconPosition,
        iconProps,
        iconSize = "xs",
        label,
        variant = "tag",
    },
    ref
) {
    const className = clsx(
        "ds-c-tag",
        {
            "ds-c-tag--tag": variant === "tag",
            "ds-c-tag--voucher": variant === "voucher",
        },
        "ds-u-typography--body",
        classNameProp
    );
    const iconClassName = clsx("ds-c-tag__icon", iconClassNameProp);

    const [resizeListener, sizes] = useResizeAware();

    const child = wrapLabel(label ?? children);

    const ab = Math.ceil(sizes.height / Math.sqrt(2));
    const right = variant === "voucher" ? sizes.height / 2 : 0;

    return (
        <div className={className} style={{ marginRight: `${right}px` }} ref={ref}>
            {resizeListener}
            <IconWrapper
                {...iconProps}
                icon={icon}
                iconClassName={iconClassName}
                position={iconPosition}
                size={iconSize}
            >
                {child}
            </IconWrapper>
            {variant === "voucher" && (
                <>
                    <div
                        className="ds-c-tag__voucher-caret"
                        style={{ height: ab, width: ab, right: `-${right - 5}px` }}
                    />
                    <div className="ds-c-tag__voucher-circle" />
                </>
            )}
        </div>
    );
});
