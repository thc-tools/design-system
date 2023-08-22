// Libs
import classnames from "classnames";

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
    const rootClassName = classnames(
        "thc-c-loader-spinner",
        {
            "thc-c-loader-spinner--loading": isLoading,
        },
        className
    );
    const iconClassName = classnames("thc-c-loader-spinner__icon", iconClassNameProp);

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
