import {Link} from "react-router-dom";
import {NamePages, routes} from "@route/routes.tsx";
import {store} from "@store/store.ts";
import {observer} from "mobx-react-lite";

export const HomePage = observer(() => {
    return (
        <>
            <div className="p-5 mb-4 border  rounded-3">
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">KYEYE</h1>
                    <p className="col-md-8 fs-4">KYEYE — ваш надежный информационный портал, который предоставляет
                        инновационные решения для упрощения процесса отслеживания текущей позиции в очереди. Наш сервис
                        разработан с учетом потребностей пользователей, предлагая эффективные инструменты для создания
                        организованных очередей.</p>
                </div>
                <Link
                    to={routes[NamePages.REGISTER].path}
                    className={`btn btn-${store.isAuth ? "success" : "primary"} btn-lg ${store.isAuth && "disabled"}`}
                    type="button"
                    style={{opacity: 1}}
                >
                    {store.isAuth ? "Спасибо, что вы с нами!" : "Зарегистрируйтесь и присоединяйся к нам!"}
                </Link>
            </div>
            <div className="row align-items-md-stretch">
                <div className="col-md-6 mb-4">
                    <div className="h-100 p-5 text-white bg-dark rounded-3">
                        <h2>Простота</h2>
                        <p> Значительно улучшает опыт управления очередями, делая этот процесс более простым и
                            эффективным. С помощью нашего портала вы сможете легко отслеживать свою позицию в очереди в
                            режиме реального времени, что позволит существенно сэкономить ваше время и уменьшить
                            ожидание.</p>

                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="h-100 p-5 border rounded-3">
                        <h2>Организованность</h2>
                        <p>Создание очереди становится организованным процессом благодаря интуитивно понятному
                            интерфейсу «KYEYE». Вы сможете легко управлять и настраивать параметры очереди, а
                            пользователи будут получать актуальную информацию о своем положении в ней.</p>

                    </div>
                </div>
            </div>
        </>
    );
});
