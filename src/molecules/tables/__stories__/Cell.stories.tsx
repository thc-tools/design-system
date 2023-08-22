// Libs
import React from "react";

// Utils
import { SepiaThemeDecorator } from "../../../../.storybook/utils/Decorators";

// Components
import { Cell } from "../Cell";

export default {
    title: "Design System/Molecules/Tables/Cell",
    component: Cell,
    args: {},
    decorators: [SepiaThemeDecorator],
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { Cell } from "@thc-tools/design-system/molecules/tables"
\`\`\`
                `,
            },
        },
    },
};

const Template = (args) => <Cell {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: "toto",
};
