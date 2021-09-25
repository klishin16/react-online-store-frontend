import {AxiosResponse} from "axios";
import {useState} from "react";

export default <RequestData, ResponseData>(): [ResponseData | undefined, boolean, string | null, (request: () => Promise<AxiosResponse<ResponseData>>, successCallback?: Function) => void] => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ResponseData | undefined>(undefined)
    const [error, setError] = useState("")

    const requestWrapper = <RequestData>(request: () => Promise<AxiosResponse<ResponseData>>, successCallback?: Function): void => {
        setLoading(true)
        setTimeout(() => {
            request()
                .then(response => {
                    setData(response.data)
                    if (successCallback) successCallback()
                })
                .catch(error => setError(error))
                .finally(() => setLoading(false))
        }, 500)
    }

    return [data, loading, error, requestWrapper]
}
