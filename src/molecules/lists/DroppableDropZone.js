// Libs
import React from "react";
import classnames from "classnames";
import { Droppable } from "react-beautiful-dnd";
import PropTypes from "prop-types";

export function DroppableDropZone({ children, className, droppedItemId }) {
    const rootClassName = classnames(
        "thc-o-box",
        "thc-o-flex",
        "thc-o-flex--center",
        "thc-c-droppable-drop-zone",
        className
    );

    return (
        <Droppable droppableId={droppedItemId}>
            {(provided) => {
                return (
                    <div ref={provided.innerRef} className={rootClassName}>
                        {children} {provided.placeholder}
                    </div>
                );
            }}
        </Droppable>
    );
}

DroppableDropZone.propTypes = {
    /**
     * Children to display
     */
    children: PropTypes.node,

    /**
     * Additional className
     */
    className: PropTypes.string,

    /**
     * Unique zone identifier
     */
    droppedItemId: PropTypes.string,
};
