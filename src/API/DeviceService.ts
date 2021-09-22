import axios from "axios";
import {BASE_BACKEND_URL} from "../config/constants";
import {IDevice} from "../models/IDevice";
import {ParamsBuilder} from "../functions/ParamsBuilder";

export class DeviceService {
    static async getAllDevices(searchQuery?: string, categoryId?: number) {
        const pb = new ParamsBuilder()
        if (searchQuery) pb.addParam('q', searchQuery)
        if (categoryId) pb.addParam('categoryId', categoryId.toString())
        return axios.get<IDevice[]>(BASE_BACKEND_URL + '/devices', {
            params: pb.build()
        })
    }
}
