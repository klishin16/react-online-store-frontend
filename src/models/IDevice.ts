import {IBrand} from "./IBrand";
import {ICategory} from "./ICategory";

export interface IDevice {
    id?: number,
    name: string,
    price: number;
    sale: number | null;
    availability: number;
    brandId: number;
    brand: IBrand | undefined;
    categories: ICategory[]
    image: string | null;
}
