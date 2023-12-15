// Libs
import clsx from "clsx";

// Components

export interface TooltipDividerProps {
    /**
     * Additional className
     */
    className?: string;
}

export function TooltipDivider({ className: classNameProp }: TooltipDividerProps): JSX.Element {
    const className = clsx("ds-c-tooltip__divider", classNameProp);

    return <div className={className} />;
}
