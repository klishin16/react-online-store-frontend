import useRequest from "./useRequest";
import axios from "axios";
import {userTypedSelector} from "./userTypedSelector";
import {RequestBuilder} from "../functions/RequestBuilder";


export enum HttpMethods {
    GET = "get",
    POST = "post",
    PATCH = "patch",
    DELETE = "delete"
}

export function useGetApi<ResponseData> (url: string, isNeedAuth = true, execute = true): [ResponseData | null, boolean, string, Function] {
    const { token } = userTypedSelector(state => state.auth)
    const requestBuilder = new RequestBuilder(url).includeToken(token!)

    const [data, loading, error, execution] = useRequest<ResponseData>(() => axios(requestBuilder.build()), execute)

    return [data, loading, error, execution]
}

export function usePOSTApi<ReqData, ResponseData> (url: string, isNeedAuth = true, reqData: ReqData): [ResponseData | null, boolean, string, Function] {
    const requestBuilder = new RequestBuilder(url)
        .setMethod(HttpMethods.POST)
        .includeToken(userTypedSelector(state => state.auth).token!)
        .addData(reqData)

    return useRequest<ResponseData>(() => axios(requestBuilder.build()))
}

// export function usePATCHApi<RequestData, ResponseData> (url: string, isNeedAuth = true): [ResponseData | null, boolean, string, Function] {
//     const requestBuilder = new RequestBuilder(url)
//         .setMethod(HttpMethods.PATCH)
//         .includeToken(userTypedSelector(state => state.auth).token!)
//         .addData(reqData)
//
//     const [data, loading, error, e] = useExtendedRequest<RequestData, ResponseData>()
//     //() => axios(requestBuilder.build())
//     return [data, loading, error, execution
// }

export function useDELETEApi<ResponseData> (url: string, isNeedAuth = true, isExecute = true): [ResponseData | null, boolean, string, Function] {
    const requestBuilder = new RequestBuilder(url)
        .setMethod(HttpMethods.DELETE)
        .includeToken(userTypedSelector(state => state.auth).token!)

    return useRequest<ResponseData>(() => axios(requestBuilder.build()), isExecute)
}
