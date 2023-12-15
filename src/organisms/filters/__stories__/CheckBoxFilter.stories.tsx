// Libs

// Components
import { useState } from "react";
import { CheckboxFilter, CheckboxFilterProps } from "src/design-system/organisms/filters/CheckboxFilter";
import { daysOfTheWeek } from "src/utils/formatters";

export default {
    title: "Design System/Organisms/Filters/CheckboxFilter",
    component: CheckboxFilter,
    args: {
        onFocus: null,
        onBlur: null,
    },
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { CheckboxFilter } from "@ds-tools/design-system/organisms/filters";
\`\`\`
                `,
            },
        },
    },
};

const Template = ({ value: valueProp, ...args }: CheckboxFilterProps) => {
    const [value, setValue] = useState(valueProp);
    return (
        <div>
            <div>Value : {JSON.stringify(value)}</div>
            <CheckboxFilter {...args} value={value} onChange={setValue} />
        </div>
    );
};

export const Primary = Template.bind({});
Primary.args = {
    label: "Jour",
    value: ["1", "2"],
    options: daysOfTheWeek().map((dow) => ({ value: dow.name, label: dow.label })),
};
Primary.storyName = "CheckboxFilter";
