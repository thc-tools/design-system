// Libs
import React from "react";
import { MemoryRouter, useLocation } from "react-router-dom";

// Components
import { Breadcrumb } from "../Breadcrumb";
import { BreadcrumbBar } from "../BreadcrumbBar";

export default {
    title: "Design System/Molecules/Navigation/BreadcrumbBar",
    component: BreadcrumbBar,
    args: {},
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { BreadcrumbBar } from "@thc-tools/design-system/molecules/navigation"
\`\`\`
                `,
            },
        },
    },
};

function PathDisplay() {
    const location = useLocation();

    return <div style={{ marginBottom: "20px" }}>Currently on: {location.pathname}</div>;
}

const Template = (args) => (
    <MemoryRouter initialEntries={["/cubes/001/a"]}>
        <PathDisplay />
        <BreadcrumbBar {...args}>
            <Breadcrumb icon="cube" to="/cubes" />
            <Breadcrumb concept="cube" name="cube-001" to="/cubes/001" />
            <Breadcrumb concept="face" name="cube-001a" to="/cubes/001/a" />
        </BreadcrumbBar>
    </MemoryRouter>
);

export const Primary = Template.bind({});
Primary.args = {};
