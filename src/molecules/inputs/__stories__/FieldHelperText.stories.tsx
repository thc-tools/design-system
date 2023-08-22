// Libs
import React from "react";

// Components
import { FieldHelperText } from "../FieldHelperText";

export default {
    title: "Design System/Molecules/Inputs/FieldHelperText",
    component: FieldHelperText,

    parameters: {
        docs: {
            description: {
                component: `
Helper text allow input to have description about it.

\`\`\`js
import { FieldHelperText } from "@thc-tools/design-system/molecules/inputs"
\`\`\`

⚠️ The helper text shouldn't be used alone, consider using \`TextField\`.
Everything described here can be used through \`TextField\`.
                `,
            },
        },
    },
};

const Template = (args) => <FieldHelperText {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    helperText: "Optional information",
    id: Math.random(),
};

export function Variations() {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
            <div>
                <h2>Standard</h2>
                <FieldHelperText helperText="Optional information" id={Math.random()} />
            </div>
            <div>
                <h2>HasError</h2>
                <FieldHelperText helperText="Optional error" hasError id={Math.random()} />
            </div>
            <div>
                <h2>HasWarning</h2>
                <FieldHelperText helperText="Optional warning" hasWarning id={Math.random()} />
            </div>
            <div>
                <h2>HasSuccess</h2>
                <FieldHelperText helperText="Optional success" hasSuccess id={Math.random()} />
            </div>
            <div>
                <h2>Disabled</h2>
                <FieldHelperText helperText="Optional disabled" disabled id={Math.random()} />
            </div>
        </div>
    );
}
Variations.parameters = {
    controls: { disabled: true },
    docs: {
        description: {
            story: "Controls using the props: `disabled`, `hasError`, `hasSuccess` and `hasWarning`",
        },
    },
};
