// Libs

// Components
import { BubblePercentage } from "../BubblePercentage";

export default {
    title: "Design System/Molecules/Displays/BubblePercentage",
    component: BubblePercentage,
    args: {},
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { BubblePercentage } from "@ds-tools/design-system/molecules/displays"
\`\`\`
                `,
            },
        },
    },
};

const Template = (args) => <BubblePercentage {...args} />;

export const Primary = Template.bind({});
Primary.args = { percentage: 40 };
