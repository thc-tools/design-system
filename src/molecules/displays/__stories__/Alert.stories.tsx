// Components
import { Alert } from "../Alert";

export default {
    title: "Design System/Molecules/Displays/Alert",
    component: Alert,
    args: {
        title: "Je suis une alerte",
        children: "Mais je n'alerte d'absolument rien d'intéressant",
        extraContent: "Je suis doublement pas intéresant, mais je me cache",
    },
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { Alert } from "@ds-tools/design-system/molecules/displays"
\`\`\`
                `,
            },
        },
    },
};

const Template = (args) => <Alert {...args} />;

export const Primary = Template.bind({});
