import {ICategory} from "../models/ICategory";
import axios, {AxiosResponse} from "axios";
import {BASE_BACKEND_URL} from "../config/constants";
import {RequestBuilder} from "../functions/RequestBuilder";
import {HttpMethods} from "../hooks/useApi";
import {IBrand} from "../models/IBrand";

export default class CategoryService {
    static async getAllCategories(token: string): Promise<AxiosResponse<ICategory[]>> {
        return axios.get<ICategory[]>(BASE_BACKEND_URL + '/categories')
    }
    
    // static async getHighCategories(token: string): Promise<AxiosResponse<ICategory[]>> {
    //     return axios.get<ICategory[]>(BASE_BACKEND_URL + '/categories/high')
    // }

    static async updateCategory(categoryId: number, updateObj: Partial<ICategory>, token: string) {
        const rb = new RequestBuilder( BASE_BACKEND_URL +`/categories/${categoryId}`, HttpMethods.PATCH, updateObj)
            .includeToken(token)
        return axios(rb.build())
    }

    static async getCategory(categoryId: number, token: string): Promise<AxiosResponse<ICategory>> {
        const rb = new RequestBuilder( BASE_BACKEND_URL +`/categories/${categoryId}`, HttpMethods.GET)
            .includeToken(token)
        return axios(rb.build())
    }

    static async deleteCategory(categoryId: number, token: string)  {
        const rb = new RequestBuilder(BASE_BACKEND_URL + `/categories/${categoryId}`, HttpMethods.DELETE)
            .includeToken(token)
        return axios(rb.build())
    }
}
