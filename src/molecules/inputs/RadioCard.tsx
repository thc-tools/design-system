// Libs
import classnames from "classnames";
import React from "react";

// Components
import { Card, CardContent, CardHeader } from "../cards";
import { DisplayResource, DisplayResourceStatus } from "../displays";
import { Icons } from "../icons";
import { FieldHoc } from "./Field";
import { Radio, RadioProps } from "./Radio";

export interface RadioCardProps extends React.PropsWithChildren<RadioProps> {
    /**
     * If is checked
     */
    checked?: boolean;
    /**
     * Add the fullWidth for the DisplayResource
     */
    fullWidth?: boolean;
    /**
     * Primary text
     */
    primary?: React.ReactNode;
    /**
     * Secondary text
     */
    secondary?: React.ReactNode;
    /**
     * Icon
     */
    icon?: Icons;
    /**
     * Status
     */
    status?: DisplayResourceStatus;
}

export const RadioCard = React.forwardRef<HTMLDivElement, RadioCardProps>(function RadioCard(
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
                    <Radio {...otherProps} disabled={disabled} checked={checked} hasError={hasError} />
                </CardContent>
            </CardHeader>
        </Card>
    );
});

export const RadioCardField = FieldHoc(RadioCard, "RadioCard");
