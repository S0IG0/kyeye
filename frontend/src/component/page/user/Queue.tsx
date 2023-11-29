import $api, {HOST} from "@api/http";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {QRCodeSVG} from 'qrcode.react';
import {CreateQueue} from "@page/user/CreateQueue.tsx";


interface User {
    email: string,
    first_name: string
    id: number
    last_name: string
    username: string
}

export interface Queue {
    date_activation: string,
    date_creation: string,
    id: number
    is_active: boolean
    name: string
    owner: User
    users: { date_joined: string, user: User }[]
}


export const Queue = () => {
    const [queues, setQueues] = useState<Queue[]>([])

    function fetch() {
        $api.get<Queue[]>("queue/").then(response => setQueues(response.data))
    }

    useEffect(() => {
        fetch()
        const interval = setInterval(() => (
            fetch()
        ), 1000);
        return () => clearInterval(interval)
    }, []);


    return (
        <>

            <div>
                <button type="button" className="btn btn-primary mb-4" data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop">
                    Создать новую очередь
                </button>

                <div className="modal fade"
                     id="staticBackdrop"
                     data-bs-backdrop="static"
                     data-bs-keyboard="false"
                     aria-labelledby="staticBackdropLabel"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Создание новой очереди</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <CreateQueue/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {queues.map(queue => (
                <div className="card mb-2" key={queue.id}>
                    <div className="card-body">
                        <div className="d-flex justify-content-between flex-xl-row flex-md-row flex-column">
                            <div className="mb-2">
                                <h5 className="card-title d-flex">
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
                                            text-${queue.is_active ? "success" : "danger"}-emphasis
                                            rounded-pill
                                            `}
                                    >
                                {queue.is_active ? "Активирована" : "Не активирована"}
                            </span>
                                </h5>
                                <h6 className="card-subtitle mb-2 text-body-secondary">
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
                                <Link to={`/queue/${queue.id}`} className="btn btn-primary">Подробнее</Link>
                            </div>
                            <div className="d-flex justify-content-end">
                                <QRCodeSVG value={`http://${HOST}/queue/${queue.id}`}/>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}