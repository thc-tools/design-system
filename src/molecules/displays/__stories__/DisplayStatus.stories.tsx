// Libs

// Components
import { StatusEnum } from "../../../core";
import { DisplayStatus } from "../DisplayStatus";

export default {
    title: "Design System/Molecules/Displays/DisplayStatus",
    component: DisplayStatus,
    args: {},
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { DisplayStatus } from "@thc-tools/design-system/molecules/displays"
\`\`\`
                `,
            },
        },
    },
};

const Template = (args) => <DisplayStatus {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    status: StatusEnum.Draft,
};

export function Variations() {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {Object.values(StatusEnum).map((status) => (
                <DisplayStatus key={status} status={status} />
            ))}
        </div>
    );
}

const statusList = Object.values(StatusEnum)
    .map((status) => `- \`${status}\`\n`)
    .join("");
Variations.parameters = {
    controls: { disabled: true },
    docs: {
        description: {
            story: `Statuses are the following: ${statusList}`,
        },
    },
};
