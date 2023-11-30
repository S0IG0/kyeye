import {useParams} from "react-router-dom";
import $api, {HOST} from "@api/http";
import {Queue} from "@page/user/Queue.tsx";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import TokenService from "@service/TokenService.ts";
import {ResponseUser} from "@page/user/account/ChangeFields.tsx";
import {QRCodeSVG} from "qrcode.react";

export const CurrentQueue = () => {

    const {id} = useParams();
    const [queue, setQueue] = useState<Queue | undefined>(undefined)

    function fetch() {
        $api.get<Queue>(`queue/${id}`)
            .then(response => setQueue(response.data))
    }

    useEffect(() => {
        fetch()
        const interval = setInterval(() => (
            fetch()
        ), 1000)
        return () => clearInterval(interval)
    }, []);

    if (!queue) return (
        <></>
    );

    const status: { [key: number]: { className: string; text: string } } = {
        0: {
            className: "warning",
            text: "Твоя очередь"
        },
        1: {
            className: "success",
            text: "Ты следующий"
        }
    }

    // @ts-ignore
    const user_id = jwtDecode(TokenService.loadTokensFromLocalStorage().access)["user_id"];
    const isOwner = user_id === queue.owner.id;

    const usersId = queue.users.map(item => item.user.id);
    const youInQueue = usersId.includes(user_id);


    function next() {
        if (!queue) {
            return
        }

        $api.delete(`queue/user/destroy/${queue.users[0].user.id}/${queue.id}`)
            .then(() => (
                setQueue({
                    ...queue,
                    users: queue.users
                        .filter(item => item.user.id !== queue.users[0].user.id)
                })
            ))
    }


    function join() {
        if (!queue) {
            return
        }

        $api.post(`queue/user/register/`, {
            user: user_id,
            queue: queue.id
        }).then(() => (
            $api.get<ResponseUser>(`user/${user_id}`)
                .then(response => (
                    setQueue({
                        ...queue, users: [...queue.users, {
                            date_joined: "", user: {
                                id: user_id,
                                ...response.data
                            }
                        }]
                    })
                ))
        ))

    }


    return (
        <>


            <div className="modal fade"
                 id="staticBackdrop"
                 data-bs-backdrop="static"
                 data-bs-keyboard="false"
                 aria-labelledby="staticBackdropLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Qr для просмотра очереди</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <QRCodeSVG className="w-100 h-100" value={`http://${HOST}/queue/${queue.id}`}/>
                        </div>
                    </div>
                </div>
            </div>


            <h5 className="card-title d-flex  mb-2">
                <div className="me-2">
                    {queue.name}
                </div>
                <span
                    style={{maxHeight: "28px"}}
                    className="
                                me-2
                                badge
                                bg-success-subtle
                                border
                                border-success-subtle
                                text-success-emphasis
                                rounded-pill
                                "
                >
                                Создана
                            </span>
                <span
                    style={{maxHeight: "28px"}}
                    className={`
                                    badge
                                    bg-${queue.is_active ? "success" : "danger"}-subtle
                                    border-${queue.is_active ? "success" : "danger"}-subtle
                                    border
                                    text-success-emphasis
                                    rounded-pill
                                    `}
                >
                                {queue.is_active ? "Активирована" : "Не активирована"}
                            </span>
            </h5>
            <h6 className="card-subtitle text-body-secondary mb-2">
                {"Дата создания "}
                {new Date(queue.date_creation)
                    .toLocaleDateString(
                        "ru-US",
                        {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: "numeric",
                            minute: "numeric",
                        }
                    )}
            </h6>
            <h6 className="card-subtitle mb-4 text-body-secondary">
                {"Дата активации "}
                {new Date(queue.date_activation)
                    .toLocaleDateString(
                        "ru-US",
                        {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: "numeric",
                            minute: "numeric",
                        }
                    )}
            </h6>
            <div className="card mb-4">
                <h5 className="card-header">
                    Создатель
                </h5>
                <div className="card-body">
                    <h5 className="card-title">{queue.owner.username}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{queue.owner.first_name} {queue.owner.last_name}</h6>
                </div>
            </div>

            {isOwner && (
                <>
                    <div className="control-panel mb-4">
                        <h3 className="h3 ">Панель управления</h3>
                        <div role="group">
                            <button type="button" className="btn btn-success me-1" onClick={next}>
                                Следующий
                            </button>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop">
                                Показать Qr-code
                            </button>
                        </div>
                    </div>
                </>
            )}


            {!youInQueue && (
                <div className="mb-4">
                    <h4>Ты можешь присоединиться к этой очереди </h4>
                    <button className="btn btn-success" disabled={!queue.is_active} onClick={join}>
                        {queue.is_active ? "Присоединиться" : "Дождитесь активации"}
                    </button>
                </div>
            )}

            {queue.is_active && (
                <>
                    <h3 className="h3 mb-4">Очередь</h3>
                    {queue.users.map((item, index) => (
                        <div className="card mb-2" key={item.user.id}>
                            <h5 className="card-header">
                                {item.user.username}
                            </h5>
                            <div className="card-body">

                                <h6 className="card-subtitle text-body-secondary mb-2">
                                    {item.user.first_name} {item.user.last_name}
                                </h6>

                                <span
                                    style={{maxHeight: "28px"}}
                                    className={`
                                    badge
                                    bg-${index in status ? status[index].className : "primary"}-subtle
                                    border-${index in status ? status[index].className : "primary"}-subtle
                                    border
                                    text-${index in status ? status[index].className : "primary"}-emphasis
                                    rounded-pill
                                    `}
                                >
                                    {status[index] !== undefined ? status[index].text : `Перед тобой еще ${index}`}
                            </span>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </>
    );
}