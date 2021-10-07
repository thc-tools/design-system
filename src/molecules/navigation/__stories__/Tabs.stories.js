// Libs
import React, { useState } from "react";

// Components
import { Tab } from "../Tab";
import { TabPanel } from "../TabPanel";
import { Tabs } from "../Tabs";

export default {
    title: "Design System/Molecules/Navigation/Tabs",
    component: Tab,
    subcomponents: { Tabs, TabPanel },
    args: {},
    parameters: {
        docs: {
            description: {
                component: `
Tabs make it easy to explore and switch between different views.

\`\`\`js
import { Tab, Tabs, TabPanel } from "@thc-tools/design-system/molecules/navigation"
\`\`\`
                `,
            },
        },
    },
};

export function Primary() {
    const [currentValue, setValue] = useState(0);
    const handleChange = (newValue) => setValue(newValue);

    return (
        <div>
            <Tabs currentValue={currentValue} onChange={handleChange}>
                <Tab>Tab one</Tab>
                <Tab>Tab two two</Tab>
                <Tab icon="cube">Tab three three three</Tab>
            </Tabs>
            <div style={{ marginTop: "var(--thc-spacing--M)" }}>
                <TabPanel value={0} currentValue={currentValue}>
                    Panel one
                </TabPanel>
                <TabPanel value={1} currentValue={currentValue}>
                    Panel two
                </TabPanel>
                <TabPanel value={2} currentValue={currentValue}>
                    Panel three
                </TabPanel>
            </div>
        </div>
    );
}
