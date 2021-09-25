import {AppDispatch} from "../../store";
import {
    BasketActionEnum,
    SetBasketAction,
    SetDevicesAction,
    SetErrorAction,
    SetIsLoadingAction,
    SetTotalSumAction
} from "./types";
import {IDevice} from "../../../models/IDevice";
import {BasketService} from "../../../API/BasketService";
import {IUser} from "../../../models/IUser";
import {IBasket} from "../../../models/IBasket";


export const BasketActionCreators = {
    setIsBasketLoading: (isLoading: boolean): SetIsLoadingAction => ({type: BasketActionEnum.SET_IS_LOADING, payload: isLoading}),
    setError: (error: string): SetErrorAction => ({type: BasketActionEnum.SET_ERROR, payload: error}),
    setBasketDevices: (devices: IDevice[]): SetDevicesAction => ({type: BasketActionEnum.SET_BASKET_DEVICES, payload: devices}),
    setBasket: (basket: IBasket): SetBasketAction => ({type: BasketActionEnum.SET_BASKET, payload: basket}),
    setTotalSum: (sum: number): SetTotalSumAction => ({type: BasketActionEnum.SET_TOTAL_SUM, payload: sum}),

    loadBasket: (user: IUser, token: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(BasketActionCreators.setError(""))
            dispatch(BasketActionCreators.setIsBasketLoading(true))
            const basketResponse = user?.basket ?
                await BasketService.getBasket(user?.basket?.id!) :
                await BasketService.createBasket(user?.id!)

            dispatch(BasketActionCreators.setBasket(basketResponse.data))
        } catch (e: unknown) {
            if (e instanceof Error) {
                dispatch(BasketActionCreators.setError(e.message))
            }
            // @ts-ignore
            dispatch(AuthActionCreators.setError(e.name))
        } finally {
            dispatch(BasketActionCreators.setIsBasketLoading(false))
        }
    },

    addDevice: (basketId: number, deviceId: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch(BasketActionCreators.setError(""))
            dispatch(BasketActionCreators.setIsBasketLoading(true))
            const addDeviceResp = await BasketService.addDevice(basketId, deviceId)
            dispatch(BasketActionCreators.setBasketDevices((addDeviceResp.data)))
        } catch (e: unknown) {
            if (e instanceof Error) {
                dispatch(BasketActionCreators.setError(e.message))
            }
            // @ts-ignore
            dispatch(AuthActionCreators.setError(e.name))
        } finally {
            dispatch(BasketActionCreators.setIsBasketLoading(false))
        }
    },

    removeDevice: (basketId: number, deviceId: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch(BasketActionCreators.setError(""))
            dispatch(BasketActionCreators.setIsBasketLoading(true))
            const addDeviceResp = await BasketService.removeDevice(basketId, deviceId)
            dispatch(BasketActionCreators.setBasketDevices((addDeviceResp.data)))
        } catch (e: unknown) {
            if (e instanceof Error) {
                dispatch(BasketActionCreators.setError(e.message))
            }
            // @ts-ignore
            dispatch(AuthActionCreators.setError(e.name))
        } finally {
            dispatch(BasketActionCreators.setIsBasketLoading(false))
        }
    }
}
