// Libs
import React from "react";

// Components
import { Modal } from "../Modal";

export default {
    title: "Design System/Molecules/Modals/Modal",
    component: Modal,
    args: {},
    parameters: {
        docs: {
            description: {
                component: `
The modal component provides a solid foundation for creating dialogs, popovers, lightboxes, or whatever else.

\`\`\`js
import { Modal } from "@thc-tools/design-system/molecules/modals"
\`\`\`
                `,
            },
        },
    },
};

const Template = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
