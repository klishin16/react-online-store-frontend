import {AuthActionCreators} from "./auth/action-creators";
import {DeviceActionCreators} from "./devices/action-creators";
import {BasketActionCreators} from "./basket/action-creators";

export const allActionCreators = {
    ...AuthActionCreators,
    //TODO settingsActionCreators
    ...DeviceActionCreators,
    ...BasketActionCreators
}
