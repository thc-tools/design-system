// Libs
import React from "react";
import { MemoryRouter, useLocation } from "react-router-dom";

// Components
import { SepiaThemeDecorator } from "../../../../.storybook/utils/Decorators";
import { Menu } from "../Menu";
import { MenuItem } from "../MenuItem";
import { MenuList } from "../MenuList";
import { MenuSeparator } from "../MenuSeparator";

export default {
    title: "Design System/Molecules/Navigation/Menu",
    component: Menu,
    subcomponents: { MenuItem, MenuList, MenuSeparator },
    args: {
        label: "Label",
    },
    decorators: [SepiaThemeDecorator],
    parameters: {
        docs: {
            description: {
                component: `
Labels allow input to have meaning about it.

\`\`\`js
import { Menu, MenuList, MenuItem, MenuSeparator } from "@thc-tools/design-system/molecules/navigation"
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

export function Primary() {
    return (
        <MemoryRouter initialEntries={["/datasets"]}>
            <PathDisplay />
            <Menu style={{ height: "500px" }}>
                <MenuList>
                    <MenuItem icon="user" tooltip="My Profile" to="/users/me" />
                    <MenuSeparator />
                    <MenuItem icon="database" label="Dataset library" to="/datasets" />
                    <MenuItem icon="preprocessing" label="Pipeline" to="/pipelines" />
                </MenuList>
                <MenuList>
                    <MenuItem icon="documentation" tooltip="Documentation" to="/documentation" />
                    <MenuItem icon="power-off" tooltip="Logout" to="/logout" />
                </MenuList>
            </Menu>
        </MemoryRouter>
    );
}
