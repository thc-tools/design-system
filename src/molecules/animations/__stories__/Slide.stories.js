// Libs
import React, { useState } from "react";

// Components
import { SepiaThemeDecorator } from "../../../../.storybook/utils/Decorators";
import { Button } from "../../buttons";
import { Slide } from "../Slide";

export default {
    title: "Design System/Molecules/Animations/Slide",
    component: Slide,
    args: {},
    argTypes: {},
    decorators: [SepiaThemeDecorator],
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { Slide } from "@thc-tools/design-system/molecules/animations"
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
            <Button onClick={() => setOpen(!open)}>Toggle Slide</Button>
            <Slide {...args} in={open} />
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
