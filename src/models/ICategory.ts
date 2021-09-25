export interface ICategory {
    id?: number,
    name: string,
    parentCategoryId: number | null,
    parentCategory: ICategory | undefined,
    innerCategories: ICategory[]
}
