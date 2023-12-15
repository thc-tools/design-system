// Libs
import { useState } from "react";

// Components
import { DatePicker, DatePickerProps } from "../DatePicker";

export default {
    title: "Design System/Molecules/Inputs/DatePicker",
    component: DatePicker,
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { DatePicker, DatePickerField } from "@ds-tools/design-system/molecules/inputs"
\`\`\`
                `,
            },
        },
    },
};

function Template({ value: valueProp, ...args }: DatePickerProps) {
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
