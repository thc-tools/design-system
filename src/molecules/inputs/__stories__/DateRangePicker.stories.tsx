// Libs
import { useState } from "react";

// Components
import { DateRangePicker, DateRangePickerProps } from "../DateRangePicker";

export default {
    title: "Design System/Molecules/Inputs/DateRangePicker",
    component: DateRangePicker,
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { DateRangePicker, DateRangePickerField } from "@ds-tools/design-system/molecules/inputs"
\`\`\`
                `,
            },
        },
    },
};

function Template({ value: valueProp, ...args }: DateRangePickerProps) {
    const [value, setValue] = useState(valueProp);
    const onChange = (event) => setValue(event.target.value);

    return (
        <>
            <p>Current value is: {JSON.stringify(value)}</p>
            <hr />
            <DateRangePicker {...args} value={value} onChange={onChange} />
        </>
    );
}

export const Primary = Template.bind({});
Primary.args = {
    id: Math.random(),
    name: Math.random().toString(),
};

export const WithRanges = Template.bind({});
WithRanges.args = {
    withStaticRanges: true,
};
