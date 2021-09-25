import axios from "axios";
import {BASE_BACKEND_URL} from "../config/constants";
import {HttpMethods} from "../hooks/useApi";


export async function makeRequest<Body, Res>(url: string, method: HttpMethods, body: Body, headers = {}): Promise<Res> {
    return await axios({
        method,
        url: BASE_BACKEND_URL + url,
        data: body,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            ...headers
        }
    }).then((response => {
        if ((response.status < 200) || response.status >= 300) {
            throw Error(response.data.message || "Что-то пошло не так")
        }

        return response.data
    }))

}
