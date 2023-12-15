// Libs
import clsx from "clsx";
import React, { useMemo } from "react";

// Utils
import { DESIGN_SYSTEM_COMMON_TK, DESIGN_SYSTEM_TRANSLATION_NAMESPACE, useTranslation } from "../../core";

// Components
import { isReactElement } from "../../core/utils";
import { Button } from "../buttons";
import { StepContext } from "./StepContext";

export interface StepperProps extends React.PropsWithChildren<unknown> {
    /**
     * Current active step
     */
    activeStep?: number;
    /**
     * Additional className
     */
    className?: string;
    /**
     * If previous button should be disabled
     */
    disabledPreviousButton?: boolean;
    /**
     * If next button should be disabled
     */
    disabledNextButton?: boolean;
    /**
     * If validate button should be disabled
     */
    disabledValidateButton?: boolean;
    /**
     * Override default next button
     */
    nextButton?: React.ReactNode;
    /**
     * Next label translation key
     */
    nextLabel?: string;
    /**
     * Step change handler
     */
    onStepChange?: (activeStep: number) => void | Promise<void>;
    /**
     * Validate handler
     */
    onValidate?: () => void | Promise<void>;
    /**
     * Previous label translation key
     */
    previousLabel?: string;
    /**
     * Main namespace for translation key
     */
    translationKey?: string;
    /**
     * Overrides default validate button
     */
    validateButton?: React.ReactNode;
    /**
     * Validation label translation key
     */
    validateLabel?: string;
}

export function Stepper({
    activeStep,
    children,
    className,
    disabledPreviousButton,
    disabledNextButton,
    disabledValidateButton,
    nextButton,
    nextLabel = "actions.next",
    onStepChange,
    onValidate,
    previousLabel = "actions.previous",
    translationKey = `${DESIGN_SYSTEM_TRANSLATION_NAMESPACE}:${DESIGN_SYSTEM_COMMON_TK}`,
    validateButton,
    validateLabel = "actions.validate",
    ...otherProps
}: StepperProps) {
    const rootClassName = clsx("ds-c-stepper", className);
    const { t } = useTranslation(translationKey);

    const childrenArray = React.Children.toArray(children);
    const steps = childrenArray.map((step, index) => {
        return isReactElement(step)
            ? React.cloneElement(step, {
                  index,
                  ...step.props,
              })
            : null;
    });

    const contextValue = useMemo(() => ({ activeStep: activeStep ?? 0 }), [activeStep]);

    return (
        <StepContext.Provider value={contextValue}>
            <div {...otherProps} className={rootClassName}>
                <Button
                    icon="arrow-left"
                    onClick={() => onStepChange(contextValue.activeStep - 1)}
                    disabled={disabledPreviousButton ?? contextValue.activeStep === 0}
                >
                    {t(previousLabel)}
                </Button>
                {steps}
                {contextValue.activeStep < childrenArray.length - 1 &&
                    (nextButton ?? (
                        <Button
                            icon="arrow-right"
                            iconPosition="right"
                            onClick={() => onStepChange(contextValue.activeStep + 1)}
                            disabled={disabledNextButton}
                        >
                            {t(nextLabel)}
                        </Button>
                    ))}
                {contextValue.activeStep === childrenArray.length - 1 &&
                    (validateButton ?? (
                        <Button icon="check" onClick={onValidate} disabled={disabledValidateButton}>
                            {t(validateLabel)}
                        </Button>
                    ))}
            </div>
        </StepContext.Provider>
    );
}
