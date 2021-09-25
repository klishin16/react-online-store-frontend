import {IDevice} from "../../../models/IDevice";
import {ICategory} from "../../../models/ICategory";

export interface DevicesState {
    q: string | undefined;
    category: ICategory | undefined;
    brands: string[] | null;
    devices: IDevice[];
    minPrice: number | undefined;
    maxPrice: number | undefined;
    isLoading: boolean;
    error: string;
}

export enum DevicesActionEnum {
    SET_SEARCH_QUERY="DEVICES_SET_SEARCH_QUERY",
    SET_CATEGORY="DEVICES_SET_CATEGORY",
    SET_BRANDS="DEVICES_SET_BRANDS",
    SET_DEVICES="DEVICES_SET_DEVICES",
    SET_MIN_PRICE="DEVICES_SET_MIN_PRICE",
    SET_MAX_PRICE="DEVICES_SET_MAX_PRICE",
    SET_ERROR="DEVICES_SET_ERROR",
    SET_IS_LOADING="DEVICES_SET_IS_LOADING"
}

export interface SetSearchQueryAction {
    type: DevicesActionEnum.SET_SEARCH_QUERY;
    payload: string | undefined;
}
export interface SetCategoryAction {
    type: DevicesActionEnum.SET_CATEGORY;
    payload: ICategory | undefined;
}
export interface SetBrandsAction {
    type: DevicesActionEnum.SET_BRANDS;
    payload: string[] | null;
}
export interface SetDevicesAction {
    type: DevicesActionEnum.SET_DEVICES;
    payload: IDevice[];
}
export interface SetMinPriceAction {
    type: DevicesActionEnum.SET_MIN_PRICE;
    payload: number | undefined;
}
export interface SetMaxPriceAction {
    type: DevicesActionEnum.SET_MAX_PRICE;
    payload: number | undefined;
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
    SetMinPriceAction |
    SetMaxPriceAction |
    SetErrorAction |
    SetIsLoadingAction

