import {AppDispatch, RootState} from "../../store";
import {
    DevicesActionEnum,
    SetCategoryAction,
    SetDevicesAction,
    SetErrorAction,
    SetIsLoadingAction, SetMaxPriceAction,
    SetMinPriceAction,
    SetSearchQueryAction
} from "./types";
import {IDevice} from "../../../models/IDevice";
import {DeviceService} from "../../../API/DeviceService";
import {ICategory} from "../../../models/ICategory";
import {dispatch} from "jest-circus/build/state";

const setIsDevicesLoading = (isLoading: boolean): SetIsLoadingAction => ({
    type: DevicesActionEnum.SET_IS_LOADING,
    payload: isLoading
})
const setError = (error: string): SetErrorAction => ({type: DevicesActionEnum.SET_ERROR, payload: error})
const setDevices = (devices: IDevice[]): SetDevicesAction => ({type: DevicesActionEnum.SET_DEVICES, payload: devices})
const setQuery = (query: string | undefined): SetSearchQueryAction => ({
    type: DevicesActionEnum.SET_SEARCH_QUERY,
    payload: query
})
const setCategory = (category: ICategory | undefined): SetCategoryAction => ({
    type: DevicesActionEnum.SET_CATEGORY,
    payload: category
})
const setMinPrice = (minPrice: number | undefined): SetMinPriceAction => ({
    type: DevicesActionEnum.SET_MIN_PRICE,
    payload: minPrice
})
const setMaxPrice = (maxPrice: number | undefined): SetMaxPriceAction => ({
    type: DevicesActionEnum.SET_MAX_PRICE,
    payload: maxPrice
})
const setPriceRange = (minPrice?: number, maxPrice?: number) => async (dispatch: AppDispatch) => {
    dispatch(setMinPrice(minPrice))
    dispatch(setMaxPrice(maxPrice))
}

const loadDevices = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
        dispatch(setError(""))
        dispatch(setIsDevicesLoading(true))
        const devicesResponse = await DeviceService.getAllDevices(getState().devices.q, getState().devices.category?.id, getState().devices.minPrice, getState().devices.minPrice)
        dispatch(setDevices(devicesResponse.data))
    } catch (e: unknown) {
        if (e instanceof Error) {
            dispatch(setError(e.message))
        }
        // @ts-ignore
        dispatch(setError(e.toString()))
    } finally {
        dispatch(setIsDevicesLoading(false))
    }
}

export const DeviceActionCreators = {
    setDevices,
    loadDevices,
    setCategory,
    setQuery,
    setPriceRange,
}
