// Libs
import React, { useState, useCallback } from "react";

// Components
import { Field } from "../Field";
import { Input, TextField } from "../Input";

export default {
    title: "Design System/Molecules/Inputs/TextField",
    component: Input,
    subcomponents: { Field },
    args: {
        onFocus: null,
        onBlur: null,
    },
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { Input, TextField } from "@thc-tools/design-system/molecules/inputs";
\`\`\`
                `,
            },
        },
    },
};

const Template = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.storyName = "Input";

export function FormProps() {
    const [value, setValue] = useState("value");
    const onChange = useCallback((e) => setValue(e.target.value), [setValue]);

    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
            <TextField value={value} onChange={onChange} label="Required" required />
            <TextField value={value} onChange={onChange} label="Disabled" disabled />
            <TextField value={value} onChange={onChange} label="Password" type="password" />
            <TextField label="Read only" readOnly value="Hello thc" />
            <TextField label="Number" type="number" />
            <TextField value={value} onChange={onChange} label="Helper text" helperText="helper text" />
        </div>
    );
}
FormProps.parameters = {
    controls: { disabled: true },
    docs: {
        description: {
            story:
                "Standard form attributes are supported e.g. required, disabled, type, etc. as well as a helperText which is used to give context about a field’s input, such as how the input will be used.",
        },
    },
};

function TextFieldBaseTrio(props) {
    return (
        <div>
            <TextField label="Title" placeholder="Placeholder..." required id={Math.random()} {...props} />
            <TextField label="Title" placeholder="Placeholder..." required id={Math.random()} multiline {...props} />
            <TextField placeholder="Search..." id={Math.random()} startAdornment="search" {...props} />
        </div>
    );
}

export function Validation() {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px" }}>
            <TextFieldBaseTrio error="This is the error explained clearly" />
            <TextFieldBaseTrio warning="This is a potential problem on this field" />
            <TextFieldBaseTrio success="This is a success for this field" />
            <TextFieldBaseTrio helperText="This is an information about the field" />
            <TextFieldBaseTrio helperText="This is an information about a disabled field" disabled />
        </div>
    );
}
Validation.parameters = {
    controls: { disabled: true },
    docs: {
        description: {
            story: `
Text field can have five validation helper text:

- error
- warning
- success
- helperText
- disabled
`,
        },
    },
};

export function Multiline() {
    const [value, setValue] = useState("I have value!");
    const onChange = useCallback((e) => setValue(e.target.value), [setValue]);

    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
            <Input placeholder="Enter text here..." multiline />
            <Input placeholder="Enter text here..." multiline startAdornment="globe" />
            <Input placeholder="Enter text here..." multiline endAdornment="Kg" />
            <Input placeholder="Enter text here..." multiline value={value} onChange={onChange} />
            <Input placeholder="Enter text here..." multiline hasError startAdornment="globe" />
            <Input placeholder="Enter text here..." multiline disabled startAdornment="globe" />
        </div>
    );
}
Multiline.parameters = {
    controls: { disabled: true },
    docs: {
        description: {
            story: "The `multiline` prop transforms the text field into a textarea.",
        },
    },
};

export function IconAdornments() {
    return (
        <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <Input placeholder="Enter text here..." startAdornment="globe" />
                <Input placeholder="Enter text here..." endAdornment="globe" />
                <Input placeholder="Enter text here..." startAdornment="€" />
                <Input placeholder="Enter text here..." endAdornment="Kg" />
                <Input placeholder="Enter text here..." startAdornment="globe" endAdornment="Kg" />
                <Input placeholder="Enter text here..." startAdornment={["globe", "Kg"]} />
            </div>
        </div>
    );
}
IconAdornments.storyName = "Icons & Adornments";
IconAdornments.parameters = {
    controls: { disabled: true },
    docs: {
        description: {
            story: `
Input can display one or multiple adornment using the props \`startAdornment\` & \`endAdornment\`.

This can be used to add a prefix, a suffix or an action to an input. 
For instance, you can use an icon button to hide or reveal the password.
If you want to add multiple adornments on one side you can give an array.

\`\`\`jsx
<TextField placeholder="Enter text here..." startAdornment="globe" />
\`\`\`

⚠️ Note: As adornment can be either text or icon, icons are detected based on character string. 
If you want your adornment to truly be a text, wrap it in a \`<span>\` element.
`,
        },
    },
};
