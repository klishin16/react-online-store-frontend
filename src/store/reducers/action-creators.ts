import {AuthActionCreators} from "./auth/action-creators";
import {DeviceActionCreators} from "./devices/action-creators";

export const allActionCreators = {
    ...AuthActionCreators,
    //TODO settingsActionCreators
    ...DeviceActionCreators
}
