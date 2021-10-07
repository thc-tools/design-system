// Libs
import React, { useMemo } from "react";

// Utils
import { SepiaThemeDecorator } from "../../../../.storybook/utils/Decorators";

// Components
import { TableVirtualized } from "../Table.virtualized";

export default {
    title: "Design System/Molecules/Tables/Table (virtualized)",
    component: TableVirtualized,
    args: {},
    decorators: [SepiaThemeDecorator],
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { TableVirtualized } from "@thc-tools/design-system/molecules/tables"
\`\`\`
                `,
            },
        },
    },
};

const Template = ({ rowsCount, columnsCount, ...args }) => {
    const columns = useMemo(
        () => new Array(columnsCount).fill(true).map((_, c) => ({ field: `header${c}`, label: `Header ${c}` })),
        [columnsCount]
    );

    const data = useMemo(
        () =>
            new Array(rowsCount).fill(true).map((_, r) =>
                columns
                    .map((c) => c.field)
                    .reduce(
                        (acc, cName, c) => ({
                            ...acc,
                            [cName]: c % 3 ? `_item with long long long name r${r}:c${c}_` : `_item r${r}:c${c}_`,
                        }),
                        {}
                    )
            ),
        [columns, rowsCount]
    );

    return (
        <div style={{ height: 500 }}>
            <TableVirtualized {...args} columns={columns} data={data} />
        </div>
    );
};

export const Primary = Template.bind({});
Primary.args = {
    children: "toto",

    rowsCount: 100,
    columnsCount: 40,
};
