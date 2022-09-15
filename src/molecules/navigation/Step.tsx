// Libs
import clsx from "clsx";

// Components
import { Icon } from "../icons";
import { StepConnector } from "./StepConnector";
import { useStep } from "./StepContext";

const number = ["one", "two", "three"];

export interface StepProps {
    /**
     * If is active
     */
    active?: boolean;
    /**
     * Additional className
     */
    className?: string;
    /**
     * If is completed
     */
    completed?: boolean;
    /**
     * Index
     */
    index?: number;
    /**
     * Label
     */
    label?: string;
}

export function Step({
    active: activeProp,
    className,
    completed: completedProp,
    index,
    label,
    ...otherProps
}: StepProps) {
    const { activeStep } = useStep();

    const active = activeProp ?? index === activeStep;
    const completed = completedProp ?? activeStep > index;

    const rootClassName = clsx(
        "ds-c-step",
        {
            "ds-c-step--active": active,
            "ds-c-step--completed": completed,
        },
        className
    );

    return (
        <div {...otherProps} className={rootClassName}>
            <div className="ds-c-step__label ds-u-text--subtitle">{label}</div>
            <Icon className="ds-c-step__icon" size="m">
                {completed ? "success" : `number-${number[index]}`}
            </Icon>

            {index !== 0 && <StepConnector />}
        </div>
    );
}
