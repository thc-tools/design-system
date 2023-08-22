/* eslint-disable no-alert */

// Libs
import React from "react";

// Components
import { ListItem } from "../ListItem";
import { ListItemActions } from "../ListItemActions";
import { ListItemIcon } from "../ListItemIcon";
import { ListItemText } from "../ListItemText";

export default {
    title: "Design System/Molecules/Lists/ListItem",
    component: ListItem,
    subcomponents: { ListItemText, ListItemIcon, ListItemActions },
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { ListItem, ListItemText, ListItemIcon } from "@thc-tools/design-system/molecules/lists"
\`\`\`
                `,
            },
        },
    },
};

const Template = (args) => <ListItem {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
