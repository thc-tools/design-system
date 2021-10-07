// Libs
import React from "react";

// Component
import { OwnerMemberIcon } from "../OwnerMemberIcon";

export default {
    title: "Design System/Molecules/Icons/OwnerMemberIcon",
    component: OwnerMemberIcon,
    args: {},
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { OwnerMemberIcon } from "@thc-tools/design-system/molecules/icons"
\`\`\`
                `,
            },
        },
    },
};

const Template = (args) => <OwnerMemberIcon {...args} />;

export const Primary = Template.bind({});
