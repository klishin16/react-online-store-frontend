import LoginPage from "../pages/LoginPage";
import AdminPage from "../pages/AdminPage";
import IndexPage from "../pages/IndexPage";
import {IRoute} from "./types";


export enum RouteNames {
    LOGIN = '/login',
    ADMIN = '/admin',
    INDEX = '/'
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.INDEX, exact: true, component: IndexPage},
    {path: RouteNames.LOGIN, exact: true, component: LoginPage},
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.INDEX, exact: true, component: IndexPage},
    {path: RouteNames.ADMIN, component: AdminPage}
]
