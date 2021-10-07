// Libs
import React, { useState } from "react";

// Components
import { Step } from "../Step";
import { StepConnector } from "../StepConnector";
import { Stepper } from "../Stepper";

export default {
    title: "Design System/Molecules/Navigation/Stepper",
    component: Stepper,
    args: {},
    subcomponents: { Stepper, Step, StepConnector },
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { Step, Stepper } from "@thc-tools/design-system/molecules/navigation"
\`\`\`
                `,
            },
        },
    },
};

const Template = ({ activeStep: activeStepProp, ...args }) => {
    const [activeStep, setActiveSet] = useState(activeStepProp);

    return (
        <Stepper {...args} activeStep={activeStep} onStepChange={setActiveSet}>
            <Step label="Creation" />
            <Step label="Edition" />
            <Step label="Publication" />
        </Stepper>
    );
};

export const Primary = Template.bind({});

Primary.args = {
    activeStep: 1,
    // eslint-disable-next-line no-alert
    onValidate: () => alert("validate"),
};
