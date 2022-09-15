// Libs

// Components

import { Tag } from "../Tag";

export default {
    title: "Design System/Molecules/Displays/Tag",
    component: Tag,
    args: {
        label: "Label",
        icon: "min-basket",
        iconSize: "s",
        iconPosition: "left",
    },
    parameters: {
        docs: {
            description: {
                component: `
Tags allow min-baskets to enter information, make selections, filter content

While included here as a standalone component, the most common use will be in some form of input.

\`\`\`js
import { Tag } from "@ds-tools/design-system/molecules/displays"
\`\`\`
                `,
            },
        },
    },
};

const Template = (args) => <Tag {...args} />;

export const Primary = Template.bind({});

export const Voucher = Template.bind({});
Voucher.args = {
    label: "Label",
    icon: "min-basket",
    iconSize: "s",
    iconPosition: "left",
    variant: "voucher",
};
