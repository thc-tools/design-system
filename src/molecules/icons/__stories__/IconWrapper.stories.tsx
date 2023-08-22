// Libs
import React from "react";

// Utils
import { iconEnumArg } from "../../../../.storybook/utils/args";

// Component
import { IconWrapper } from "../IconWrapper";

export default {
    title: "Design System/Molecules/Icons/IconWrapper",
    component: IconWrapper,
    args: {
        icon: "globe",
        children: "I am wrapped with a fabulous icon",
    },
    argTypes: {
        icon: iconEnumArg,
    },
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { IconWrapper } from "@thc-tools/design-system/molecules/icons"
\`\`\`
                `,
            },
        },
    },
};

const Template = (args) => <IconWrapper {...args} />;

export const Primary = Template.bind({});
