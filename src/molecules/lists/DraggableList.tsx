// Libs
import React, { useCallback } from "react";
import {
    DragDropContext,
    DropResult,
    OnDragEndResponder,
    OnDragStartResponder,
    OnDragUpdateResponder,
    ResponderProvided,
} from "react-beautiful-dnd";

// Components
import { DroppableList } from "./DroppableList";
import { ListItemProps } from "./ListItem";
import { DraggableItem } from "./DraggableListItem";

export interface DraggableListProps extends React.PropsWithChildren<{}> {
    /**
     * Additional className
     */
    className?: string;
    /**
     * If has dragHandle
     */
    hasDragHandle?: boolean;
    /**
     * Items to display
     */
    items: DraggableItem[];
    /**
     * Custom ListComponent
     */
    ListComponent?: React.FunctionComponent<any> | React.ComponentClass<any> | string;
    /**
     * Additional props for ListItem
     */
    listItemProps?: ListItemProps;
    /**
     * Custom ListItem
     */
    ListItemComponent: React.FunctionComponent<any> | React.ComponentClass<any> | string;
    /**
     * Drag end event
     */
    onDragEnd: OnDragEndResponder;
    /**
     * Drag start event
     */
    onDragStart?: OnDragStartResponder;
    /**
     * Drag update event
     */
    onDragUpdate?: OnDragUpdateResponder;
    /**
     *
     * @param items
     * @returns
     */
    onReorder: (items: DraggableItem[]) => void;
}

export function DraggableList({
    children,
    className,
    items,
    onDragEnd,
    onDragStart,
    onDragUpdate,
    onReorder,
    hasDragHandle = false,
    ListComponent,
    listItemProps,
    ListItemComponent,
    ...otherProps
}: DraggableListProps) {
    const handleDragEnd = useCallback(
        (result: DropResult, provided: ResponderProvided) => {
            if (onDragEnd) {
                onDragEnd(result, provided);
                return;
            }

            if (!onReorder) {
                return;
            }

            const newItems = Array.from(items);
            const [removed] = newItems.splice(result.source.index, 1);
            newItems.splice(result.destination?.index ?? 0, 0, removed);

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
