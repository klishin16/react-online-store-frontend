import axios, {AxiosResponse} from "axios";
import {BASE_BACKEND_URL} from "../config/constants";
import {IDevice} from "../models/IDevice";
import {ParamsBuilder} from "../functions/ParamsBuilder";
import {RequestBuilder} from "../functions/RequestBuilder";
import {HttpMethods} from "../hooks/useApi";

export class DeviceService {
    static async getAllDevices(searchQuery?: string, categoryId?: number, minPrice?: number, maxPrice?: number) {
        const pb = new ParamsBuilder()
        if (searchQuery) pb.addParam('q', searchQuery)
        if (categoryId) pb.addParam('categoryId', categoryId.toString())
        if (minPrice) pb.addParam('minPrice', minPrice)
        if (maxPrice) pb.addParam('maxPrice', maxPrice)
        return axios.get<IDevice[]>(BASE_BACKEND_URL + '/devices', {
            params: pb.build()
        })
    }

    static async getDevice(deviceId: number, token: string): Promise<AxiosResponse<IDevice>> {
        const rb = new RequestBuilder( BASE_BACKEND_URL +`/devices/${deviceId}`, HttpMethods.GET)
            .includeToken(token)
        return axios(rb.build())
    }

    static async updateDevice(deviceId: number, updateObj: Partial<IDevice>, token: string): Promise<AxiosResponse<IDevice>> {
        const rb = new RequestBuilder( BASE_BACKEND_URL +`/devices/${deviceId}`, HttpMethods.PATCH, updateObj)
            .includeToken(token)
        return axios(rb.build())
    }

    static async deleteDevice(deviceId: number, token: string)  {
        const rb = new RequestBuilder(BASE_BACKEND_URL + `/devices/${deviceId}`, HttpMethods.DELETE)
            .includeToken(token)
        return axios(rb.build())
    }
}
