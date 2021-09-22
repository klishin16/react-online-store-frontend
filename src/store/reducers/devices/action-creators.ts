import {AppDispatch, RootState, store} from "../../store";
import {
    DevicesActionEnum,
    SetCategoryAction,
    SetDevicesAction,
    SetErrorAction,
    SetIsLoadingAction,
    SetSearchQueryAction
} from "./types";
import {IDevice} from "../../../models/IDevice";
import {DeviceService} from "../../../API/DeviceService";


export const DeviceActionCreators = {
    setIsDevicesLoading: (isLoading: boolean): SetIsLoadingAction => ({type: DevicesActionEnum.SET_IS_LOADING, payload: isLoading}),
    setError: (error: string): SetErrorAction => ({type: DevicesActionEnum.SET_ERROR, payload: error}),
    setDevices: (devices: IDevice[]): SetDevicesAction => ({type: DevicesActionEnum.SET_DEVICES, payload: devices}),
    setQuery: (query: string | undefined): SetSearchQueryAction => ({type: DevicesActionEnum.SET_SEARCH_QUERY, payload: query}),
    setCategoryId: (categoryId: number | undefined): SetCategoryAction => ({type: DevicesActionEnum.SET_CATEGORY, payload: categoryId}),

    // setSearchQuery: (query: string | undefined) => async (dispatch: AppDispatch) => {
    //     dispatch(DeviceActionCreators.setQuery(query))
    // },

    loadDevices: () => async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            dispatch(DeviceActionCreators.setError(""))
            dispatch(DeviceActionCreators.setIsDevicesLoading(true))
            const devicesResponse = await DeviceService.getAllDevices(getState().devices.q, getState().devices.categoryId)
            dispatch(DeviceActionCreators.setDevices(devicesResponse.data))
        } catch (e: unknown) {
            if (e instanceof Error) {
                dispatch(DeviceActionCreators.setError(e.message))
            }
            // @ts-ignore
            dispatch(AuthActionCreators.setError(e.name))
        } finally {
            dispatch(DeviceActionCreators.setIsDevicesLoading(false))
        }
    }
}
