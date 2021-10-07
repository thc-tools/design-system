/* eslint-disable no-alert */

// Libs
import React from "react";

// Components
import { ButtonIcon } from "../../buttons";
import { List } from "../List";
import { ListItem } from "../ListItem";
import { ListItemActions } from "../ListItemActions";
import { ListItemIcon } from "../ListItemIcon";
import { ListItemText } from "../ListItemText";

export default {
    title: "Design System/Molecules/Lists/List",
    component: List,
    subcomponents: { ListItem, ListItemActions },

    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { List, ListItem } from "@thc-tools/design-system/molecules/lists"
\`\`\`
                `,
            },
        },
    },
};

const Template = ({ items, ...args }) => (
    <List {...args}>
        {items.map((item) => (
            <ListItem key={item.key}>
                <ListItemIcon icon={item.icon} />
                <ListItemText primary={item.primary} secondary={item.secondary} />
                <ListItemActions>
                    <ButtonIcon>{item.actionIcon}</ButtonIcon>
                </ListItemActions>
            </ListItem>
        ))}
    </List>
);

export const Primary = Template.bind({});
Primary.args = {
    items: [
        {
            key: "globle",
            icon: "globe",
            primary: "I am a globe",
            secondary: "Or I am flat",
            actionIcon: "star",
        },
        {
            key: "cube",
            icon: "cube",
            primary: "I am a cube",
            secondary: "Most generic concept ever",
            actionIcon: "heart",
        },
    ],
};
