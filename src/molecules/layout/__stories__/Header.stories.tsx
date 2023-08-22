/* eslint-disable no-alert */

// Libs
import React from "react";
import { MemoryRouter } from "react-router-dom";

// Components
import { SepiaThemeDecorator } from "../../../../.storybook/utils/Decorators";

import { Header } from "../Header";
import { BreadcrumbBar, Breadcrumb } from "../../navigation";

export default {
    title: "Design System/Molecules/Layout/Header",
    component: Header,
    decorators: [SepiaThemeDecorator],
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { Header } from "@thc-tools/design-system/molecules/layout"
\`\`\`
                `,
            },
        },
    },
};

const Template = (args) => <Header {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: (
        <MemoryRouter initialEntries={["/cubes/001/a"]}>
            <BreadcrumbBar>
                <Breadcrumb icon="cube" to="/cubes" />
                <Breadcrumb concept="cube" name="cube-001" to="/cubes/001" />
                <Breadcrumb concept="face" name="cube-001a" to="/cubes/001/a" />
            </BreadcrumbBar>
        </MemoryRouter>
    ),
    actions: [
        { label: "create", action: () => alert("create"), type: "primary" },
        { label: "edit", icon: "edit", action: () => alert("edit"), buttonType: "icon" },
        { label: "delete", icon: "trash", action: () => alert("delete") },
        { label: "download", icon: "download", action: () => alert("download") },
    ],
};
