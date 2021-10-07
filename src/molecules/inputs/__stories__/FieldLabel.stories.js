// Libs
import React from "react";

// Components
import { FieldLabel } from "../FieldLabel";

import { IconWrapper } from "../../icons";

export default {
    title: "Design System/Molecules/Inputs/FieldLabel",
    component: FieldLabel,
    args: {
        label: "Label",
    },
    parameters: {
        docs: {
            description: {
                component: `
Labels allow input to have meaning about it.

\`\`\`js
import { FieldLabel } from "@thc-tools/design-system/molecules/inputs"
\`\`\`

⚠️ The label shouldn't be used alone, consider using \`TextField\`.
Everything described here can be used through \`TextField\`.
                `,
            },
        },
    },
};

const Template = (args) => <FieldLabel {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    id: Math.random(),
};

export function Variations() {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <div>
                <h2>Standard</h2>
                <FieldLabel label="Label" id={Math.random()} />
            </div>
            <div>
                <h2>Required</h2>
                <FieldLabel label="Label" required id={Math.random()} />
            </div>
            <div>
                <h2>HasError</h2>
                <FieldLabel label="Label" hasError required id={Math.random()} />
            </div>
            <div>
                <h2>Disabled</h2>
                <FieldLabel label="Label" disabled required id={Math.random()} />
            </div>
            <div>
                <h2>Complex label</h2>
                <FieldLabel required id={Math.random()}>
                    <IconWrapper icon="globe">
                        <span>Label</span>
                    </IconWrapper>
                </FieldLabel>
            </div>
            <div>
                <h2>Disabled complex label</h2>
                <FieldLabel required disabled id={Math.random()}>
                    <IconWrapper icon="globe">
                        <span>Label</span>
                    </IconWrapper>
                </FieldLabel>
            </div>
        </div>
    );
}
Variations.parameters = {
    controls: { disabled: true },
    docs: {
        description: {
            story: "Controls using the props: `required`, `disabled`, `hasError` and `label`",
        },
    },
};
