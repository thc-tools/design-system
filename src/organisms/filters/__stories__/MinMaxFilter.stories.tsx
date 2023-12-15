// Libs

// Components
import { useState } from "react";
import { MinMaxFilter, MinMaxFilterProps } from "src/design-system/organisms/filters/MinMaxFilter";

export default {
    title: "Design System/Organisms/Filters/MinMaxFilter",
    component: MinMaxFilter,
    args: {
        onFocus: null,
        onBlur: null,
    },
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { MinMaxFilter } from "@ds-tools/design-system/organisms/filters";
\`\`\`
                `,
            },
        },
    },
};

const Template = ({ value: valueProp, ...args }: MinMaxFilterProps) => {
    const [value, setValue] = useState(valueProp);
    return (
        <div>
            <div>Value : {JSON.stringify(value)}</div>
            <MinMaxFilter {...args} value={value} onChange={setValue} />
        </div>
    );
};

export const Primary = Template.bind({});
Primary.args = {
    endAdornment: "€",
    label: "Interval",
    value: { min: 8 },
    placeholder: { min: 5, max: 100 },
    prefixLabel: "De",
    joinLabel: "à",
};
