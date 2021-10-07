// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { alterElement } from "../../core/utils";

// Components
import { Icon } from "../icons";
import { Tooltip } from "../modals";

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
}) {
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

CardTitle.propTypes = {
    /**
     * Content of title
     */
    children: PropTypes.node,
    /**
     * Additional className for title
     */
    className: PropTypes.string,
    /**
     * Helper icon to display
     */
    helperIcon: PropTypes.string,
    /**
     * Additional className for helper Icon
     */
    helperIconClassName: PropTypes.string,
    /**
     * Additional props for helper Icon
     */
    helperIconProps: PropTypes.shape(Icon.propTypes),
    /**
     * Helper text
     */
    helperText: PropTypes.node,
    /**
     * Helper text title
     */
    helperTextTitle: PropTypes.node,
    /**
     * Title
     */
    title: PropTypes.string,
    /**
     * Title additional className
     */
    titleClassNameProp: PropTypes.string,
};
