// Libs
import classnames from "classnames";

export interface MenuSeparatorProps {
    /**
     * Additional className for separator
     */
    className?: string;
}

export function MenuSeparator({ className, ...otherProps }: MenuSeparatorProps) {
    const separatorClassName = classnames("thc-c-menu-separator", className);

    return <li {...otherProps} className={separatorClassName} role="separator" />;
}
