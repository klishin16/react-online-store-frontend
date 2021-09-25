import axios, {AxiosResponse} from "axios";
import {RequestBuilder} from "../functions/RequestBuilder";
import {BASE_BACKEND_URL} from "../config/constants";
import {HttpMethods} from "../hooks/useApi";
import {IUser} from "../models/IUser";

export class UserService {
    static async getUser(userId: number, token: string): Promise<AxiosResponse<IUser>> {
        const rb = new RequestBuilder( BASE_BACKEND_URL +`/users/${userId}`, HttpMethods.GET)
            .includeToken(token)
        return axios(rb.build())
    }

    static async updateUser(userId: number, updateObj: Partial<IUser>, token: string) {
        const rb = new RequestBuilder( BASE_BACKEND_URL +`/users/${userId}`, HttpMethods.PATCH, updateObj)
            .includeToken(token)
        return axios(rb.build())
    }

    static async getAllUsers(token: string): Promise<AxiosResponse<IUser[]>> {
        const rb = new RequestBuilder(BASE_BACKEND_URL + '/users', HttpMethods.GET)
            .includeToken(token)
        return axios(rb.build())
    }

    static async createUser(email: string, password: string): Promise<AxiosResponse<IUser>> {
        const rb = new RequestBuilder(BASE_BACKEND_URL + '/users', HttpMethods.POST, {email, password})
        return axios(rb.build())
    }

    static async deleteUser(userId: number, token: string)  {
        const rb = new RequestBuilder(BASE_BACKEND_URL + `/users/${userId}`, HttpMethods.DELETE)
            .includeToken(token)
        return axios(rb.build())
    }
}
