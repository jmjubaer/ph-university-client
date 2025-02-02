import { NavLink } from "react-router-dom";
import { TRoute, TSidebarItem } from "../types";
import { nanoid } from "@reduxjs/toolkit";

const sidebarItemsGenerator = (items: TRoute[], role: string) => {
    const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
        if (item.path && item.element) {
            acc.push({
                key: item?.name || nanoid(),
                label: (
                    <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>
                ),
            });
        }
        if (item.children) {
            acc.push({
                key: item?.name || nanoid(),
                label: item.name,
                children: item.children.reduce<TSidebarItem[]>(
                    (childAcc, child) => {
                        if (child.name) {
                            childAcc.push({
                                key: child.name,
                                label: (
                                    <NavLink to={`/${role}/${child.path}`}>
                                        {child.name}
                                    </NavLink>
                                ),
                            });
                        }
                        return childAcc;
                    },
                    []
                ),
            });
        }
        return acc;
    }, []);
    return sidebarItems;
};

export default sidebarItemsGenerator;
