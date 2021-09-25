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
import {makeRequest} from "../../../functions/http";
import {RouteNames} from "../../../routes/routerPaths";
import {HttpMethods} from "../../../hooks/useApi";
import {UserService} from "../../../API/UserService";
import {message} from "antd";


const storageName = 'userData'

export const AuthActionCreators = {
    setUser: (user: IUser | null): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setIsAuth: (isAuth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: isAuth}),
    setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({
        type: AuthActionEnum.SET_IS_LOADING,
        payload: isLoading
    }),
    setError: (error: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload: error}),
    setToken: (token: string | undefined): SetTokenAction => ({type: AuthActionEnum.SET_TOKEN, payload: token}),
    login: (loginDto: LoginDTO, remember: boolean, next?: RouteNames) => async (dispatch: AppDispatch) => {
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
                dispatch(AuthActionCreators.setUser(data.user))
                dispatch(AuthActionCreators.setIsAuth(true))

                if (remember) {
                    localStorage.setItem(storageName, JSON.stringify({
                        token: data.token,
                        userId: data.user.id
                    }))
                }

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

    authenticate: () => async (dispatch: AppDispatch) => { //если в localstorage есть токен
        //TODO проверка просрочки токена

        const authData = localStorage.getItem(storageName)
        if (authData) {
            const {token, userId} = JSON.parse(authData)
            UserService.getUser(userId, token)
                .then((resp) => {
                    dispatch(AuthActionCreators.setUser(resp.data))
                    dispatch(AuthActionCreators.setIsAuth(true))
                })
                .catch((e) => message.error(e.name))
        }
    },

    logout: () => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsAuth(false))
            // dispatch((AuthActionCreators.setUser(null)))
            localStorage.removeItem(storageName)
        } catch (e) {
            console.log(e)
        }
    }
}
