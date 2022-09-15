// Libs

// Components
import { Button } from "../../buttons";
import { Tooltip } from "../Tooltip";
import { TooltipContent } from "../TooltipContent";
import { TooltipDivider } from "../TooltipDivider";
import { TooltipSubtitle } from "../TooltipSubtitle";
import { TooltipTitle } from "../TooltipTitle";

export default {
    title: "Design System/Molecules/Modals/Tooltip",
    component: Tooltip,
    subcomponents: { TooltipTitle, TooltipSubtitle, TooltipContent, TooltipDivider },
    args: {},
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { Tooltip, TooltipTitle, TooltipSubtitle, TooltipContent, TooltipDivider } from "@ds-tools/design-system/molecules/modals";
\`\`\`

Tooltip goal is to display tips for a specific component, ie : "what it will do", "why is it disabled", or some additional context. 

By default tooltips can take into props a title and a content. For more complex display cases you can use the sub-components :  \`TooltipTitle\`, \`TooltipSubtitle\`, \`TooltipContent\` & \`TooltipDivider\`.
                `,
            },
        },
    },
};

const Template = (args) => (
    <div style={{ padding: "100px" }}>
        <Tooltip {...args} />
    </div>
);

export const Primary = Template.bind({});
Primary.args = {
    children: <Button>With tooltip</Button>,
    tooltip: "test",
    placement: "bottom",
    tooltipTitle: "Title",
    size: "xxs",
};

export const ComplexeTemplate = () => (
    <div style={{ padding: "100px" }}>
        <Tooltip
            size="xs"
            tooltip={
                <>
                    <TooltipTitle>I&apos;m a title</TooltipTitle>
                    <TooltipSubtitle>I&apos;m subtile</TooltipSubtitle>
                    <TooltipDivider />
                    <TooltipContent>I&apos;m content</TooltipContent>
                    <TooltipSubtitle>I&apos;m subtile 2</TooltipSubtitle>
                    <TooltipDivider />
                    <TooltipContent>I&apos;m content 2</TooltipContent>
                </>
            }
        >
            <Button>With complexe tooltip</Button>
        </Tooltip>
    </div>
);
