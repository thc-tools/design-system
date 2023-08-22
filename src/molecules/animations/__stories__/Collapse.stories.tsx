// Libs
import React, { useState } from "react";

// Components
import { SepiaThemeDecorator } from "../../../../.storybook/utils/Decorators";
import { Button } from "../../buttons";
import { Collapse } from "../Collapse";
import { DURATION } from "../_utils";

export default {
    title: "Design System/Molecules/Animations/Collapse",
    component: Collapse,
    args: {
        timeout: DURATION.standard,
    },
    argTypes: {},
    decorators: [SepiaThemeDecorator],
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { Collapse } from "@thc-tools/design-system/molecules/animations"
\`\`\`
                `,
            },
        },
    },
};

function Template({ in: inProp, ...args }) {
    const [open, setOpen] = useState(inProp);

    return (
        <>
            <Button onClick={() => setOpen(!open)}>Toggle Collapse</Button>
            <Collapse {...args} in={open} />
        </>
    );
}

export const Primary = Template.bind({});
Primary.args = {
    in: false,
    children: (
        <div className="thc-o-paper" style={{ height: "200px" }}>
            Content
        </div>
    ),
};
