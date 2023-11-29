export interface IUser {
    email: string,
    password: string,
}

export interface IAccess {
    access: string,
}

export interface Jwt extends IAccess{
    refresh: string,
}

export interface IRegisterUser extends IUser{
    first_name: string,
    last_name: string,
    username: string,
    email: string,
}

export interface IRegisterCustomer {
    user: IRegisterUser,
    bank_account: string,
}