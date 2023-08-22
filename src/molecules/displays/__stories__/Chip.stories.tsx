// Libs
import React, { useState } from "react";

// Infrastructure
import { enumArgs, iconEnumArg } from "../../../../.storybook/utils/args";

// Components
import { Button } from "../../buttons";
import { Chip, CHIP_ICON_SIZE, CHIP_ICON_POSITION } from "../Chip";
import { ChipAction } from "../ChipAction";
import { ChipContainer } from "../ChipContainer";

export default {
    title: "Design System/Molecules/Displays/Chip",
    component: Chip,
    args: {
        label: "Label",
        iconSize: CHIP_ICON_SIZE.XS,
        iconPosition: CHIP_ICON_POSITION.RIGHT,
    },
    argTypes: {
        icon: iconEnumArg,
        iconSize: enumArgs(CHIP_ICON_SIZE, CHIP_ICON_SIZE.XS),
        iconPosition: enumArgs(CHIP_ICON_POSITION, CHIP_ICON_POSITION.RIGHT),
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
Chips allow users to enter information, make selections, filter content, or trigger actions.

While included here as a standalone component, the most common use will be in some form of input.

\`\`\`js
import { Chip } from "@thc-tools/design-system/molecules/displays"
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
                    color="--thc-color--green-100"
                    onClick={() => {}}
                    icon="close"
                    iconPosition="right"
                />
                <Chip label="Label" color="--thc-color--red-100" icon="user" iconPosition="left" />
            </ChipContainer>
            <ChipContainer>
                <Chip label="Outlined" type="outlined" />
                <Chip label="Outlined" type="outlined" onClick={() => {}} icon="close" iconPosition="right" />
                <Chip label="Outlined" type="outlined" icon="user" iconPosition="left" iconSize="m" />
            </ChipContainer>

            <div>Disabled</div>
            <ChipContainer>
                <Chip disabled label="Label" onClick={() => {}} />
                <Chip
                    disabled
                    label="Label"
                    onClick={() => {}}
                    color="--thc-color--green-100"
                    icon="close"
                    iconPosition="right"
                />

                <Chip
                    disabled
                    label="Label"
                    onClick={() => {}}
                    color="--thc-color--red-100"
                    icon="user"
                    iconPosition="left"
                />
            </ChipContainer>
            <ChipContainer>
                <Chip disabled label="Outlined" type="outlined" onClick={() => {}} />
                <Chip disabled label="Outlined" type="outlined" onClick={() => {}} icon="close" iconPosition="right" />
                <Chip
                    disabled
                    label="Outlined"
                    type="outlined"
                    onClick={() => {}}
                    icon="user"
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

export function WithIcon() {
    return (
        <ChipContainer>
            <Chip label="Label" icon="user" iconPosition="left" iconSize="s" />
            <Chip label="Label" icon="user" iconPosition="left" iconSize="m" />
            <Chip label="Label" icon="user" iconPosition="right" iconSize="l" />
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
                    <Chip label={fruit} key={fruit} icon="close" onClick={deleteFruitFor(fruit)} />
                ))}
            </ChipContainer>
            <Button type="secondary" onClick={resetFruits} icon="undo">
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
