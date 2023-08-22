// Libs
import classnames from "classnames";
import { DivProps } from "../../core/utils";

export interface TabIndicatorProps extends DivProps {
    /**
     * Additional className
     */
    className?: string;
}

export function TabIndicator({ className, ...otherProps }: TabIndicatorProps) {
    const rootClassName = classnames("thc-c-tab-indicator", className);

    return <span {...otherProps} className={rootClassName} />;
}
