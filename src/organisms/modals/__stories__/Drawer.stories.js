// Libs
import React, { useState } from "react";

// Components
import { Button } from "../../../molecules/buttons";
import { Drawer } from "../Drawer";

export default {
    title: "Design System/Organisms/Drawer",
    component: Drawer,
    args: {
        content: "Drawer content",
        subtitle: "I'm drawer sub",
        title: "I'm drawer title",
    },
    parameters: {
        docs: {
            description: {
                component: `
Navigation drawers provide access to destinations and app functionality, such as switching accounts. They can either be permanently on-screen or controlled by a navigation menu icon.

\`\`\`js
import { Drawer } from "@thc-tools/design-system/organisms/modals"
\`\`\`
                `,
            },
        },
    },
};

const Template = ({ content, open: openProp, ...otherProps }) => {
    const [open, setOpen] = useState(openProp ?? false);

    return (
        <>
            <Button onClick={() => setOpen(true)}>Open drawer</Button>
            <Drawer {...otherProps} open={open} onClose={() => setOpen(false)}>
                <div style={{ minHeight: "200px", minWidth: "200px", margin: "20px" }}>{content}</div>
            </Drawer>
        </>
    );
};

export const Primary = Template.bind({});
