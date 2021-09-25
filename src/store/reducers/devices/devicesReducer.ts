import {DevicesAction, DevicesActionEnum, DevicesState} from "./types";


const initialState: DevicesState = {
    q: undefined,
    category: undefined,
    brands: null,
    devices: [],
    minPrice: undefined,
    maxPrice: undefined,
    isLoading: false,
    error: ""
}


export default function devicesReducer(state = initialState, action: DevicesAction): DevicesState {
    switch (action.type) {

        case DevicesActionEnum.SET_SEARCH_QUERY:
            return {...state, q: action.payload}

        case DevicesActionEnum.SET_CATEGORY:
            return {...state, category: action.payload}

        case DevicesActionEnum.SET_BRANDS:
            return {...state, brands: action.payload}
        case DevicesActionEnum.SET_DEVICES:
            return {...state, devices: action.payload}

        case DevicesActionEnum.SET_MIN_PRICE:
            return {...state, minPrice: action.payload}

        case DevicesActionEnum.SET_MAX_PRICE:
            return {...state, maxPrice: action.payload}

        case DevicesActionEnum.SET_ERROR:
            return {...state, error: action.payload, isLoading: false}

        case DevicesActionEnum.SET_IS_LOADING:
            return {...state, isLoading: action.payload}

        default:
            return state;
    }
}
