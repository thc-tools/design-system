// Libs
import React from "react";

// Component
import { IconWrapper } from "../IconWrapper";

export default {
    title: "Design System/Molecules/Icons/IconWrapper",
    component: IconWrapper,
    args: {
        icon: "globe",
        children: "I am wrapped with a fabulous icon",
    },
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { IconWrapper } from "@ds-tools/design-system/molecules/icons"
\`\`\`
                `,
            },
        },
    },
};

const Template = (args) => <IconWrapper {...args} />;

export const Primary = Template.bind({});
