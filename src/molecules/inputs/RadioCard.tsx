// Libs
import clsx from "clsx";
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
    hasFullWidth?: boolean;
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
        hasFullWidth = false,
        hasError = false,
        primary,
        secondary,
        icon,
        status,
        ...otherProps
    },
    ref
) {
    const rootClassName = clsx(
        "ds-c-radio-card",
        {
            "ds-c-radio-card--checked": checked,
            "ds-u-status--error": !disabled && hasError,
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
            hasFullWidth={hasFullWidth}
        />
    );

    return (
        <Card
            className={rootClassName}
            disabled={disabled}
            onClick={() => {
                /* RAF */
            }}
            outlined
            ref={ref}
        >
            <CardHeader>
                <CardContent className="ds-o-flex-item--1">{child}</CardContent>
                <CardContent>
                    <Radio {...otherProps} disabled={disabled} checked={checked} hasError={hasError} />
                </CardContent>
            </CardHeader>
        </Card>
    );
});

export const RadioCardField = FieldHoc(RadioCard, "RadioCard");
