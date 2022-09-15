// Libs
import { useState } from "react";

// Utils
import { SepiaThemeDecorator } from "../../../../.storybook/utils/Decorators";

// Components
import { HeaderCell, HeaderCellProps, SortDirection } from "../HeaderCell";

export default {
    title: "Design System/Molecules/Tables/HeaderCell",
    component: HeaderCell,
    args: {},
    decorators: [SepiaThemeDecorator],
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { HeaderCell } from "@ds-tools/design-system/molecules/tables"
\`\`\`
                `,
            },
        },
    },
};

const Template = ({ sortDirection, ...args }: HeaderCellProps) => {
    const [sort, setSort] = useState<SortDirection>(sortDirection);
    return <HeaderCell {...args} sortDirection={sort} onSort={setSort} />;
};

export const Primary = Template.bind({});
Primary.args = {
    children: "toto",
};
