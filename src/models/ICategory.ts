export interface ICategory {
    id?: number,
    name: string,
    categoryId: string | null
    innerCategories?: ICategory[]
}
