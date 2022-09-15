// Libs

// Utils
import { useState } from "react";
import { SepiaThemeDecorator } from "../../../../.storybook/utils/Decorators";

// Components
import { TablePagination, TablePaginationProps } from "../TablePagination";

export default {
    title: "Design System/Molecules/Tables/TablePagination",
    component: TablePagination,
    args: {
        count: 150,
        limit: 10,
        limitOptions: [10, 20, 50],
        page: 0,
    },
    decorators: [SepiaThemeDecorator],
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { TablePagination } from "@ds-tools/design-system/molecules/tables"
\`\`\`
                `,
            },
        },
    },
};

const Template = ({ limit: limitProp, page: pageProp, ...args }: TablePaginationProps) => {
    const [limit, setLimit] = useState(limitProp);
    const [page, setPage] = useState(pageProp);

    return (
        <>
            <div>Limit : {limit}</div>
            <div>Page : {page}</div>
            <TablePagination {...args} limit={limit} page={page} onLimitChange={setLimit} onPageChange={setPage} />
        </>
    );
};

export const Primary = Template.bind({});
Primary.args = {
    children: "toto",
};
