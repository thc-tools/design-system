// Libs
import clsx from "clsx";

export interface MenuSeparatorProps {
    /**
     * Additional className for separator
     */
    className?: string;
}

export function MenuSeparator({ className, ...otherProps }: MenuSeparatorProps) {
    const separatorClassName = clsx("ds-c-menu-separator", className);

    return <li {...otherProps} className={separatorClassName} role="separator" />;
}
