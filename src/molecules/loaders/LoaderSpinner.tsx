// Libs
import clsx from "clsx";

// Icons
import { Icon, IconProps } from "../icons";

export interface LoaderSpinnerProps {
    /**
     * Additional className for loader
     */
    className?: string;
    /**
     * Additional className for the icon
     */
    iconClassName?: string;
    /**
     * Additional props for the icon
     */
    iconProps?: IconProps;
    /**
     * If is loading
     */
    isLoading?: boolean;
}

export function LoaderSpinner({
    className,
    iconClassName: iconClassNameProp,
    iconProps,
    isLoading = false,
}: LoaderSpinnerProps) {
    const rootClassName = clsx(
        "ds-c-loader-spinner",
        {
            "ds-c-loader-spinner--loading": isLoading,
        },
        className
    );
    const iconClassName = clsx("ds-c-loader-spinner__icon", iconClassNameProp);

    return (
        <div className={rootClassName}>
            {isLoading && (
                <Icon {...iconProps} className={iconClassName}>
                    dot
                </Icon>
            )}
        </div>
    );
}
