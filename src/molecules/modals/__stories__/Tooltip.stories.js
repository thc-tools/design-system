// Libs
import React from "react";

// Components
import { Button } from "../../buttons";
import { Tooltip } from "../Tooltip";

export default {
    title: "Design System/Molecules/Modals/Tooltip",
    component: Tooltip,
    args: {},
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { Tooltip } from "@thc-tools/design-system/molecules/modals"
\`\`\`
                `,
            },
        },
    },
};

const Template = (args) => <Tooltip {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: <Button>With tooltip</Button>,
    tooltip: "I am a tooltip",
    placement: "top",
};
