import {IDevice} from "./IDevice";

export interface IBrand {
    id?: number,
    name: string,
    description: string,
    devices: IDevice[]
}
