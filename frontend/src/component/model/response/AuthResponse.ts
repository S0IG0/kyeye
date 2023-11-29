import {IRegisterCustomer, IRegisterUser, Jwt} from "../index.ts";

export interface AuthResponse extends Jwt {

}

export interface UserRegisterResponse extends IRegisterUser{
    id: number,
    is_active: boolean,
}

export interface RegisterResponse extends IRegisterCustomer {
    user: UserRegisterResponse,
}