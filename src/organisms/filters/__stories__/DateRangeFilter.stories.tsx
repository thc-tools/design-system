// Libs

// Components
import { useState } from "react";
import { DateRangePickerProps } from "src/design-system/molecules/inputs";
import { DateRangeFilter } from "src/design-system/organisms/filters/DateRangeFilter";

export default {
    title: "Design System/Organisms/Filters/DateRangeFilter",
    component: DateRangeFilter,
    args: {
        onFocus: null,
        onBlur: null,
    },
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { DateRangeFilter } from "@ds-tools/design-system/organisms/filters";
\`\`\`
                `,
            },
        },
    },
};

const Template = ({ value: valueProp, ...args }: DateRangePickerProps) => {
    const [value, setValue] = useState(valueProp);
    return (
        <div>
            <div>Value : {JSON.stringify(value)}</div>
            <DateRangeFilter {...args} value={value} onChange={setValue} />
        </div>
    );
};

export const Primary = Template.bind({});

export const StaticRanges = Template.bind({});
StaticRanges.args = { withStaticRanges: true };
