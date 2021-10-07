// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Components
import { Card, CardContent, CardHeader } from "../cards";
import { DisplayResource } from "../displays";
import { FieldHoc } from "./Field";
import { Radio } from "./Radio";

export const RadioCard = React.forwardRef(function RadioCard(
    {
        children,
        checked,
        className,
        disabled = false,
        fullWidth = false,
        hasError = false,
        primary,
        secondary,
        icon,
        status,
        ...otherProps
    },
    ref
) {
    const rootClassName = classnames(
        "thc-c-radio-card",
        {
            "thc-c-radio-card--checked": checked,
            "thc-u-status--error": !disabled && hasError,
        },
        className
    );

    const child = children ?? (
        <DisplayResource
            disabled={disabled}
            helper={secondary}
            icon={icon}
            label={primary}
            status={status}
            fullWidth={fullWidth}
        />
    );

    return (
        <Card className={rootClassName} disabled={disabled} onClick={() => {}} outlined ref={ref}>
            <CardHeader>
                <CardContent className="thc-o-flex-item--1">{child}</CardContent>
                <CardContent>
                    <Radio {...otherProps} disabled={disabled} hasError={hasError} checked={checked} />
                </CardContent>
            </CardHeader>
        </Card>
    );
});

RadioCard.propTypes = {
    /**
     * Children to display
     */
    children: PropTypes.node,
    /**
     * If is checked
     */
    checked: PropTypes.bool,
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * If is disabled
     */
    disabled: PropTypes.bool,
    /**
     * Add the fullWidth for the DisplayRessource
     */
    fullWidth: PropTypes.bool,
    /**
     * If has error
     */
    hasError: PropTypes.bool,
    /**
     * Primary text
     */
    primary: DisplayResource.propTypes.label,
    /**
     * Secondary text
     */
    secondary: DisplayResource.propTypes.helper,
    /**
     * Icon
     */
    icon: DisplayResource.propTypes.icon,
    /**
     *
     */
    status: DisplayResource.propTypes.status,
};

export const RadioCardField = FieldHoc(RadioCard, "RadioCard");
