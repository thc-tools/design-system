// Libs
import classnames from "classnames";

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
    const rootClassName = classnames(
        "thc-c-loader-progression",
        {
            "thc-c-loader-progression--error": hasError,
            "thc-c-loader-progression--warning": hasWarning,
        },
        className
    );

    return (
        <div className={rootClassName}>
            <div style={{ width: `${percent}%` }} className="thc-c-loader-progression__progress-bar" />
        </div>
    );
}
