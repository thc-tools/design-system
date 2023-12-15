// Libs
import clsx from "clsx";
import React from "react";

// Utils
import { alterElement } from "../../core/utils";

// Icons
import icons from "./icons.json";

export const ICONS = Object.keys(icons);

export type Icons = string | React.ReactNode;

export type IconSize = "xs" | "s" | "m" | "l";

export function hasIcon(iconName: string): boolean {
    return ICONS.includes(iconName);
}

export interface IconProps extends React.PropsWithChildren<Omit<React.SVGProps<SVGSVGElement>, "ref">> {
    /**
     * Additional className for icon
     */
    className?: string;
    /**
     * Icon to display
     */
    icon?: Icons | React.ReactNode;
    /**
     * Click handler
     */
    onClick?: React.MouseEventHandler<SVGSVGElement>;
    /**
     * Icon size
     */
    size?: IconSize;
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(function Icon(
    { children, className, icon, onClick, size = "m", ...otherProps },
    ref
) {
    const iconClassName = clsx(
        "ds-c-icon",
        {
            "ds-u-icon--XS": size === "xs",
            "ds-u-icon--S": size === "s",
            "ds-u-icon--M": size === "m",
            "ds-u-icon--L": size === "l",
        },
        className
    );

    const iconName = icon ?? children;

    if (typeof iconName !== "string") {
        return alterElement(iconName, { className: iconClassName, ...otherProps });
    }

    if (!hasIcon(iconName)) {
        return <span style={{ color: "red", textDecoration: "underline", margin: "5px" }}>{iconName}</span>;
    }

    const traces = icons[iconName as string];

    return (
        <svg
            className={iconClassName}
            data-icon={iconName}
            fill="none"
            ref={ref}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
            {...otherProps}
        >
            {traces.map(([trace, fillRule, clipRule], i) => (
                <path
                    className="ds-c-icon__path"
                    key={i}
                    d={trace}
                    fill="currentcolor"
                    fillRule={fillRule}
                    clipRule={clipRule}
                />
            ))}
        </svg>
    );
});
