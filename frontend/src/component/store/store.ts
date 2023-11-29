import {makeAutoObservable} from "mobx";
import axios from "axios";
import {IAccess, IRegisterUser, IUser} from "@model/index.ts";
import AuthService from "@service/AuthService.ts";
import TokenService from "@service/TokenService.ts";
import {API_URL} from "@api/http";

interface Entity {
    id: number,
}

class Store {
    constructor() {
        makeAutoObservable(this);
    }

    isAuth = false;

    setAuth(isAuth: boolean) {
        this.isAuth = isAuth;
    }

    removeEntityById(array: Entity[], id: number): void {
        const indexToRemove = array.findIndex(department => department.id === id);

        if (indexToRemove !== -1) {
            array.splice(indexToRemove, 1);
        }
    }

    setEntityById(array: Entity[], id: number, entity: Entity): void {
        const index = array.findIndex(department => department.id === id);

        if (index !== -1) {
            array[index] = entity;
        }
    }

    getEntityById(array: Entity[], id: number) {
        const index = array.findIndex(department => department.id === id);
        if (index !== -1) {
            return array[index];
        }
    }

    async login(user: IUser) {
        try {
            const response = await AuthService.login(user);
            TokenService.saveTokensToLocalStorage(response.data)
            this.setAuth(true);
        } catch (exception) {
            throw exception;
        }
    }

    async register(user: IRegisterUser) {
        try {
            await AuthService.register(user);
            await this.login({email: user.email, password: user.password});
        } catch (exception) {
            throw exception;
        }
    }


    async checkAuth() {
        try {
            const response = await axios.post<IAccess>(
                `${API_URL}/token/refresh/`,
                {
                    refresh: TokenService.loadTokensFromLocalStorage().refresh,
                },
                {
                    withCredentials: true,
                }
            );
            TokenService.saveAccessTokenToLocalStorage(response.data.access);
            this.setAuth(true);
        } catch (exception) {
        }
    }

    logout() {
        TokenService.cleatTokensFromLocalStorage();
        this.setAuth(false);
    }
}


export const store = new Store();