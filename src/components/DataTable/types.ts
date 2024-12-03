import { ColumnDef } from "@tanstack/react-table";


// Extend ColumnDef to have a show/hide property
export type ExtendedColumnDef<TData, TValue> = ColumnDef<TData, TValue> & {
    id: string;
    show: boolean;
    label: string;
};
