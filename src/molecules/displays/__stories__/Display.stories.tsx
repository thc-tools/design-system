// Libs
import React from "react";

// Components
import { Display, DISPLAY_TYPES } from "../Display";
import { DisplayContainer } from "../DisplayContainer";

export default {
    title: "Design System/Molecules/Displays/Displays",
    component: Display,
    args: {
        label: "Product",
        value: "Unicorn",
        onClick: undefined,
    },
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: `
Displays allow user to structured information about an entity.

While included here as a standalone component, the most common use will be in some of resource card.

\`\`\`js
import { Display, DisplayContainer } from "@thc-tools/design-system/molecules/display"
\`\`\`
                `,
            },
        },
    },
};

const Template = (args) => <Display {...args} />;

export const Primary = Template.bind({});

export function Orientation() {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "120px" }}>
            <div>
                <h2>Horizontal display</h2>
                <Display label="Product" value="Unicorn" type={DISPLAY_TYPES.ROW} />
            </div>
            <div>
                <h2>Vertical display</h2>
                <Display label="Product" value="Unicorn" type={DISPLAY_TYPES.COLUMN} />
            </div>
        </div>
    );
}
Orientation.parameters = {
    controls: { disabled: true },
    docs: {
        description: {
            story: `
Display have two different orientation for display:

- row (default)
- column
`,
        },
    },
};

export function Icons() {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "120px" }}>
            <div>
                <h2>Horizontal display</h2>
                <Display label="Product" value="Unicorn" type={DISPLAY_TYPES.ROW} icon="globe" />
            </div>
            <div>
                <h2>Vertical display</h2>
                <Display label="Product" value="Unicorn" type={DISPLAY_TYPES.COLUMN} icon="globe" />
            </div>
        </div>
    );
}
Icons.parameters = {
    controls: { disabled: true },
    docs: {
        description: {
            story: "Display can have an icon, will be displayed differently according to orientation.",
        },
    },
};

export function Action() {
    return (
        <DisplayContainer>
            <Display label="Product" value="Zebra" onClick={() => {}} />
            <Display label="Product" value="Giraffe" onClick={() => {}} />
            <Display label="Product" value="Lion" onClick={() => {}} />
        </DisplayContainer>
    );
}
Action.parameters = {
    docs: {
        description: {
            story: "Display can have an action through the `onClick` props. It will then inherit the properties from the atom `actionable`",
        },
    },
};

export function DisplayContainerStory() {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "120px" }}>
            <div>
                <h2>Vertical displays</h2>
                <DisplayContainer displayType={DISPLAY_TYPES.COLUMN}>
                    <Display label="Product" value="Zebra" />
                    <Display label="Product" value="Giraffe" />
                    <Display label="Product" value="Lion" />
                </DisplayContainer>
            </div>
            <div>
                <h2>Horizontal displays</h2>
                <DisplayContainer displayType={DISPLAY_TYPES.ROW}>
                    <Display label="Product" value="Bear" />
                    <Display label="Product" value="Bear cub" />
                    <Display label="Product" value="Otter" />
                </DisplayContainer>
            </div>
        </div>
    );
}
DisplayContainerStory.storyName = "DisplayContainer";
DisplayContainerStory.parameters = {
    controls: { disabled: true },
    docs: {
        description: {
            story: `
When multiple displays are to be presented together, wrapped them in a \`DisplayContainer\` to handle proper spacing.

\`DisplayContainer\` also accepts a props named \`type\`, if provided it will override the \`type\` for all nested \`Display\` components.

\`\`\`js
import { DisplayContainer } from "./components/molecules/displays"
\`\`\`
`,
        },
    },
};
