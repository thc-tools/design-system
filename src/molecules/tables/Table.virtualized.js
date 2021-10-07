// Libs
import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import scrollbarSize from "dom-helpers/scrollbarSize";
import { AutoSizer, Grid, ScrollSync } from "react-virtualized";

// Utils
import { getCSSVariable } from "../../core/utils";

// Components
import { HeaderCell } from "./HeaderCell";
import { Cell } from "./Cell";

const COLUMN_MIN_WIDTH = Number.parseInt(getCSSVariable("--thc-cell-min-width").replace("px", ""));
const HEADER_HEIGHT = Number.parseInt(getCSSVariable("--thc-header-cell-height").replace("px", ""));
const ROW_HEIGHT = Number.parseInt(getCSSVariable("--thc-cell-height").replace("px", ""));

const defaultDataProp = [];

/**
 * Based on examples from https://github.com/bvaughn/react-virtualized/blob/master/source/ScrollSync/ScrollSync.example.js
 * Simple cell measurer exists: see https://github.com/bvaughn/react-virtualized/blob/master/source/CellMeasurer/CellMeasurer.example.js
 */
export function TableVirtualized({ className, columns, data = defaultDataProp }) {
    const rootClassName = classnames("thc-o-paper", "thc-c-table", className);

    const rowCount = data.length;
    const columnCount = Object.keys(columns).length;

    const [hoveredRow, setHoveredRow] = useState(null);

    const columnsNames = useMemo(() => columns.map((c) => c.field), [columns]);
    const matrix = useMemo(
        () => data.map((row) => columnsNames.reduce((acc, cName) => [...acc, row[cName]], [])),
        [data, columnsNames]
    );

    const columnsMaxLength = useMemo(
        () =>
            Array(columnCount)
                .fill(true)
                .map((_, c) =>
                    Math.max(
                        COLUMN_MIN_WIDTH,
                        (columns[c].label ?? columns[c].field).length * 10 + (columns[c].icon ? 25 : 0),
                        ...matrix.map((d) => (d[c] ?? "").toString().length * 7)
                    )
                ),
        [matrix, columnCount, columns]
    );

    const headerRenderer = useCallback(
        function headerRenderer({ columnIndex, key, style }) {
            const item = columns[columnIndex];
            const label = item.label ?? item.field;

            return (
                <HeaderCell key={key} style={style} icon={item.icon} onClick={item.onClick}>
                    {label}
                </HeaderCell>
            );
        },
        [columns]
    );

    const cellRenderer = useCallback(
        function cellRenderer({ columnIndex, key, rowIndex, style }) {
            const item = matrix[rowIndex][columnIndex];
            const columnDefinition = columns[columnIndex];

            return (
                <Cell
                    formatter={columnDefinition.formatter}
                    hover={hoveredRow === rowIndex}
                    key={key}
                    onHover={(hover) => setHoveredRow(hover ? rowIndex : null)}
                    style={style}
                >
                    {item}
                </Cell>
            );
        },
        [matrix, hoveredRow, setHoveredRow, columns]
    );

    return (
        <AutoSizer className={rootClassName}>
            {({ height, width }) => (
                <ScrollSync>
                    {({ onScroll, scrollLeft }) => (
                        <div>
                            <Grid
                                cellRenderer={headerRenderer}
                                className="thc-c-table__header--virtualized"
                                columnCount={columnCount}
                                columnWidth={({ index }) => columnsMaxLength[index]}
                                height={HEADER_HEIGHT}
                                overscanColumnCount={1}
                                rowCount={1}
                                rowHeight={HEADER_HEIGHT}
                                scrollLeft={scrollLeft}
                                width={width - scrollbarSize()}
                            />
                            <Grid
                                className="thc-c-table__body--virtualized"
                                cellRenderer={cellRenderer}
                                columnCount={columnCount}
                                columnWidth={({ index }) => columnsMaxLength[index]}
                                height={height - HEADER_HEIGHT}
                                onScroll={onScroll}
                                overscanColumnCount={1}
                                overscanRowCount={2}
                                rowCount={rowCount}
                                rowHeight={ROW_HEIGHT}
                                width={width}
                            />
                        </div>
                    )}
                </ScrollSync>
            )}
        </AutoSizer>
    );
}

TableVirtualized.propTypes = {
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * Columns definitions
     */
    columns: PropTypes.arrayOf(PropTypes.shape(HeaderCell.prototype)),
    /**
     * Data
     */
    data: PropTypes.arrayOf(PropTypes.object),
};
