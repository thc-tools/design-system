// Libs
import clsx from "clsx";
import React from "react";
import { Droppable } from "react-beautiful-dnd";

// Components
import { DraggableItem, DraggableListItem } from "./DraggableListItem";
import { List } from "./List";
import { ListItem, ListItemProps } from "./ListItem";

export interface DroppableListProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className
     */
    className?: string;
    /**
     * If has dragHandle
     */
    hasDragHandle?: boolean;
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
    ListItemComponent?: React.FunctionComponent<any> | React.ComponentClass<any> | string;
    /**
     * Items to render (must have an `id`)
     */
    items: DraggableItem[];
}

export function DroppableList({
    children,
    className,
    items,
    hasDragHandle,
    ListComponent = List,
    listItemProps,
    ListItemComponent = ListItem,
    ...otherProps
}: DroppableListProps) {
    const rootClassName = clsx("ds-c-droppable-list", className);

    return (
        <Droppable droppableId="simple-droppable-list">
            {(provided, snapshot) => (
                <ListComponent
                    {...otherProps}
                    {...provided.droppableProps}
                    className={clsx(rootClassName, {
                        "ds-c-droppable-list--dragging": snapshot.isDraggingOver,
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
