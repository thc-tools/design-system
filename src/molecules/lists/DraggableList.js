// Libs
import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";

// Components
import { DroppableList } from "./DroppableList";

export function DraggableList({
    children,
    className,
    items,
    onDragEnd,
    onDragStart,
    onDragUpdate,
    onReorder,
    DragDropContextProp,
    hasDragHandle = false,
    ListComponent,
    listItemProps,
    ListItemComponent,
    ...otherProps
}) {

    const handleDragEnd = useCallback(
        (result) => {
            if (onDragEnd) {
                onDragEnd(result);
                return;
            }

            if (!onReorder) {
                return;
            }

            const newItems = Array.from(items);
            const [removed] = newItems.splice(result.source.index, 1);
            newItems.splice(result.destination.index, 0, removed);

            onReorder(newItems);
        },
        [onDragEnd, onReorder, items]
    );

    return (
        <DragDropContext onDragEnd={handleDragEnd} onDragStart={onDragStart} onDragUpdate={onDragUpdate}>
            <DroppableList
                items={items}
                hasDragHandle={hasDragHandle}
                ListComponent={ListComponent}
                listItemProps={listItemProps}
                ListItemComponent={ListItemComponent}
                {...otherProps}
            >
                {children}
            </DroppableList>    
        </DragDropContext>
    );
}

DraggableList.propTypes = {
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
};
