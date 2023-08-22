// Libs
import React, { useRef, useState } from "react";

// Components
import { Button } from "../../buttons";
import { Icon } from "../../icons";
import { Dropdown } from "../Dropdown";

export default {
    title: "Design System/Molecules/Modals/Dropdown",
    component: Dropdown,
    args: {},
    parameters: {
        docs: {
            description: {
                component: `
The Dropdown can be used to display some content on top of another.

\`\`\`js
import { Dropdown } from "@thc-tools/design-system/molecules/modals"
\`\`\`
                `,
            },
        },
    },
};

export const Primary = ({ open: openProp, ...otherProps }) => {
    const [open, setOpen] = useState(openProp ?? false);
    const buttonRef = useRef();

    return (
        <div>
            <Button onClick={() => setOpen(true)} ref={buttonRef}>
                Open dropdown
            </Button>
            <Dropdown {...otherProps} anchorEl={buttonRef} open={open} onClose={() => setOpen(false)}>
                <div style={{ margin: "10px", display: "flex", alignItems: "center" }}>
                    <span>I am here&nbsp;</span>
                    <Icon>globe</Icon>
                </div>
            </Dropdown>
        </div>
    );
};
