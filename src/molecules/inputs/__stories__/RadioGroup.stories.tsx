// Libs
import React, { useState } from "react";

// Components
import { RadioGroup, RADIO_GROUP_TYPE } from "../RadioGroup";

export default {
    title: "Design System/Molecules/Inputs/RadioGroup",
    component: RadioGroup,
    parameters: {
        docs: {
            description: {
                component: `
RadioGroup is used when choosing one value amongst many.

\`\`\`js
import { RadioGroup, RadioGroupField } from "@thc-tools/design-system/molecules/inputs"
\`\`\`
                `,
            },
        },
    },
};

function Template({ value: valueProp, options, ...args }) {
    const [value, setValue] = useState(valueProp ?? options[0]?.value);
    const onChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <>
            <div style={{ marginBottom: "10px" }}>
                Currently selected value: <span className="thc-u-text--bold">{value}</span>
            </div>
            <RadioGroup {...args} options={options} value={value} onChange={onChange} />
        </>
    );
}

export const Primary = Template.bind({});
Primary.args = {
    id: Math.random(),
    name: Math.random().toString(),
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
            disabled: true,
        },
    ],
};

export const RadioGroupCard = Template.bind({});
RadioGroupCard.args = {
    id: Math.random(),
    name: Math.random().toString(),
    type: RADIO_GROUP_TYPE.CARD,
    options: [
        {
            primary: "Yes, send me IMMEDIATELY a unicorn through the mail",
            secondary: "2-3 days for France delivery",
            icon: "heart",
            value: "#YesPlease",
        },
        {
            primary: "No, I am a boring person and I don't want a unicorn",
            secondary: "If you are boring, it should enhance your mood",
            icon: "warning",
            value: "#SorryNotSorry",
        },
        {
            primary: "Who do you think I am, I already have a unicorn",
            secondary: "Wonderful you are a sickening person",
            icon: "magic",
            value: "#IAmAwesome",
        },
        {
            primary: "I am so grumpy ! I would never want a f*cking unicorn...",
            secondary: "We can't do anything for you",
            value: "#GrumpyEverywhere",
            icon: "forbidden",
            disabled: true,
        },
    ],
};
