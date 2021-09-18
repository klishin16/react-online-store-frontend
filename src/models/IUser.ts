import {IRole} from "./IRole";
import {IBasket} from "./IBasket";

export interface IUser {
    email: string;
    password: string
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface LoginResponseDTO {
    token: string;
}

export interface IUserFull {
    id?: number,
    email: string,
    password: string,
    banned: boolean,
    banReason: string,
    roles: IRole[],
    favoriteDevices: Object[],
    basket?: IBasket
}
