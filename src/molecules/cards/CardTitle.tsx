// Libs
import clsx from "clsx";
import React from "react";

// Utils
import { RDivProps, alterElement } from "../../core/utils";

// Components
import { Icon, IconProps } from "../icons";
import { Tooltip } from "../modals";

export interface CardTitleProps extends React.PropsWithChildren<RDivProps> {
    /**
     * Additional className for title
     */
    className?: string;
    /**
     * Helper icon to display
     */
    helperIcon?: string;
    /**
     * Additional className for helper Icon
     */
    helperIconClassName?: string;
    /**
     * Additional props for helper Icon
     */
    helperIconProps?: IconProps;
    /**
     * Helper text
     */
    helperText?: React.ReactNode;
    /**
     * Helper text title
     */
    helperTextTitle?: React.ReactNode;
    /**
     * Subtitle
     */
    subtitle?: string;
    /**
     * Title
     */
    title?: string;
    /**
     * Title additional className
     */
    titleClassName?: string;
}

export function CardTitle({
    children,
    className,
    helperIcon = "question-circle",
    helperIconClassName: helperIconClassNameProp,
    helperIconProps,
    helperText,
    helperTextTitle,
    title,
    titleClassName: titleClassNameProp,
    subtitle,
    ...otherProps
}: CardTitleProps) {
    const rootClassName = clsx("ds-c-card__title", className);
    const helperIconClassName = clsx("ds-c-card__title-helper", helperIconClassNameProp);
    const titleClassName = clsx("ds-u-typography--headline-2-medium", titleClassNameProp);

    const wrappedChild = alterElement(title ?? children, { className: titleClassName });

    return (
        <div className={rootClassName} {...otherProps}>
            <div className="ds-c-card__title-title">
                {wrappedChild}
                {helperText && (
                    <Tooltip tooltip={helperText} tooltipTitle={helperTextTitle}>
                        <Icon {...helperIconProps} className={helperIconClassName}>
                            {helperIcon}
                        </Icon>
                    </Tooltip>
                )}
            </div>
            {subtitle && <div className="ds-c-card__title-subtitle ds-u-text--subtitle">{subtitle}</div>}
        </div>
    );
}
