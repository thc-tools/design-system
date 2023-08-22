// Libs
import React, { useState } from "react";

// Components
import { Button } from "../../buttons";
import { Icon } from "../../icons";
import { Banner } from "../Banner";

export default {
    title: "Design System/Molecules/Modals/Banner",
    component: Banner,
    args: {},
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { Banner } from "@thc-tools/design-system/molecules/modals"
\`\`\`
                `,
            },
        },
    },
};

const Template = ({ open: openProp, ...otherProps }) => {
    const [open, setOpen] = useState(openProp);

    return (
        <>
            <Button onClick={() => setOpen(true)}>Open Banner</Button>
            <Banner {...otherProps} open={open} onClose={() => setOpen(false)} />
        </>
    );
};

export const Primary = Template.bind({});
Primary.args = {
    children: "Banner content",
};

export const Complex = Template.bind({});
Complex.args = {
    color: "--thc-color--warning-500",
    children: [
        <Icon>key</Icon>,
        "Your session will expire in 3 minutes, you should refresh now",
        <Button type="secondary">Change now</Button>,
        <Button type="secondary">Later</Button>,
    ],
};
