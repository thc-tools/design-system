// Libs
import clsx from "clsx";

export interface LoaderProgressionProps {
    /**
     * Additional className for loader
     */
    className?: string;
    /**
     * If has error
     */
    hasError?: boolean;
    /**
     * If has warning
     */
    hasWarning?: boolean;
    /**
     * Percent of loading
     */
    percent?: number;
}

export function LoaderProgression({
    className,
    hasError = false,
    hasWarning = false,
    percent = 0,
}: LoaderProgressionProps) {
    const rootClassName = clsx(
        "ds-c-loader-progression",
        {
            "ds-c-loader-progression--error": hasError,
            "ds-c-loader-progression--warning": hasWarning,
        },
        className
    );

    return (
        <div className={rootClassName}>
            <div style={{ width: `${percent}%` }} className="ds-c-loader-progression__progress-bar" />
        </div>
    );
}
