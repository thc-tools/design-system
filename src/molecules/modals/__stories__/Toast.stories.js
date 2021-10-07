// Libs
import React, { useState } from "react";

// Components
import { Button } from "../../buttons";
import { TextField } from "../../inputs";
import { ToastProvider, useToast } from "../ToastProvider";

export default {
    title: "Design System/Molecules/Modals/Toast",
    component: ToastProvider,
    args: {},
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { ToastProvider } from "@thc-tools/design-system/molecules/modals"
\`\`\`
                `,
            },
        },
    },
};

function OpenToastButton({ type, message = "I'm a toast !" }) {
    const { enqueueToast } = useToast();

    const click = () => enqueueToast(message, { type });

    return <Button onClick={click}>{`${type ?? "Display"} toast`}</Button>;
}

const Template = (args) => {
    return (
        <ToastProvider {...args}>
            <OpenToastButton />
        </ToastProvider>
    );
};

export const Primary = Template.bind({});
Primary.args = {};

export function Variations() {
    const [message, setMessage] = useState("I'm a toast");
    const onChange = (event) => setMessage(event.target.value);

    return (
        <ToastProvider>
            <TextField label="Message" onChange={onChange} value={message} style={{ marginBottom: "20px" }} />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                {/* <OpenToastButton type="default" message={message} />
                <OpenToastButton type="dark" message={message} /> */}
                <OpenToastButton type="info" message={message} />
                <OpenToastButton type="success" message={message} />
                <OpenToastButton type="warning" message={message} />
                <OpenToastButton type="error" message={message} />
            </div>
        </ToastProvider>
    );
}

Variations.parameters = {
    controls: { disabled: true },
};
