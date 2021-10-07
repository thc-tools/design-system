// Libs
import React from "react";

// Utils
import { iconEnumArg } from "../../../../.storybook/utils/args";

// Component
import { Icon, ICONS } from "../Icon";

export default {
    title: "Design System/Molecules/Icons/Icons",
    component: Icon,
    args: {
        children: "globe",
    },
    argTypes: {
        children: iconEnumArg,
        icon: iconEnumArg,
    },
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { Icon } from "@thc-tools/design-system/molecules/icons"
\`\`\`
                `,
            },
        },
    },
};

const Template = (args) => <Icon {...args} />;

export const Primary = Template.bind({});

export function Icons() {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "30px" }}>
            {ICONS.map((icon) => (
                <div key={icon}>
                    <Icon>{icon}</Icon>
                    <div>{icon}</div>
                </div>
            ))}
        </div>
    );
}
Icons.parameters = {
    controls: { disabled: true },
};
