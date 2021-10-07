// Libs
import React, { useState } from "react";

// Component
import { OpenCloseIcon } from "../OpenCloseIcon";

export default {
    title: "Design System/Molecules/Icons/OpenCloseIcon",
    component: OpenCloseIcon,
    args: {},
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { OpenCloseIcon } from "@thc-tools/design-system/molecules/icons"
\`\`\`
                `,
            },
        },
    },
};

function Template({ open: openProp, ...args }) {
    const [open, setOpen] = useState(openProp);

    return <OpenCloseIcon {...args} onClick={() => setOpen(!open)} open={open} />;
}

export const Primary = Template.bind({});
