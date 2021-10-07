// Libs
import React, { useState } from "react";

// Components
import { Button } from "../../buttons";
import { Dialog } from "../Dialog";

export default {
    title: "Design System/Molecules/Modals/Dialog",
    component: Dialog,
    args: {},
    parameters: {
        docs: {
            description: {
                component: `
Dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks.

\`\`\`js
import { Dialog } from "@thc-tools/design-system/molecules/modals"
\`\`\`
                `,
            },
        },
    },
};

export const Primary = (props) => {
    const [open, setOpen] = useState(false);
    const [openSecond, setOpenSecond] = useState(false);
    const [openThird, setOpenThird] = useState(false);

    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={() => setOpen(true)}>Open Dialog with actions</Button>
            <Dialog
                {...props}
                title="Title"
                open={open}
                onClose={() => setOpen(false)}
                actions={[<Button type="primary">Ok</Button>, <Button type="primary">Peut-être</Button>]}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <span>Je suis le content du dialog Bonjour !</span>
                </div>
            </Dialog>

            <Button onClick={() => setOpenSecond(true)}>Open Dialog without actions</Button>
            <Dialog {...props} title="Title" open={openSecond} hasCancel={false} onClose={() => setOpenSecond(false)}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <span>Je suis le content du dialog Bonjour !</span>
                </div>
            </Dialog>

            <Button onClick={() => setOpenThird(true)}>Open Dialog with just Cancel</Button>
            <Dialog {...props} title="Title" open={openThird} onClose={() => setOpenThird(false)}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <span>Je suis le content du dialog Bonjour !</span>
                </div>
            </Dialog>
        </div>
    );
};
