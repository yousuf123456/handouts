import { CategoriesType } from "../types";

export const getCategoryTree = (categories : CategoriesType, parentId : string | null) : any => {
    if (!categories) return [[]]

    const children = categories.filter((category) => category.parentId === parentId);
    return children.map((child) => ({
        name: child.name,
        id: child.id,
        children: getCategoryTree(categories, child.id),
    }));
};