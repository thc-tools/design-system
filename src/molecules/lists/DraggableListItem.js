// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Draggable } from "react-beautiful-dnd";

// Utils
import { alterElement } from "../../core/utils";

// Components
import { Icon } from "../icons";
import { ListItem } from "./ListItem";

export function DraggableListItem({
    children,
    className,
    hasDragHandle,
    index,
    item,
    ListItemComponent = ListItem,
    ...listItemProps
}) {
    const rootClassName = classnames("thc-c-draggable-list-item", className);

    return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided, snapshot) => (
                <ListItemComponent
                    {...provided.draggableProps}
                    {...listItemProps}
                    {...(hasDragHandle ? {} : provided.dragHandleProps)}
                    className={classnames(rootClassName, {
                        "thc-c-draggable-list-item--dragging": snapshot.isDragging,
                        "thc-c-draggable-list-item--drag-handle": hasDragHandle,
                    })}
                    ref={provided.innerRef}
                    snapshot={snapshot}
                >
                    {alterElement(children, {
                        item,
                        dragHandle: !hasDragHandle ? undefined : (
                            <div {...provided.dragHandleProps} className="thc-c-draggable-list-item__handle">
                                <Icon>dragndrop</Icon>
                            </div>
                        ),
                    })}
                </ListItemComponent>
            )}
        </Draggable>
    );
}

DraggableListItem.propTypes = {
    /**
     * ListItem render component
     */
    children: PropTypes.element.isRequired,
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * If has dragHandle
     */
    hasDragHandle: PropTypes.bool,
    /**
     * Index in list
     */
    index: PropTypes.number.isRequired,
    /**
     * Items to render (must have an `id`)
     */
    item: PropTypes.shape({ id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) }).isRequired,
    /**
     * Custom ListItem
     */
    ListItemComponent: PropTypes.elementType,
};
