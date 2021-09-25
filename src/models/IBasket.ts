import {IDevice} from "./IDevice";

export interface IBasket {
    id?: number;
    userId: number;
    devices: IDevice[];
    createdAt: string;
    updatedAt: string;
}
