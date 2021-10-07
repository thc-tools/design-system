// Libs
import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";

// Components
import { DraggableListItem } from "./DraggableListItem";
import { List } from "./List";
import { ListItem } from "./ListItem";

export function DroppableList({
    children,
    className,
    items,
    hasDragHandle,
    ListComponent = List,
    listItemProps,
    ListItemComponent = ListItem,
    ...otherProps
}) {
    const rootClassName = classnames("thc-c-droppable-list", className);

    return (
        <Droppable droppableId="simple-droppable-list">
            {(provided, snapshot) => (
                <ListComponent
                    {...otherProps}
                    {...provided.droppableProps}
                    className={classnames(rootClassName, {
                        "thc-c-droppable-list--dragging": snapshot.isDraggingOver,
                    })}
                    ref={provided.innerRef}
                    snapshot={snapshot}
                >
                    {items.map((item, index) => (
                        <DraggableListItem
                            {...listItemProps}
                            hasDragHandle={hasDragHandle}
                            item={item}
                            index={index}
                            key={item.id}
                            ListItemComponent={ListItemComponent}
                        >
                            {children}
                        </DraggableListItem>
                    ))}
                    {provided.placeholder}
                </ListComponent>
            )}
        </Droppable>
    );
}

DroppableList.propTypes = {
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
     * Custom ListComponent
     */
    ListComponent: PropTypes.elementType,
    /**
     * Additional props for ListItem
     */
    // eslint-disable-next-line react/forbid-prop-types
    listItemProps: PropTypes.object,
    /**
     * Custom ListItem
     */
    ListItemComponent: PropTypes.elementType,
    /**
     * Items to render (must have an `id`)
     */
    items: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) }))
        .isRequired,
};
