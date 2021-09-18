import {useHttp, useHttpWithErrorHandle} from "./useHttp";
import {userTypedSelector} from "./userTypedSelector";
import {useState} from "react";
import {HttpMethods} from "./useApi";

export function useData<Data>(url: string): [Data, boolean] {
    const { token} = userTypedSelector(state => state.auth)
    const {loading, request} = useHttp()
    const [data, setData] = useState<Data>()
    request(url, HttpMethods.GET, {}, {
        Authorization: `Bearer ${token}`
    }).then((data: Data) => {
        setData(data)
    })

    return [data!, loading]
}
