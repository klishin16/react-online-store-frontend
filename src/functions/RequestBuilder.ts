import {BASE_BACKEND_URL} from "../config/constants";
import {userTypedSelector} from "../hooks/userTypedSelector";
import {AxiosRequestConfig} from "axios";
import {HttpMethods} from "../hooks/useApi";

export class RequestBuilder<RequestData> {
    private readonly url: string;
    private _method: HttpMethods;
    private readonly _baseUrl: string;
    private _headers: Object;
    private _data: RequestData | null = null;

    constructor(url: string, method?: HttpMethods, data?: RequestData | null, headers?: Object) {
        this.url = url;
        this._baseUrl = BASE_BACKEND_URL;
        this._method = method ? method : HttpMethods.GET;
        this._headers = headers ? headers : {
            'Content-Type': 'application/json;charset=utf-8',
        };
        this._data = data ? data : null;
    }

    addData(data: RequestData | null) {
        this._data = data;
        return this;
    }

    addHeader(header: Object) {
        this._headers = {...this._headers, ...header};
        return this;
    }

    includeToken(token: string) {
        return this.addHeader({
            'Authorization': `Bearer ${token}`
        })
    }

    setMethod(method: HttpMethods) {
        this._method = method;
        return this;
    }

    build(): AxiosRequestConfig {
        return {
            baseURL: this._baseUrl,
            method: this._method,
            url: this.url,
            data: this._data,
            headers: this._headers,
        }
    }
}
