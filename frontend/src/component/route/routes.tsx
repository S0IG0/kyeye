import {ReactNode} from "react";
import {HomePage} from "@page/public/HomePage.tsx";
import {LoginPage} from "@page/public/LoginPage.tsx";
import {RegisterPage} from "@page/public/RegisterPage.tsx";
import {PersonalAccount} from "@page/user/account/PersonalAccount.tsx";
import {Queue} from "@page/user/Queue.tsx";
import {CurrentQueue} from "@page/user/CurrentQueue.tsx";

export enum Visibly {
    PUBLIC,
    PUBLIC_ONLY_NO_AUTH,
    PUBLIC_HIDDEN,
    AUTH,
    AUTH_HIDDEN,
}

export enum NamePages {
    HOME,
    LOGIN,
    REGISTER,
    PERSONAL_ACCOUNT,
    QUEUE,
    CURRENT_QUEUE,
}


export interface Page {
    name: string
    path: string
    component: ReactNode
    visibly: Visibly[]
}


export const routes: { [key in NamePages]: Page } = {
    [NamePages.HOME]: {
        name: "Главная",
        path: "/",
        component: <HomePage/>,
        visibly: [Visibly.PUBLIC],
    } as Page,
    [NamePages.LOGIN]: {
        name: "Вход",
        path: "/login",
        component: <LoginPage/>,
        visibly: [Visibly.PUBLIC_ONLY_NO_AUTH],
    } as Page,
    [NamePages.REGISTER]: {
        name: "Регистрация",
        path: "/register",
        component: <RegisterPage/>,
        visibly: [Visibly.PUBLIC_ONLY_NO_AUTH],
    } as Page,
    [NamePages.PERSONAL_ACCOUNT]: {
        name: "Личный кабинет",
        path: "/user-account",
        component: <PersonalAccount/>,
        visibly: [Visibly.AUTH],
    } as Page,
    [NamePages.QUEUE]: {
        name: "Очереди",
        path: "/queue",
        component: <Queue/>,
        visibly: [Visibly.AUTH],
    } as Page,
    [NamePages.CURRENT_QUEUE]: {
        name: "Конкретная очередь",
        path: "/queue/:id",
        component: <CurrentQueue/>,
        visibly: [Visibly.AUTH_HIDDEN],
    } as Page,
}

