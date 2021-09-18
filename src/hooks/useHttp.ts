// import {useCallback, useState} from "react";
// import axios from "axios";
// import {BASE_BACKEND_URL} from "../config/constants";
//
import {BASE_BACKEND_URL} from "../config/constants";
import axios from "axios";
import {useCallback, useState} from "react";
import {message} from "antd";
import {HttpMethods} from "./useApi";


// export type useHttpResp = {
//     request: Function,
//     loading: boolean,
//     error: string
// }

//
export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")


    const request = useCallback(async function <Body>(url: string, method: HttpMethods, body?: Body, headers = {}) {
        try {

            const response = await axios({
                method,
                url: BASE_BACKEND_URL + url,
                data: body,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    ...headers
                }
            })
            if ((response.status < 200) || (response.status >= 300)) {
                setError(response.data.message || "Что-то пошло не так")
                console.log("here2")
                throw Error(response.data.message || "Что-то пошло не так")
            }

            setLoading(false)
            return response.data

        } catch (e: unknown) {

            console.log("here3")
            // @ts-ignore
            setError(e.name)
        }
    }, [])
    return {loading, error, request}
}

export const useHttpWithErrorHandle = () => {
    const {error, ...rest} = useHttp()

    if (error.length > 0) message.warn(error)
    return {...rest}
}

