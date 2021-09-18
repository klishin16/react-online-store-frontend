import {AuthAction, AuthActionEnum, AuthState} from "./types";

const initialState: AuthState = {
    isAuth: false,
    token: undefined,
    error: '',
    isLoading: false,
    user: null
}


export default function authReducer(state = initialState, action: AuthAction): AuthState {
    switch (action.type) {

        case AuthActionEnum.SET_AUTH:
            return {...state, isAuth: action.payload, isLoading: false}

        case AuthActionEnum.SET_USER:
            return {...state, user: action.payload}

        case AuthActionEnum.SET_ERROR:
            return {...state, error: action.payload, isLoading: false}

        case AuthActionEnum.SET_IS_LOADING:
            return {...state, isLoading: action.payload}

        case AuthActionEnum.SET_TOKEN:
            return {...state, token: action.payload}

        default:
            return state;
    }
}
