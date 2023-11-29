import {useState} from "react";
import {IRegisterUser} from "@model/index.ts";
import {store} from "@store/store.ts";
import {Spinner} from "@ux/loader/Spinner.tsx";
import {useNavigate} from "react-router-dom";
import {NamePages, routes} from "@route/routes.tsx";

interface RegisterUser extends IRegisterUser {
    repeat_password: string
}

export interface Error {
    first_name: string[] | undefined,
    last_name: string[] | undefined,
    username: string[] | undefined,
    email: string[] | undefined,
    password: string[] | undefined,
}

export const RegisterPage = () => {

    const [error, setError] = useState<Error>({
        first_name: [],
        last_name: [],
        username: [],
        email: [],
        password: [],
    });

    const [user, setUser] = useState<RegisterUser>({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        repeat_password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [request, setRequest] = useState(false);
    const navigate = useNavigate();

    function register() {
        setIsLoading(true);
        store.register(user)
            .then(() => navigate(routes[NamePages.PERSONAL_ACCOUNT].path))
            .catch(reason => {
                const obj: Error = {} as Error
                for (const key in reason.response.data as Error) {
                    // @ts-ignore
                    obj[key] = [...new Set(reason.response.data[key])]
                }
                setError(obj)
            })
            .finally(() => {
                setIsLoading(false);
                setRequest(true);
            });
    }

    return (
        <div className="modal-dialog mb-4" role="document" style={{maxWidth: "450px"}}>
            <div className="modal-content rounded-4 shadow">
                <div className="modal-header p-5 pb-4 border-bottom-0">
                    <h1 className="fw-bold mb-0 fs-2">Регистрация для пользователей</h1>
                </div>

                <div className="modal-body p-5 pt-0">
                    <div className="form-floating mb-3">
                        <input type="email"
                               className={`form-control rounded-3 ${request && (error.email?.length === 0 || error.email === undefined ? "is-valid" : "is-invalid")}`}
                               id="floatingInput"
                               placeholder="name@example.com"
                               value={user.email}
                               onChange={event => setUser({...user, email: event.target.value})}
                        />
                        {error.email?.length === 0 || error.email === undefined || user.email === "" ?
                            <label htmlFor="floatingInput">Почта</label> :
                            <label htmlFor="floatingInput">
                                {error.email.map(error => error)}
                            </label>
                        }

                    </div>
                    <div className="form-floating mb-3">
                        <input type="text"
                               className={`form-control rounded-3 ${request && (error.username?.length === 0 || error.username === undefined ? "is-valid" : "is-invalid")}`}
                               id="floatingInputUsername"
                               placeholder="name@example.com"
                               value={user.username}
                               onChange={event => setUser({...user, username: event.target.value})}
                        />
                        {error.username?.length === 0 || error.username === undefined || user.username === "" ?
                            <label htmlFor="floatingInputUsername">Никнейм</label> :
                            <label htmlFor="floatingInputUsername">
                                {error.username.map(error => error)}
                            </label>
                        }
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text"
                               className={`form-control rounded-3 ${request && (error.first_name?.length === 0 || error.first_name === undefined ? "is-valid" : "is-invalid")}`}
                               id="floatingInputFirstName"
                               placeholder="name@example.com"
                               value={user.first_name}
                               onChange={event => setUser({...user, first_name: event.target.value})}
                        />
                        {error.first_name?.length === 0 || error.first_name === undefined || user.first_name === "" ?
                            <label htmlFor="floatingInputFirstName">Имя</label> :
                            <label htmlFor="floatingInputFirstName">
                                {error.first_name.map(error => error)}
                            </label>
                        }
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text"
                               className={`form-control rounded-3 ${request && (error.last_name?.length === 0 || error.last_name === undefined ? "is-valid" : "is-invalid")}`}
                               id="floatingInputLastName"
                               placeholder="name@example.com"
                               value={user.last_name}
                               onChange={event => setUser({...user, last_name: event.target.value})}
                        />
                        {error.last_name?.length === 0 || error.last_name === undefined || user.last_name === "" ?
                            <label htmlFor="floatingInputLastName">Фамилия</label> :
                            <label htmlFor="floatingInputLastName">
                                {error.last_name.map(error => error)}
                            </label>
                        }
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password"
                               className={`form-control rounded-3 ${request && (error.password?.length === 0 || error.password === undefined ? "is-valid" : "is-invalid")}`}
                               id="floatingPassword"
                               placeholder="Password"
                               value={user.password}
                               onChange={event => setUser({...user, password: event.target.value})}
                        />
                        {error.password?.length === 0 || error.password === undefined || user.password === "" ?
                            <label htmlFor="floatingPassword">Пароль</label> :
                            <label htmlFor="floatingPassword">
                                {error.password.map(error => error)}
                            </label>
                        }
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password"
                               className="form-control rounded-3"
                               id="floatingPasswordRepeat"
                               placeholder="Password"
                               value={user.repeat_password}
                               onChange={event => setUser({...user, repeat_password: event.target.value})}
                        />
                        <label htmlFor="floatingPasswordRepeat">Повторите пароль</label>
                    </div>
                    <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                            type="submit"
                            onClick={register}
                    >
                        {isLoading ? <Spinner/> : "Зарегестрироваться"}
                    </button>
                    <small className="text-body-secondary">Нажав кнопку заргестрироваться, вы соглашаетесь с условиями
                        использования.</small>
                </div>
            </div>
        </div>
    );
}