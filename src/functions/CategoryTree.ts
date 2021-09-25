import {ICategory} from "../models/ICategory";

export type LeafCategoryMap = Map<number, ICategory[]>

export type CategoriesTree = {
    highCategories: ICategory[];
    leafCategories: LeafCategoryMap;
}

export function buildCategoriesTree(categories: ICategory[]): CategoriesTree {
    const highCategories = new Array<ICategory>();
    const leafCategories = new Map<number, ICategory[]>();
    categories.map(category => {
        if (!category.parentCategoryId) {
            highCategories.push(category)
        } else {
            leafCategories.has(category.parentCategoryId!) ? leafCategories.get(category.parentCategoryId!)!.push(category) :  leafCategories.set(category.parentCategoryId!, [category])
        }
    })

    return {
        highCategories,
        leafCategories
    }
}
