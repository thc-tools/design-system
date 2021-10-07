// Libs
import React, { useState } from "react";

// Components
import { SepiaThemeDecorator } from "../../../../.storybook/utils/Decorators";
import { Card, CardTitle, CardContent, CardContainer } from "../../cards";
import { DraggableList } from "../DraggableList";

export default {
    title: "Design System/Molecules/Lists/DraggableList",
    component: DraggableList,
    args: {
        onDragEnd: undefined,
        ListComponent: undefined,
        ListItemComponent: undefined,
    },
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { DraggableList } from "@thc-tools/design-system/molecules/lists"
\`\`\`
                `,
            },
        },
    },
};

function getItems(count) {
    return Array.from({ length: count }, (v, k) => k).map((k) => ({
        id: `item-${k}`,
        title: `Item ${k}`,
        content: `I'm item number ${k}`,
    }));
}

const ItemDisplay = ({ item }) => item.content;

function Template({ count = 5, ...args }) {
    const [items, setItems] = useState(getItems(count));

    return (
        <DraggableList {...args} items={items} onReorder={setItems}>
            <ItemDisplay />
        </DraggableList>
    );
}

export const Primary = Template.bind({});
Primary.args = {};

function CardDisplay({ item, dragHandle }) {
    return (
        <>
            {dragHandle}
            <CardTitle>{item.title}</CardTitle>
            <CardContent>{item.content}</CardContent>
        </>
    );
}

export function ComplexCardList({ count = 5, ...args }) {
    const [items, setItems] = useState(getItems(count));

    return (
        <DraggableList
            {...args}
            items={items}
            onReorder={setItems}
            hasDragHandle
            ListComponent={CardContainer}
            ListItemComponent={Card}
        >
            <CardDisplay />
        </DraggableList>
    );
}
ComplexCardList.decorators = [SepiaThemeDecorator];
