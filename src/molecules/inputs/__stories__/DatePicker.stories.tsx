// Libs
import React, { useState } from "react";

// Components
import { DatePicker } from "../DatePicker";

export default {
    title: "Design System/Molecules/Inputs/DatePicker",
    component: DatePicker,
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { DatePicker, DatePickerField } from "@thc-tools/design-system/molecules/inputs"
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
            <DatePicker {...args} value={value} onChange={onChange} />
        </>
    );
}

export const Primary = Template.bind({});
Primary.args = {
    id: Math.random(),
    name: Math.random().toString(),
};
