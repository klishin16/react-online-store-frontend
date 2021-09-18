import {IUser} from "../../../models/IUser";

export interface AuthState {
    isAuth: boolean;
    token: string | undefined;
    user: IUser | null;
    isLoading: boolean;
    error: string;
}

export enum AuthActionEnum {
    SET_AUTH="SET_AUTH",
    SET_TOKEN="SET_TOKEN",
    SET_USER="SET_USER",
    SET_ERROR="SET_ERROR",
    SET_IS_LOADING="SET_IS_LOADING"
}

export interface SetAuthAction {
    type: AuthActionEnum.SET_AUTH;
    payload: boolean;
}
export interface SetErrorAction {
    type: AuthActionEnum.SET_ERROR;
    payload: string;
}
export interface SetUserAction {
    type: AuthActionEnum.SET_USER;
    payload: IUser | null;
}
export interface SetIsLoadingAction {
    type: AuthActionEnum.SET_IS_LOADING;
    payload: boolean;
}
export interface SetTokenAction {
    type: AuthActionEnum.SET_TOKEN;
    payload: string | undefined;
}


export type AuthAction =
    SetAuthAction |
    SetErrorAction |
    SetUserAction |
    SetIsLoadingAction |
    SetTokenAction
