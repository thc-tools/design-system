// Libs
import React from "react";

// Components
import { LoaderIcon } from "../LoaderIcon";
import { LoaderSpinner } from "../LoaderSpinner";
import { LoaderProgression } from "../LoaderProgression";

export default {
    title: "Design System/Molecules/Loader",
    component: LoaderIcon,

    parameters: {
        docs: {
            description: {
                component: `
Loader allow you to show loading while your waiting for your data.

\`\`\`js
import { LoaderIcon, LoaderProgression, LoaderSpinner } from "@thc-tools/design-system/molecules/loaders"
\`\`\`
                `,
            },
        },
    },
};

const Template = (args) => <LoaderIcon {...args} />;

export const Primary = Template.bind({});

export function Variations() {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            <div>Progress loading (%)</div>
            <div>Spinner loading (infinite)</div>
            <div>Spinner loaded</div>

            <LoaderProgression percent={30} />
            <LoaderSpinner isLoading />
            <LoaderSpinner />
        </div>
    );
}
Variations.parameters = {
    controls: { disabled: true },
    docs: {
        description: {
            story: "Controls using the props: `disabled`, `hasError` and `hasWarning`",
        },
    },
};
