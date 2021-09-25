import axios from "axios";
import {BASE_BACKEND_URL} from "../config/constants";
import {IBrand} from "../models/IBrand";
import {RequestBuilder} from "../functions/RequestBuilder";
import {HttpMethods} from "../hooks/useApi";

export class BrandService {
    static async getAllBrands() {
        return axios.get<IBrand[]>(BASE_BACKEND_URL + '/brands')
    }

    static async updateBrand(brandId: number, updateObj: Partial<IBrand>, token: string) {
        const rb = new RequestBuilder( BASE_BACKEND_URL +`/brands/${brandId}`, HttpMethods.PATCH, updateObj)
            .includeToken(token)
        return axios(rb.build())
    }

    static async deleteBrand(brandId: number, token: string)  {
        const rb = new RequestBuilder(BASE_BACKEND_URL + `/brands/${brandId}`, HttpMethods.DELETE)
            .includeToken(token)
        return axios(rb.build())
    }
}
