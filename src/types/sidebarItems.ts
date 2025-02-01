import { ReactNode } from "react";

export type TAcc = {
    path: string;
    element: ReactNode;
};
export type TRoute = {
    name: string;
    path?: string;
    element?: ReactNode;
    children?: TRoute[];
};
export type TSidebarItem = {
    key: string;
    label: ReactNode;
    children?: TSidebarItem[];
} | undefined;