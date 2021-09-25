import LoginPage from "../pages/LoginPage";
import AdminPage from "../pages/AdminPage";
import IndexPage from "../pages/IndexPage";
import {IRoute} from "./types";
import DevicesPage from "../pages/DevicesPage";
import RegisterPage from "../pages/RegisterPage";


export enum RouteNames {
    LOGIN = '/login',
    REGISTRATION = '/registration',
    ADMIN = '/admin',
    INDEX = '/shop',
    DEVICES = '/shop/devices',
    BASKET = '/shop/basket',
    PROFILE = '/profile'
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.INDEX, exact: true, component: IndexPage},
    {path: RouteNames.LOGIN, exact: true, component: LoginPage},
    {path: RouteNames.REGISTRATION, exact: true, component: RegisterPage},
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.INDEX, component: IndexPage},
    {path: RouteNames.ADMIN, component: AdminPage},
    // {path: RouteNames.DEVICES, component: DevicesPage}
]
