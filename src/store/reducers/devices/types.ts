import {IUser} from "../../../models/IUser";
import {IDevice} from "../../../models/IDevice";

export interface DevicesState {
    q: string | undefined;
    categoryId: number | undefined;
    brands: string[] | null;
    devices: IDevice[];
    isLoading: boolean;
    error: string;
}

export enum DevicesActionEnum {
    SET_SEARCH_QUERY="SET_SEARCH_QUERY",
    SET_CATEGORY="SET_CATEGORY",
    SET_BRANDS="SET_BRANDS",
    SET_DEVICES="SET_DEVICES",
    SET_ERROR="SET_ERROR",
    SET_IS_LOADING="SET_IS_LOADING"
}

export interface SetSearchQueryAction {
    type: DevicesActionEnum.SET_SEARCH_QUERY;
    payload: string | undefined;
}
export interface SetCategoryAction {
    type: DevicesActionEnum.SET_CATEGORY;
    payload: number | undefined;
}
export interface SetBrandsAction {
    type: DevicesActionEnum.SET_BRANDS;
    payload: string[] | null;
}
export interface SetDevicesAction {
    type: DevicesActionEnum.SET_DEVICES;
    payload: IDevice[];
}
export interface SetErrorAction {
    type: DevicesActionEnum.SET_ERROR;
    payload: string;
}
export interface SetIsLoadingAction {
    type: DevicesActionEnum.SET_IS_LOADING;
    payload: boolean;
}



export type DevicesAction =
    SetSearchQueryAction |
    SetCategoryAction |
    SetBrandsAction |
    SetDevicesAction |
    SetErrorAction |
    SetIsLoadingAction

