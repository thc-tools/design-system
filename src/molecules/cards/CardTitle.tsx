// Libs
import classnames from "classnames";
import React from "react";

// Utils
import { DivProps, alterElement } from "../../core/utils";

// Components
import { Icon, IconProps } from "../icons";
import { Tooltip } from "../modals";

export interface CardTitleProps extends React.PropsWithChildren<DivProps> {
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
    const rootClassName = classnames("thc-c-card__title", className);
    const helperIconClassName = classnames("thc-c-card__title-helper", helperIconClassNameProp);
    const titleClassName = classnames("thc-u-text--title", titleClassNameProp);

    const wrappedChild = alterElement(title ?? children, { className: titleClassName });

    return (
        <div className={rootClassName} {...otherProps}>
            <div className="thc-c-card__title-title">
                {wrappedChild}
                {helperText && (
                    <Tooltip tooltip={helperText} tooltipTitle={helperTextTitle}>
                        <Icon {...helperIconProps} className={helperIconClassName}>
                            {helperIcon}
                        </Icon>
                    </Tooltip>
                )}
            </div>
            {subtitle && <div className="thc-c-card__title-subtitle thc-u-text--subtitle">{subtitle}</div>}
        </div>
    );
}
