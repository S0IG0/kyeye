import {jwtDecode} from "jwt-decode";
import TokenService from "@service/TokenService.ts";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Error} from "@page/public/RegisterPage.tsx";
import $api from "@api/http";
import {store} from "@store/store.ts";
import {NamePages, routes} from "@route/routes.tsx";
import {DjangoAdmin} from "@page/admin/DjangoAdmin.tsx";

export interface ResponseUser {
    first_name: string,
    last_name: string,
    username: string,
    email: string,
}

export const ChangeFields = () => {
    // @ts-ignore
    const user_id = jwtDecode(TokenService.loadTokensFromLocalStorage().access)["user_id"];
    const navigate = useNavigate();
    const [change, setChange] = useState(false);
    const [password, setPassword] = useState("")

    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
    })

    const [newUser, setNewUser] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
    })

    const names: ResponseUser = {
        first_name: "Имя",
        last_name: "Фамилия",
        username: "Никнейм",
        email: "Почта",
    }

    const [error, setError] = useState<Error>({
        first_name: [],
        last_name: [],
        username: [],
        email: [],
        password: [],
    });

    const fields: (keyof ResponseUser)[] = Object.keys(names) as (keyof ResponseUser)[];

    useEffect(() => {
        $api.get<ResponseUser>(`user/${user_id}`)
            .then(response => {
                setUser(response.data)
                setNewUser(response.data)
            })
    }, []);

    function logout() {
        store.logout()
        navigate(routes[NamePages.HOME].path);
    }

    function changeData() {

        if (change) {
            $api.patch(`user/update/${user_id}`, password === "" ?
                {
                    ...newUser,
                } :
                {
                    ...newUser,
                    password: password
                }
            )
                .then(() => {
                    setPassword("")
                    $api.get<ResponseUser>(`user/${user_id}`)
                        .then(response => {
                            setUser(response.data)
                            setError({
                                first_name: [],
                                last_name: [],
                                username: [],
                                email: [],
                                password: [],
                            })
                        })
                })
                .catch(reason => {
                    const obj: Error = {} as Error
                    for (const key in reason.response.data as Error) {
                        // @ts-ignore
                        obj[key] = [...new Set(reason.response.data[key])]
                    }
                    setError(obj)
                })
        }

        setChange(!change)
    }


    return (
        <>
            <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
                <div className='h3'>Здравствуйте, {user.username}</div>
                <button className="btn btn-danger" onClick={logout}>
                    Выход
                </button>
            </div>
            <h3 className='h3'>Ваши данные</h3>

            {fields.map(key => (
                <div className="modal-body pt-0" key={key}>
                    <div className="form-floating mb-3">
                        <input
                            disabled={!change}
                            id={`floating${key}`}
                            className={`form-control rounded-3 ${error[key]?.length === 0 || error[key] === undefined ? "" : "is-invalid"}`}
                            type={["email", "password"].includes(key) ? key : "text"}
                            value={newUser[key]}
                            onChange={event => setNewUser({...newUser, [key]: event.target.value})}
                        />
                        {error[key]?.length === 0 || error[key] === undefined || newUser[key] === "" ?
                            <label htmlFor={`floating${key}`}>{names[key]}</label> :
                            <label htmlFor={`floating${key}`}>
                                {error[key]?.map(error => error)}
                            </label>
                        }

                    </div>
                </div>
            ))}
            <div className="modal-body pt-0">
                <div className="form-floating mb-3">
                    <input
                        disabled={!change}
                        id="floatingPassword"
                        className="form-control rounded-3"
                        type="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                    <label
                        htmlFor="floatingPassword"
                    >
                        Пароль
                    </label>
                </div>
            </div>

            <button onClick={changeData} className="btn btn-success mb-2">{change ? "Сохранить" : "Изменить"}</button>

            {user.email === "admin@mail.ru" && (
                <>
                    <h3 className='h3'>Панель администратора из django</h3>
                    <DjangoAdmin/>
                </>
            )}
        </>
    );
}