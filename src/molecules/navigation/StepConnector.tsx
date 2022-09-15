// Libs
import clsx from "clsx";

export interface StepConnectorProps {
    /**
     * Additional className
     */
    className?: string;
}

export function StepConnector({ className }: StepConnectorProps) {
    const rootClassName = clsx("ds-c-step-connector", className);

    return (
        <div className={rootClassName}>
            <span className="ds-c-step-connector__line" />
        </div>
    );
}
