import {IUser, LoginDTO, LoginResponseDTO} from "../../../models/IUser";
import {
    AuthActionEnum,
    SetAuthAction,
    SetErrorAction,
    SetIsLoadingAction,
    SetTokenAction,
    SetUserAction
} from "./types";
import {AppDispatch} from "../../store";
import {makeRequest} from "../../../hooks/http";
import {RouteNames} from "../../../routes/routerPaths";
import {HttpMethods} from "../../../hooks/useApi";


export const AuthActionCreators = {
    setUser: (user: IUser | null): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setIsAuth: (isAuth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: isAuth}),
    setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload: isLoading}),
    setError: (error: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload: error}),
    setToken: (token: string | undefined): SetTokenAction => ({type: AuthActionEnum.SET_TOKEN, payload: token}),
    login: (loginDto: LoginDTO, next?: RouteNames) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setError(""))
            dispatch(AuthActionCreators.setIsLoading(true))

            const data = await makeRequest<LoginDTO, LoginResponseDTO>('/auth/login', HttpMethods.POST,
                {
                    email: loginDto.email,
                    password: loginDto.password
                })
            dispatch(AuthActionCreators.setIsLoading(false))
            if (data) {
                console.log(data)
                dispatch(AuthActionCreators.setToken(data.token))
                dispatch(AuthActionCreators.setIsAuth(true))
                if (next) {
                    //TODO redirect
                }
            } else {
                throw Error("Что-то пошло не так снова")
            }

        } catch (e: unknown) {
            if (e instanceof Error) {
                dispatch(AuthActionCreators.setError(e.message))
            }
            // @ts-ignore
            dispatch(AuthActionCreators.setError(e.name))
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsAuth(false))
            dispatch((AuthActionCreators.setUser(null)))
        } catch (e) {
            console.log(e)
        }
    }
}
