export type PartialRecord<K extends keyof any, T> = {
    [P in K]?: T;
};

export type ChangeFields<T, R> = Omit<T, keyof R> & R;

export type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
