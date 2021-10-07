// Libs
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { useTranslation, THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY } from "../../core";

// Components
import { Button, BUTTON_ICON_POSITION } from "../buttons";
import { StepContext } from "./StepContext";

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
    translationKey = THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY,
    validateButton,
    validateLabel = "actions.validate",
    ...otherProps
}) {
    const rootClassName = classnames("thc-c-stepper", className);
    const { translate } = useTranslation(translationKey);

    const childrenArray = React.Children.toArray(children);
    const steps = childrenArray.map((step, index) => {
        return React.cloneElement(step, {
            index,
            ...step.props,
        });
    });

    const contextValue = useMemo(() => ({ activeStep }), [activeStep]);

    return (
        <StepContext.Provider value={contextValue}>
            <div {...otherProps} className={rootClassName}>
                <Button
                    icon="arrow-left"
                    onClick={() => onStepChange(activeStep - 1)}
                    disabled={disabledPreviousButton ?? activeStep === 0}
                >
                    {translate(previousLabel)}
                </Button>
                {steps}
                {activeStep < childrenArray.length - 1 &&
                    (nextButton ?? (
                        <Button
                            icon="arrow-right"
                            iconPosition={BUTTON_ICON_POSITION.RIGHT}
                            onClick={() => onStepChange(activeStep + 1)}
                            disabled={disabledNextButton}
                        >
                            {translate(nextLabel)}
                        </Button>
                    ))}
                {activeStep === childrenArray.length - 1 &&
                    (validateButton ?? (
                        <Button icon="check" onClick={onValidate} disabled={disabledValidateButton}>
                            {translate(validateLabel)}
                        </Button>
                    ))}
            </div>
        </StepContext.Provider>
    );
}

Stepper.propTypes = {
    /**
     * Current active step
     */
    activeStep: PropTypes.number,
    /**
     * Steps to display
     */
    children: PropTypes.node,
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * If previous button should be disabled
     */
    disabledPreviousButton: PropTypes.bool,
    /**
     * If next button should be disabled
     */
    disabledNextButton: PropTypes.bool,
    /**
     * If validate button should be disabled
     */
    disabledValidateButton: PropTypes.bool,
    /**
     * Override default next button
     */
    nextButton: PropTypes.node,
    /**
     * Next label translation key
     */
    nextLabel: PropTypes.string,
    /**
     * Step change handler
     */
    onStepChange: PropTypes.func,
    /**
     * Validate handler
     */
    onValidate: PropTypes.func,
    /**
     * Previous label translation key
     */
    previousLabel: PropTypes.string,
    /**
     * Main namespace for translation key
     */
    translationKey: PropTypes.string,
    /**
     * Overrides default validate button
     */
    validateButton: PropTypes.node,
    /**
     * Validation label translation key
     */
    validateLabel: PropTypes.string,
};
