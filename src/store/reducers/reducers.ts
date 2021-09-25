import auth from './auth/authReducer'
import them from './userSettings/userSettingsReducer'
import devices from './devices/devicesReducer'
import basket from './basket/basketReducer'

const all = {
    auth,
    them,
    devices,
    basket
}
export default all
