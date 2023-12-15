// Libs
import { useState } from "react";

// Components
import { Slider, SliderProps } from "../Slider";

export default {
    title: "Design System/Molecules/Inputs/SliderField",
    component: Slider,
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { Slider, SliderField } from "@ds-tools/design-system/molecules/inputs";
\`\`\`
                `,
            },
        },
    },
};

const Template = ({ value: valueProp, ...args }: SliderProps) => {
    const [value, setValue] = useState(valueProp);
    return (
        <>
            <div>Current value: {value}</div>
            <hr />
            <div>
                <Slider value={value} onChange={(e) => setValue(e.target.value)} {...args} />
            </div>
        </>
    );
};

export const Primary = Template.bind({});
Primary.args = {
    min: 0,
    max: 1,
    step: 0.1,
    value: 0.5,
    label: "Label",
    helperText: "optional text",
};
