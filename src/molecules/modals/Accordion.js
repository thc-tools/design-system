// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { useResizeAware } from "../../core/hooks";
import { convertPxToNumber, getCSSVariable } from "../../core/utils";

// Components
import { Collapse } from "../animations";
import { Card, CardTitle } from "../cards";
import { IconWrapper, OpenCloseIcon, ICON_POSITION } from "../icons";

const cardSpacing = convertPxToNumber(getCSSVariable("--thc-card-spacing"));
const cardSpacingCondensed = convertPxToNumber(getCSSVariable("--thc-card-spacing--condensed"));

export function Accordion({
    children,
    className,
    collapseProps,
    condensed = false,
    onOpenToggle,
    open = false,
    title,
    ...otherProps
}) {
    const rootClassName = classnames("thc-c-accordion", className);

    const [resizeListener, sizes] = useResizeAware();

    const spacing = condensed ? cardSpacingCondensed : cardSpacing;

    return (
        <Card className={rootClassName} condensed={condensed} {...otherProps}>
            <Collapse in={open} collapsedSize={sizes.height + 2 * spacing} {...collapseProps}>
                <CardTitle style={{ position: "relative" }}>
                    {resizeListener}
                    <IconWrapper
                        icon={<OpenCloseIcon open={open} />}
                        onClick={() => onOpenToggle(!open)}
                        position={ICON_POSITION.RIGHT}
                    >
                        {title}
                    </IconWrapper>
                </CardTitle>
                {children}
            </Collapse>
        </Card>
    );
}

Accordion.propTypes = {
    /**
     * Children to display
     */
    children: PropTypes.node,
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * Additional props for Collapse
     */
    collapseProps: PropTypes.shape(Collapse.propTypes),
    /**
     * If Accordion is condensed
     */
    condensed: PropTypes.bool,
    /**
     * Toggle handler
     */
    onOpenToggle: PropTypes.func,
    /**
     * If is open
     */
    open: PropTypes.bool,
    /**
     * Title
     */
    title: PropTypes.node,
};
