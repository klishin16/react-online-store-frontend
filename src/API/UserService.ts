import axios, {AxiosResponse} from "axios";
import {IBasket} from "../models/IBasket";
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
}
