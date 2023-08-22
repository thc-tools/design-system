// Libs
import React, { useState } from "react";
// Components
import { Checkbox, CheckboxField } from "../Checkbox";

export default {
    title: "Design System/Molecules/Inputs/Checkbox",
    component: Checkbox,
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { Checkbox, CheckboxField } from "@thc-tools/design-system/molecules/inputs"
\`\`\`
                `,
            },
        },
    },
};

function Template({ checked: checkedProp, ...args }) {
    const [checked, setChecked] = useState(checkedProp);
    const onChange = (event) => setChecked(event.target.checked);

    return <Checkbox {...args} checked={checked} onChange={onChange} />;
}

export const Primary = Template.bind({});
Primary.args = {
    id: Math.random(),
    name: Math.random().toString(),
};

export function CheckboxFieldStory() {
    const [checked, setChecked] = useState(false);
    const onChange = (event) => setChecked(event.target.checked);

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
            <CheckboxField
                checked={checked}
                controlLabel="I'm a control label"
                id={Math.random()}
                label="Standard"
                name={Math.random().toString()}
                onChange={onChange}
            />

            <CheckboxField
                checked={checked}
                disabled
                id={Math.random()}
                label="Disabled"
                name={Math.random().toString()}
                onChange={onChange}
            />

            <CheckboxField
                checked={checked}
                error="I'm an error"
                id={Math.random()}
                label="Error"
                name={Math.random().toString()}
                onChange={onChange}
            />
        </div>
    );
}
CheckboxFieldStory.storyName = "CheckboxField";
CheckboxFieldStory.parameters = {
    controls: { disabled: true },
    docs: {
        description: {
            story: `
As field already have a label feature. 
When you want to use the control label features of the switch, you need to prefix the props name with \`control\`:

- \`controlLabel\`
- \`controlLabelClassName\`
- \`controlLabelPosition\`
- \`controlLabelProps\`
`,
        },
    },
};
