import axios, {AxiosResponse} from "axios";
import {IRegisterUser, IUser} from "@model/index.ts";
import $api, {API_URL} from "@api/http";
import {AuthResponse, RegisterResponse} from "@model/response/AuthResponse.ts";

export default class AuthService {
    static async login(user: IUser): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("/token/", user);
    }

    static async register(customer: IRegisterUser): Promise<AxiosResponse<RegisterResponse>> {
        return axios.post(`${API_URL}/user/register/`, customer, {withCredentials: true});
    }
}