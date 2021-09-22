export interface IDevice {
    id?: number,
    name: string,
    price: number;
    sale: number | null;
    availability: number;
    brandId: number;
    image: string | null;
}
