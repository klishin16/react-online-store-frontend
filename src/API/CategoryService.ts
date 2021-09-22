import {ICategory} from "../models/ICategory";
import axios, {AxiosResponse} from "axios";
import {BASE_BACKEND_URL} from "../config/constants";

export default class CategoryService {
    static async getAllCategories(token: string): Promise<AxiosResponse<ICategory[]>> {
        return axios.get<ICategory[]>(BASE_BACKEND_URL + '/categories')
    }
    
    static async getHighCategories(token: string): Promise<AxiosResponse<ICategory[]>> {
        return axios.get<ICategory[]>(BASE_BACKEND_URL + '/categories/high')
    }
}
