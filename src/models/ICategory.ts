export interface ICategory {
    id?: number,
    name: string,
    categoryId: number | null
    innerCategories: ICategory[]
}
