// Libs
import React from "react";

// Components
import { SepiaThemeDecorator } from "../../../../.storybook/utils/Decorators";
import { Button } from "../../buttons";
import { Card } from "../Card";
import { CardActions } from "../CardActions";
import { CardContainer, CARD_CONTAINER_ORIENTATION } from "../CardContainer";
import { CardContent } from "../CardContent";
import { CardSeparator } from "../CardSeparator";
import { CardTitle } from "../CardTitle";

export default {
    title: "Design System/Molecules/Card",
    component: Card,
    subcomponents: { CardActions, CardContainer, CardContent, CardSeparator, CardTitle },
    args: {
        onClick: undefined,
    },
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: `
Cards contain content and actions about a single subject.

They should be easy to scan for relevant and actionable information. Elements, like text and images, should be placed on them in a way that clearly indicates hierarchy.

\`\`\`js
import { 
    Card, 
    CardActions, 
    CardContainer, 
    CardContent, 
    CardSeparator, 
    CardTitle 
} from "@thc-tools/design-system/molecules/cards"
\`\`\`

To be displayed a card must compose with those three basic blocks:

\`\`\`jsx
<Card>
    <CardTitle helperText="I am here to help you">Title</CardTitle>
    <CardSeparator />
    <CardContent>I am a content</CardContent>
    <CardActions>
        <span>Action 1</span>
        <span>Action 2</span>
    </CardActions>
</Card>
\`\`\`

⚠️ If needed to be structured, the \`CardContent\` & \`CardTile\` can be used multiple times ! 💪🏼
`,
            },
        },
    },
    decorators: [SepiaThemeDecorator],
};

const Template = ({ titleArgs, contentArgs, ...args }) => (
    <Card {...args}>
        <CardTitle {...titleArgs} />
        <CardSeparator />
        <CardContent {...contentArgs}>I am a content</CardContent>
        <CardActions>
            <Button type="secondary">Action 1</Button>
            <Button type="secondary">Action 2</Button>
        </CardActions>
    </Card>
);

export const Primary = Template.bind({});
Primary.args = {
    titleArgs: {
        children: "Title",
        helperText: "I am here to help you",
    },
    contentArgs: {
        children: "I am a content",
    },
};

export const Actions = Template.bind({});
Actions.args = {
    titleArgs: {
        children: "Title",
    },
    contentArgs: {
        children: "I am a content",
    },
    onClick: () => {},
};
Actions.parameters = {
    docs: {
        description: {
            story: "Card can have an action through the `onClick` props. It will then inherit the properties from the atom `actionable`",
        },
    },
};

export function CardContainerStory() {
    return (
        <>
            <CardContainer>
                <Card>
                    <CardTitle>Card 1</CardTitle>
                    <CardSeparator />
                    <CardContent>I&apos;m 1st content</CardContent>
                </Card>
                <Card>
                    <CardTitle>Card 2</CardTitle>
                    <CardSeparator />
                    <CardContent>I&apos;m 2nd content</CardContent>
                </Card>
                <CardContainer orientation={CARD_CONTAINER_ORIENTATION.HORIZONTAL}>
                    <Card>
                        <CardTitle>Card 3</CardTitle>
                        <CardSeparator />
                        <CardContent>I&apos;m 3rd content</CardContent>
                    </Card>
                    <CardContainer orientation={CARD_CONTAINER_ORIENTATION.VERTICAL}>
                        <Card>
                            <CardTitle>Card 4</CardTitle>
                            <CardSeparator />
                            <CardContent>I&apos;m 4rd content</CardContent>
                        </Card>
                        <Card>
                            <CardTitle>Card 5</CardTitle>
                            <CardSeparator />
                            <CardContent>I&apos;m 5th content</CardContent>
                            <CardContent>I&apos;m 6th content</CardContent>
                        </Card>
                    </CardContainer>
                </CardContainer>
            </CardContainer>
        </>
    );
}
CardContainerStory.storyName = "CardContainer";
CardContainerStory.parameters = {
    controls: { disabled: true },

    docs: {
        description: {
            story: `
When you want to display several Cards next to one another. You can use the \`CardContainer\` to space 'em properly.

Using the props \`orientation\` with you can choose which orientation to use :

- vertical
- horizontal

*Note:* You can and should nest \`CardContainer\` for more complex layouts
`,
        },
    },
};
