// Libs
import React, { useState } from "react";

// Components
import { Radio, RadioField } from "../Radio";
import { RadioCard } from "../RadioCard";

export default {
    title: "Design System/Molecules/Inputs/Radio",
    component: Radio,
    parameters: {
        docs: {
            description: {
                component: `
Radio are used when choosing one value amongst many.

\`\`\`js
import { Radio, RadioField } from "@thc-tools/design-system/molecules/inputs";
\`\`\`

⚠️ The Radio shouldn't be used alone, consider using \`RadioGroup\`.
                `,
            },
        },
    },
};

function Template({ value: valueProp, ...args }) {
    const [value, setValue] = useState(valueProp);
    const onChange = (event) => setValue(event.target.checked);

    return <Radio {...args} checked={value} onChange={onChange} />;
}

export const Primary = Template.bind({});
Primary.args = {
    id: Math.random(),
    name: "primary",
};

export function RadioFieldStory() {
    const [value, setValue] = useState(false);
    const onChange = (event) => setValue(event.target.checked);

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
            <RadioField
                checked={value}
                controlLabel="I'm a control label"
                id={Math.random()}
                label="Standard"
                name="one"
                onChange={onChange}
            />

            <RadioField
                checked={value}
                controlLabel="I'm a control label"
                disabled
                id={Math.random()}
                label="Disabled"
                name="two"
                onChange={onChange}
            />

            <RadioField
                checked={value}
                controlLabel="I'm a control label"
                error="I'm an error"
                id={Math.random()}
                label="Error"
                name="three"
                onChange={onChange}
            />
        </div>
    );
}
RadioFieldStory.storyName = "RadioField";
RadioFieldStory.parameters = {
    controls: { disabled: true },
    docs: {
        description: {
            story: `
As field already have a label feature. 
When you want to use the control label features of the radio, you need to prefix the props name with \`control\`:

- \`controlLabel\`
- \`controlLabelClassName\`
- \`controlLabelPosition\`
- \`controlLabelProps\`
`,
        },
    },
};

const RadioCardTemplate = ({ value: valueProp, ...args }) => {
    const [value, setValue] = useState(valueProp);
    return <RadioCard {...args} checked={value} onChange={(evt) => setValue(evt.target.checked)} />;
};

export const RadioCardStory = RadioCardTemplate.bind({});

RadioCardStory.storyName = "RadioCard";
RadioCardStory.args = {
    id: Math.random(),
    name: "radio-card",
    primary: "I'm first",
    secondary: "I'm second",
    icon: "cube",
    // hasError: true,
    // disabled: true,
    // status: "warning",
    // value: true,
};
RadioCardStory.parameters = {
    controls: { disabled: true },
    docs: {
        description: {
            story: `

`,
        },
    },
};
