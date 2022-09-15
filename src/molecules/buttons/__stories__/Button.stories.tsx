// Libs

// Components
import { Button } from "../Button";
import { ButtonIcon } from "../ButtonIcon";

export default {
    title: "Design System/Molecules/Buttons",
    component: Button,
    args: {
        label: "Button",
        iconSize: "m",
        iconPosition: "left",
        icon: "audience",
        variant: "primary",
    },
    parameters: {
        docs: {
            description: {
                component: `
Buttons communicate actions that users can take. They are typically placed throughout your UI, in places like:

- Dialogs
- Modal windows
- Forms
- Cards
- Toolbars

\`\`\`js
import { Button } from "@ds-tools/design-system/molecules/buttons"
\`\`\`
                `,
            },
        },
    },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export function Types() {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr repeat(4, 2fr)", gap: "10px " }}>
            <div />
            <div>Primary</div>
            <div>outlined</div>
            <div>Caution</div>

            <div>Enabled</div>
            <Button variant="primary" label="Label" />
            <Button variant="outlined" label="Label" />
            <Button variant="caution" label="Label" />

            <div>Disabled</div>
            <Button disabled variant="primary" label="Label" />
            <Button disabled variant="outlined" label="Label" />
            <Button disabled variant="caution" label="button" />
        </div>
    );
}
Types.parameters = {
    controls: { disabled: true },
    docs: {
        description: {
            story: "All button variations",
        },
    },
};

export function WithIcon() {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            <Button icon="min-basket" label="Label" />
            <Button icon="min-basket" iconPosition="right" label="Label" />
            <Button icon="min-basket" disabled label="Label" />
        </div>
    );
}
WithIcon.parameters = {
    controls: { disabled: true },
    docs: {
        description: {
            story: "Button can be decorated with an Icon before or after the label",
        },
    },
};

export function IconButtons() {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 4fr)", gap: "10px " }}>
            <div />
            <div>Primary</div>
            <div>outlined</div>
            <div>Caution</div>

            <div>Enabled</div>
            <ButtonIcon variant="primary" icon="error" />
            <ButtonIcon variant="outlined" icon="error" />
            <ButtonIcon variant="caution" icon="error" />

            <div>Disabled</div>
            <ButtonIcon disabled variant="primary" icon="error" />
            <ButtonIcon disabled variant="outlined" icon="error" />
            <ButtonIcon disabled variant="caution" icon="error" />
        </div>
    );
}
IconButtons.parameters = {
    controls: { disabled: true },
    docs: {
        description: {
            story: `
\`\`\`js
import { ButtonIcon } from "./components/molecules/buttons"
\`\`\`
`,
        },
    },
};
