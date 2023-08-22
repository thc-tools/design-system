// Libs
import classnames from "classnames";

export interface LoaderIconProps {
    /**
     * Additional className for loader
     */
    className?: string;
}

export function LoaderIcon({ className }: LoaderIconProps) {
    const rootClassName = classnames("thc-c-loader-icon", className);

    return (
        <div className={rootClassName}>
            <div className="thc-c-loader-icon__ball thc-c-loader-icon__a" />
            <div className="thc-c-loader-icon__ball thc-c-loader-icon__b" />
            <div className="thc-c-loader-icon__ball thc-c-loader-icon__c" />
        </div>
    );
}
