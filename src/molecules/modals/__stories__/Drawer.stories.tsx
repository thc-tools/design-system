// Libs
import { useState } from "react";

// Components
import { Button } from "../../buttons";
import { Drawer } from "../Drawer";

export default {
    title: "Design System/Molecules/Modals/Drawer",
    component: Drawer,
    args: {
        anchor: "right",
        content: "Drawer content",
    },
    parameters: {
        docs: {
            description: {
                component: `
Navigation drawers provide access to destinations and app functionality, such as switching accounts. They can either be permanently on-screen or controlled by a navigation menu icon.

\`\`\`js
import { Drawer } from "@ds-tools/design-system/molecules/modals"
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
                <div style={{ minHeight: "200px", minWidth: "200px", padding: "10px" }}>{content}</div>
            </Drawer>
        </>
    );
};

export const Primary = Template.bind({});
