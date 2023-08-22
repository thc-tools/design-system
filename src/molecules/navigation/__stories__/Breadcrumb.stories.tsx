// Libs
import React from "react";
import { MemoryRouter, useLocation } from "react-router-dom";

// Components
import { Breadcrumb } from "../Breadcrumb";

export default {
    title: "Design System/Molecules/Navigation/Breadcrumb",
    component: Breadcrumb,
    args: {},
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { Breadcrumb } from "@thc-tools/design-system/molecules/navigation"
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
    <MemoryRouter initialEntries={["/concepts"]}>
        <PathDisplay />
        <Breadcrumb {...args} />
    </MemoryRouter>
);

export const Primary = Template.bind({});
Primary.args = {
    icon: "cube",
    name: "cube-001",
    concept: "cube",
    to: "/cube",
};
