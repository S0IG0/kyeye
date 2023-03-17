import axios from "axios";
import {specialWord, urlBackend} from "@/components/config";

export class JwtToken {
    constructor(access, refresh) {
        if (access === undefined || refresh === undefined) {
            this.loadToLocalStorage();
        } else {
            this.access = access;
            this.refresh = refresh;
            this.saveToLocalStorage();
        }
    }

    loadToLocalStorage() {
        const data = JSON.parse(localStorage.getItem('JwtToken'));
        this.access = data.access;
        this.refresh = data.refresh;
    }

    saveToLocalStorage() {
        localStorage.setItem('JwtToken', JSON.stringify(this));
    }

    removeToLocalStorage() {
        localStorage.removeItem('JwtToken');
    }

    async checkIsActiveToken(token) {
        let is_active = false;
        await axios({
            method: "post",
            url: `${urlBackend}/api/token/verify/`,
            data: {
                'token': token,
            },
        }).then(() => {
            is_active = true;
        }).catch(error => {
            console.log('checkIsActiveToken', error)
        })

        return is_active;
    }


    async refreshAccess() {
        await axios({
            method: 'post',
            url: `${urlBackend}/api/token/refresh/`,
            data: {
                'refresh': this.refresh,
            }
        }).then(response => {
            this.access = response.data.access;
            this.saveToLocalStorage();
        }).catch(error => {
            console.log('refreshAccess.catch', error)
        })
    }

    decodeAccess() {
        try {
            return JSON.parse(atob(this.access.split('.')[1]));
        } catch (exception) {
            return null;
        }
    }

    getAuthorization() {
        return `${specialWord} ${this.access}`
    }
}