// Libs
import React, { useState } from "react";

// Components
import { DateRangePicker } from "../DateRangePicker";

export default {
    title: "Design System/Molecules/Inputs/DateRangePicker",
    component: DateRangePicker,
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { DateRangePicker, DateRangePickerField } from "@thc-tools/design-system/molecules/inputs"
\`\`\`
                `,
            },
        },
    },
};

function Template({ value: valueProp, ...args }) {
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
    value: {
        // startDate: "2021-05-18T10:00:00.000Z",
        // endDate: "2021-05-25T10:00:00.000Z",
    },
};
