// Libs
import classnames from "classnames";

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
    index: number;
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

    const rootClassName = classnames(
        "thc-c-step",
        {
            "thc-c-step--active": active,
            "thc-c-step--completed": completed,
        },
        className
    );

    return (
        <div {...otherProps} className={rootClassName}>
            <div className="thc-c-step__label thc-u-text--subtitle">{label}</div>
            <Icon className="thc-c-step__icon" size="m">
                {completed ? "success" : `number-${number[index]}`}
            </Icon>

            {index !== 0 && <StepConnector />}
        </div>
    );
}
