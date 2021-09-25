import {IBasket} from "../../../models/IBasket";
import {IDevice} from "../../../models/IDevice";

export interface BasketState {
    basket: IBasket | undefined;
    totalSum: number;
    isLoading: boolean;
    error: string;
}

export enum BasketActionEnum {
    SET_BASKET="SET_BASKET",
    SET_BASKET_DEVICES="SET_BASKET_DEVICES",
    ADD_DEVICE="ADD_DEVICE",
    SET_ERROR="SET_ERROR",
    SET_IS_LOADING="SET_IS_LOADING",
    SET_TOTAL_SUM="BASKET_SET_TOTAL_SUM"
}

export interface SetBasketAction {
    type: BasketActionEnum.SET_BASKET;
    payload: IBasket | undefined;
}
export interface SetDevicesAction {
    type: BasketActionEnum.SET_BASKET_DEVICES;
    payload: IDevice[];
}
export interface AddDeviceAction {
    type: BasketActionEnum.ADD_DEVICE;
    payload: IDevice;
}
export interface SetErrorAction {
    type: BasketActionEnum.SET_ERROR;
    payload: string;
}
export interface SetIsLoadingAction {
    type: BasketActionEnum.SET_IS_LOADING;
    payload: boolean;
}

export interface SetTotalSumAction {
    type: BasketActionEnum.SET_TOTAL_SUM;
    payload: number;
}

export type BasketAction =
    SetBasketAction |
    SetDevicesAction |
    AddDeviceAction |
    SetErrorAction |
    SetIsLoadingAction |
    SetTotalSumAction

