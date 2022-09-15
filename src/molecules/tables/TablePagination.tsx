// Libs
import clsx from "clsx";
import React from "react";
import { DESIGN_SYSTEM_TABLES_TK, DESIGN_SYSTEM_TRANSLATION_NAMESPACE, useTranslation } from "src/design-system/core";
import { ButtonIcon } from "src/design-system/molecules/buttons";
import { PillTabs, Tab } from "src/design-system/molecules/navigation";

// Components

export interface TablePaginationProps {
    /**
     * Additional className
     */
    className?: string;
    /**
     * Total number of items
     */
    count?: number;
    /**
     * Number of items per page
     */
    limit?: number;
    /**
     * Options to change limit
     */
    limitOptions?: number[];
    /**
     * Handler to change limit
     */
    onLimitChange: (limit: number) => void | Promise<void>;
    /**
     * Handler to changer page
     */
    onPageChange: (page: number) => void | Promise<void>;
    /**
     * Current page number
     */
    page?: number;
    /**
     * Top placement
     */
    top?: number;
}

export const TablePagination = React.forwardRef<HTMLDivElement, TablePaginationProps>(function TablePagination(
    { className: classNameProp, count = 0, limit = 0, limitOptions = [], onLimitChange, onPageChange, page = 0, top },
    ref
) {
    const { t } = useTranslation(`${DESIGN_SYSTEM_TRANSLATION_NAMESPACE}:${DESIGN_SYSTEM_TABLES_TK}.table-pagination`);
    const className = clsx("ds-c-table-pagination ", classNameProp);

    const from = page * limit;
    const to = Math.min(from + limit, count);

    const pageMin = 0;
    const pageMax = Math.ceil(count / limit) - 1;

    return (
        <div className={className} style={{ top, bottom: top !== undefined ? undefined : 0 }} ref={ref}>
            {limitOptions.length > 0 && (
                <div className="ds-c-table-pagination__limit">
                    <span className="ds-u-typography--body">{t("rows-per-page")}</span>
                    <PillTabs
                        currentValue={limit}
                        onChange={(opt: number) => {
                            onLimitChange(opt);
                            if (page !== pageMin) {
                                onPageChange(pageMin);
                            }
                        }}
                    >
                        {limitOptions.map((opt) => (
                            <Tab key={opt} value={opt}>
                                {opt}
                            </Tab>
                        ))}
                    </PillTabs>
                </div>
            )}
            <div className="ds-u-typography--body">{t("pagination-info", { from, to, count })}</div>
            <div>
                <ButtonIcon
                    className="ds-c-table-pagination__pagination-button"
                    disabled={page === pageMin}
                    onClick={() => onPageChange(Math.max(page - 1, 0))}
                    variant="ghost"
                >
                    chevron-left
                </ButtonIcon>
                <ButtonIcon
                    className="ds-c-table-pagination__pagination-button"
                    disabled={page === pageMax || pageMax === -1}
                    onClick={() => onPageChange(Math.min(page + 1, pageMax))}
                    variant="ghost"
                >
                    chevron-right
                </ButtonIcon>
            </div>
        </div>
    );
});
