// Libs
import { useState } from "react";

// Components
import { Button } from "../../buttons";
import { Chip, ChipVariant } from "../Chip";
import { ChipAction } from "../ChipAction";
import { ChipContainer } from "../ChipContainer";

export default {
    title: "Design System/Molecules/Displays/Chip",
    component: Chip,
    args: {
        label: "Label",
        iconSize: "xs",
        iconPosition: "right",
    },
    argTypes: {
        color: {
            control: {
                type: "color",
            },
        },
    },
    parameters: {
        docs: {
            description: {
                component: `
Chips allow min-baskets to enter information, make selections, filter content, or trigger actions.

While included here as a standalone component, the most common use will be in some form of input.

\`\`\`js
import { Chip } from "@ds-tools/design-system/molecules/displays"
\`\`\`
                `,
            },
        },
    },
};

const Template = (args) => <Chip {...args} />;

export const Primary = Template.bind({});

export function Types() {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr repeat(2, 2fr)", gap: "10px " }}>
            <div />
            <div>Colored</div>
            <div>Outlined</div>

            <div>Enabled</div>
            <ChipContainer>
                <Chip label="Label" />
                <Chip
                    label="Label"
                    color="--ds-color--success-500"
                    onClick={() => {
                        // RAD
                    }}
                    icon="error"
                    iconPosition="right"
                />
                <Chip
                    label="Label"
                    color="--ds-color--error-500"
                    onClick={() => {
                        // RAD
                    }}
                    icon="min-basket"
                    iconPosition="left"
                />
            </ChipContainer>
            <ChipContainer>
                <Chip label="Outlined" type="outlined" />
                <Chip
                    label="Outlined"
                    type="outlined"
                    onClick={() => {
                        // RAF
                    }}
                    icon="error"
                    iconPosition="right"
                />
                <Chip label="Outlined" type="outlined" icon="min-basket" iconPosition="left" iconSize="m" />
            </ChipContainer>

            <div>Disabled</div>
            <ChipContainer>
                <Chip
                    disabled
                    label="Label"
                    onClick={() => {
                        // RAF
                    }}
                />
                <Chip
                    disabled
                    label="Label"
                    onClick={() => {
                        // RAD
                    }}
                    color="--ds-color--success-500"
                    icon="error"
                    iconPosition="right"
                />

                <Chip
                    disabled
                    label="Label"
                    onClick={() => {
                        // RAF
                    }}
                    color="--ds-color--error-500"
                    icon="min-basket"
                    iconPosition="left"
                />
            </ChipContainer>
            <ChipContainer>
                <Chip
                    disabled
                    label="Outlined"
                    type="outlined"
                    onClick={() => {
                        // RAF
                    }}
                />
                <Chip
                    disabled
                    label="Outlined"
                    type="outlined"
                    onClick={() => {
                        // RAD
                    }}
                    icon="error"
                    iconPosition="right"
                />
                <Chip
                    disabled
                    label="Outlined"
                    type="outlined"
                    onClick={() => {
                        // RAD
                    }}
                    icon="min-basket"
                    iconPosition="left"
                    iconSize="m"
                />
            </ChipContainer>
        </div>
    );
}
Types.parameters = {
    controls: { disabled: true },
    docs: {
        description: {
            story: "All chip variations",
        },
    },
};

export function WithVariations() {
    const variations: ChipVariant[] = ["primary", "secondary", "info", "success", "error", "warning", "purple"];
    return (
        <ChipContainer>
            {variations.map((v) => (
                <Chip key={v} label={v} variant={v} />
            ))}
        </ChipContainer>
    );
}
WithVariations.parameters = {
    controls: { disabled: true },
    docs: {
        description: {
            story: "Chip have some predefined color variations",
        },
    },
};

export function WithIcon() {
    return (
        <ChipContainer>
            <Chip label="Label" icon="min-basket" iconPosition="right" iconSize="xs" />
            <Chip label="Label" icon="min-basket" iconPosition="left" iconSize="s" />
            <Chip label="Label" icon="min-basket" iconPosition="left" iconSize="m" />
        </ChipContainer>
    );
}
WithIcon.parameters = {
    controls: { disabled: true },
    docs: {
        description: {
            story: "Chip can be decorated with an Icon before or after the label",
        },
    },
};

export function ChipContainerStory() {
    const originalFruits = ["Apple", "Banana", "Orange", "Kiwi"];
    const [fruits, setFruits] = useState([...originalFruits]);
    const deleteFruitFor = (label) => () => setFruits(fruits.filter((fruit) => label !== fruit));
    const resetFruits = () => setFruits([...originalFruits]);

    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <ChipContainer>
                {fruits.map((fruit) => (
                    <Chip label={fruit} key={fruit} icon="error" onClick={deleteFruitFor(fruit)} />
                ))}
            </ChipContainer>
            <Button variant="outlined" onClick={resetFruits} icon="undo">
                Reset
            </Button>
        </div>
    );
}
ChipContainerStory.storyName = "Chip Container";
ChipContainerStory.parameters = {
    controls: { disabled: true },
    docs: {
        description: {
            story: `
A chip container to display chips properly on a row with clean spacing

\`\`\`js
import { ChipContainer } from "./components/molecules/displays"
\`\`\`
`,
        },
    },
};

export function ActionChip() {
    return (
        <ChipContainer>
            {/* eslint-disable-next-line no-alert */}
            <ChipAction label="Label" onClick={() => alert("Chip clicked")} />
            {/* eslint-disable-next-line no-alert */}
            <ChipAction label="Label" onClick={() => alert("Chip clicked")} disabled />
        </ChipContainer>
    );
}
ActionChip.parameters = {
    controls: { disabled: true },
    docs: {
        description: {
            story: `
A chip variation that can be used in forms

\`\`\`js
import { ChipAction } from "./components/molecules/displays"
\`\`\`
`,
        },
    },
};
