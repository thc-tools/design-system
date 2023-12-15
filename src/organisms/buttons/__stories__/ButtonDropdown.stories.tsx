// Components
import { ButtonDropdown } from "src/design-system/organisms/buttons/ButtonDropdown";

export default {
    title: "Design System/Molecules/Modals/ButtonDropdown",
    component: ButtonDropdown,
    args: {},
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { ButtonDropdown } from "@ds-tools/design-system/molecules/modals"
\`\`\`
                `,
            },
        },
    },
};

const Template = (args) => <ButtonDropdown {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    actions: [
        {
            key: "action-1",
            label: "click-me",
            icon: "globe",
        },
        {
            key: "action-2",
            label: "click-me more !",
            icon: "heart",
        },
    ],
};
