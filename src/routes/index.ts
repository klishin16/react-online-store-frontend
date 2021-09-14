import React from "react";
import LoginPage from "../pages/LoginPage";
import AdminPage from "../pages/AdminPage";


export interface IRoute {
    path: string,
    component: React.ComponentType,
    exact?: boolean
}

export enum RouteNames {
    LOGIN = '/login',
    ADMIN = '/admin'
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, exact: true, component: LoginPage},
    {path: RouteNames.ADMIN, exact: true, component: AdminPage}
]

export const privateRoutes: IRoute[] = [

]
