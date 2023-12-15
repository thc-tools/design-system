// Libs
import clsx from "clsx";
import React from "react";

// Utils
import { useResizeAware } from "../../core/hooks";
import { convertPxToNumber, getCSSVariable } from "../../core/utils";

// Components
import { Collapse, CollapseProps } from "../animations";
import { Card, CardTitle } from "../cards";
import { IconWrapper, OpenCloseIcon } from "../icons";

const cardSpacing = convertPxToNumber(getCSSVariable("--ds-card-spacing"));
const cardSpacingCondensed = convertPxToNumber(getCSSVariable("--ds-card-spacing--condensed"));

export interface AccordionProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className
     */
    className?: string;
    /**
     * Additional props for Collapse
     */
    collapseProps?: CollapseProps;
    /**
     * If Accordion is condensed
     */
    condensed?: boolean;
    /**
     * Toggle handler
     */
    onOpenToggle: (open: boolean) => void;
    /**
     * If is open
     */
    open?: boolean;
    /**
     * Title
     */
    title: React.ReactNode;
}

export function Accordion({
    children,
    className,
    collapseProps,
    condensed = false,
    onOpenToggle,
    open = false,
    title,
    ...otherProps
}: AccordionProps) {
    const rootClassName = clsx("ds-c-accordion", className);

    const [resizeListener, sizes] = useResizeAware();

    const spacing = condensed ? cardSpacingCondensed : cardSpacing;

    return (
        <Card className={rootClassName} condensed={condensed} {...otherProps}>
            <Collapse in={open} collapsedSize={(sizes?.height ?? 0) + 2 * spacing} {...collapseProps}>
                <CardTitle style={{ position: "relative" }}>
                    {resizeListener}
                    <IconWrapper
                        icon={<OpenCloseIcon open={open} />}
                        onClick={() => onOpenToggle(!open)}
                        position="right"
                    >
                        {title}
                    </IconWrapper>
                </CardTitle>
                {children}
            </Collapse>
        </Card>
    );
}
