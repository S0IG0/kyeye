import axios from "axios";
import {JwtToken} from "@/components/js/JwtToken";
import {urlBackend} from "@/components/config";

class AuthModule {
    constructor() {
        try {
            this.JwtToken = new JwtToken();
            this.onLogin = true;
        } catch (except) {
            this.JwtToken = null;
            this.onLogin = false;
        }
    }

    async logIn(email, password, errors) {
        if (this.onLogin === true) { return }
        await axios({
            method: 'post',
            url: `${urlBackend}/api/token/`,
            data: {
                'email': email,
                'password': password,
            },
        }).then(response => {
            this.JwtToken = new JwtToken(
                response.data.access,
                response.data.refresh,
            )
            this.onLogin = true;
        }).catch(error => {
            if (error.response) {
                console.log("response", error.response.status)
                console.log(error.response)
                if (errors !== undefined) {
                    if (error.response.data.detail) { errors.push(error.response.data.detail) }
                    try {
                        for (let key in error.response.data) {
                            error.response.data[key].forEach(error => {
                                errors.push(`${key}: ${error}`)
                            })
                        }
                    } catch (except) {
                        console.log(except)
                    }

                }
            } else if (error.request) {
                console.log("request", error.request)
            } else {
                console.log('else', error)
            }
        })
    }

    logOut() {
        if (this.JwtToken) {
            this.JwtToken.removeToLocalStorage();
        }
        this.onLogin = false;
        this.JwtToken = null;
    }

    async requestToBackend(
        method,
        url,
        data,
    ) {
        if (this.onLogin === false) { return ;}
        if (await this.JwtToken.checkIsActiveToken(this.JwtToken.refresh) === false) {
            this.logOut();
            return ;
        }

        if (await this.JwtToken.checkIsActiveToken(this.JwtToken.access) === false) {
            await this.JwtToken.refreshAccess();
        }


        let responseData = null;
        await axios({
            method: method,
            url: url,
            data: data,
            headers: {
                Authorization: this.JwtToken.getAuthorization(),
            }
        }).then(response => {
            responseData = response;
        }).catch(error => {
            if (error.response) {
                console.log("response", error.response.status)
            } else if (error.request) {
                console.log("request")
            } else {
                console.log('else')
            }
        })

        return responseData;
    }
}

export const Auth = new AuthModule();