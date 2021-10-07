// Libs
import React, { useState } from "react";

// Utils
import { enumArgs } from "../../../../.storybook/utils/args";

// Components
import { Field } from "../Field";
import { Switch, SwitchField } from "../Switch";
import { CONTROL_LABEL_POSITION } from "../ControlLabel";

export default {
    title: "Design System/Molecules/Inputs/Switch",
    component: Switch,
    subcomponents: { Field },
    argTypes: {
        labelPosition: enumArgs(CONTROL_LABEL_POSITION, CONTROL_LABEL_POSITION.RIGHT, "select"),
    },
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { Switch, SwitchField } from "@thc-tools/design-system/molecules/inputs";
\`\`\`
                `,
            },
        },
    },
};

function useValue(defaultValue) {
    const [value, setValue] = useState(defaultValue);
    const onChange = (event) => {
        setValue(event.target.checked);
    };

    return { value, onChange };
}

function Template({ value: valueProp, ...args }) {
    const { value, onChange } = useValue(valueProp);

    return <Switch {...args} value={value} onChange={onChange} />;
}

export const Primary = Template.bind({});

export function SwitchFieldStory() {
    const { value, onChange } = useValue(false);

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
            <SwitchField
                label="Standard"
                id={Math.random()}
                value={value}
                onChange={onChange}
                controlLabel="I'm a control label"
            />

            <SwitchField label="Disabled" disabled id={Math.random()} value={value} onChange={onChange} />

            <SwitchField label="Error" error="I have error" id={Math.random()} value={value} onChange={onChange} />
        </div>
    );
}
SwitchFieldStory.storyName = "SwitchField";
SwitchFieldStory.parameters = {
    controls: { disabled: true },
    docs: {
        description: {
            story: `
Switch in a Field

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
