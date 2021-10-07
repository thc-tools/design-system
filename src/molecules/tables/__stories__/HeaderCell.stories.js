// Libs
import React from "react";

// Utils
import { SepiaThemeDecorator } from "../../../../.storybook/utils/Decorators";

// Components
import { HeaderCell } from "../HeaderCell";

export default {
    title: "Design System/Molecules/Tables/HeaderCell",
    component: HeaderCell,
    args: {},
    decorators: [SepiaThemeDecorator],
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { HeaderCell } from "@thc-tools/design-system/molecules/tables"
\`\`\`
                `,
            },
        },
    },
};

const Template = (args) => <HeaderCell {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: "toto",
    icon: "globe",
};
