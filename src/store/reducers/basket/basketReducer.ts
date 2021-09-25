import {BasketAction, BasketActionEnum, BasketState} from "./types";


const initialState: BasketState = {
    basket: undefined,
    totalSum: 0,
    isLoading: false,
    error: ""
}


export default function basketReducer(state = initialState, action: BasketAction): BasketState {
    switch (action.type) {
        case BasketActionEnum.SET_BASKET:
            return {...state, basket: action.payload}

        case BasketActionEnum.SET_BASKET_DEVICES:
            return {...state, basket: {
                ...state.basket!,
                    devices: action.payload
                }}

        case BasketActionEnum.ADD_DEVICE:
            return {...state, basket: {
                    ...state.basket!,
                    devices: state.basket ? [...state.basket.devices, action.payload] : [action.payload]
                }}

        case BasketActionEnum.SET_ERROR:
            return {...state, error: action.payload, isLoading: false}

        case BasketActionEnum.SET_IS_LOADING:
            return {...state, isLoading: action.payload}

        case BasketActionEnum.SET_TOTAL_SUM:
            return {...state, totalSum: action.payload}

        default:
            return state;
    }
}
