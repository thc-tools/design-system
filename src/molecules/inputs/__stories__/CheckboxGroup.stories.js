// Libs
import React, { useState } from "react";

// Components
import { CheckboxGroup } from "../CheckboxGroup";

export default {
    title: "Design System/Molecules/Inputs/CheckboxGroup",
    component: CheckboxGroup,
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { CheckboxGroup, CheckboxGroupField } from "@thc-tools/design-system/molecules/inputs"
\`\`\`
                `,
            },
        },
    },
};

function Template({ value: valueProp, options, ...args }) {
    const [value, setValue] = useState(valueProp && valueProp?.length > 0 ? valueProp : [options[0]?.value]);
    const onChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <>
            <div style={{ marginBottom: "10px" }}>
                Currently selected value: <span className="thc-u-text--bold">[{value.join(", ")}]</span>
            </div>
            <CheckboxGroup {...args} options={options} value={value} onChange={onChange} />
        </>
    );
}

export const Primary = Template.bind({});
Primary.args = {
    id: Math.random(),
    name: Math.random().toString(),
    hasSelectAll: true,
    options: [
        {
            label: "Yes, send me IMMEDIATELY a unicorn through the mail",
            value: "#YesPlease",
        },
        {
            label: "No, I am a boring person and I don't want a unicorn",
            value: "#SorryNotSorry",
        },
        {
            label: "Who do you think I am, I already have a unicorn",
            value: "#IAmAwesome",
        },
        {
            label: "I am so grumpy ! I would never want a f*cking unicorn...",
            value: "#GrumpyEverywhere",
            // disabled: true,
        },
    ],
};
