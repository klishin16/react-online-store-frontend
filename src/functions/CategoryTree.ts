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
        if (!category.categoryId) {
            highCategories.push(category)
        } else {
            leafCategories.has(category.categoryId) ? leafCategories.get(category.categoryId)!.push(category) :  leafCategories.set(category.categoryId, [category])
        }
    })

    return {
        highCategories,
        leafCategories
    }
}
