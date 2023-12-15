// Libs

// Utils
import { SepiaThemeDecorator } from "../../../../.storybook/utils/Decorators";

// Components
import { useState } from "react";
import { FooterCell } from "src/design-system/molecules/tables/FooterCell";
import { HeaderCell } from "src/design-system/molecules/tables/HeaderCell";
import { Table } from "src/design-system/molecules/tables/Table";
import { TableBody } from "src/design-system/molecules/tables/TableBody";
import { TableContainer } from "src/design-system/molecules/tables/TableContainer";
import { TableFooter } from "src/design-system/molecules/tables/TableFooter";
import { TableHeader } from "src/design-system/molecules/tables/TableHeader";
import { TablePagination } from "src/design-system/molecules/tables/TablePagination";
import { TableRow } from "src/design-system/molecules/tables/TableRow";
import { Cell } from "../Cell";

export default {
    title: "Design System/Molecules/Tables/Table",
    component: Table,
    decorators: [SepiaThemeDecorator],
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { Cell } from "@ds-tools/design-system/molecules/tables"
\`\`\`
                `,
            },
        },
    },
};

const Template = (args) => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    return (
        <TableContainer hasSticky style={{ minHeight: "500px" }}>
            <Table {...args}>
                <TableHeader>
                    <TableRow>
                        <HeaderCell>Label 1</HeaderCell>
                        <HeaderCell>Label 2</HeaderCell>
                        <HeaderCell>Label 3</HeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {new Array(50).fill(false).map((_v, i) => (
                        <TableRow key={i}>
                            <Cell>Cell {i}1</Cell>
                            <Cell>Cell {i}2</Cell>
                            <Cell>Cell {i}3</Cell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <FooterCell>Foot 1</FooterCell>
                        <FooterCell>Foot 2</FooterCell>
                        <FooterCell>Foot 3</FooterCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <TablePagination
                count={150}
                limitOptions={[10, 20, 50]}
                limit={limit}
                page={page}
                onLimitChange={setLimit}
                onPageChange={setPage}
            />
        </TableContainer>
    );
};

export const Primary = Template.bind({});
Primary.args = {};
