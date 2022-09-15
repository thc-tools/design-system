// Libs
import { useState } from "react";

// Components
import { PillTabs } from "src/design-system/molecules/navigation/PillTabs";
import { TabView } from "src/design-system/molecules/navigation/TabView";
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
import { Tab, Tabs, TabPanel } from "@ds-tools/design-system/molecules/navigation"
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
                <Tab icon="min-basket">Tab three three three</Tab>
            </Tabs>
            <div style={{ marginTop: "var(--ds-spacing--XL)" }}>
                <TabPanel value={0} currentValue={currentValue}>
                    <TabView>Panel one</TabView>
                </TabPanel>
                <TabPanel value={1} currentValue={currentValue}>
                    <TabView>Panel two</TabView>
                </TabPanel>
                <TabPanel value={2} currentValue={currentValue}>
                    <TabView>Panel three</TabView>
                </TabPanel>
            </div>
        </div>
    );
}

export function PillTabsStory() {
    const [currentValue, setValue] = useState("one");
    const handleChange = (newValue) => setValue(newValue);

    return (
        <div>
            <div>Current value : {currentValue}</div>
            <PillTabs currentValue={currentValue} onChange={handleChange}>
                <Tab value="one">Tab one</Tab>
                <Tab value="two">Tab two two</Tab>
                <Tab value="three" icon="min-basket">
                    Tab three three three
                </Tab>
            </PillTabs>
        </div>
    );
}
PillTabsStory.storyName = "Pill tabs";
