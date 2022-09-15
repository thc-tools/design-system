export type PartialRecord<K extends keyof any, T> = {
    [P in K]?: T;
};

export type ChangeFields<T, R> = Omit<T, keyof R> & R;

export type RDivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export type RTableCellProps = React.DetailedHTMLProps<
    React.TdHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
>;
export type RTableProps = React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>;
