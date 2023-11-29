import {useState} from "react";
import $api from "@api/http";
import {Spinner} from "@ux/loader/Spinner.tsx";

export const CreateQueue = () => {
    const currentDate = new Date();
    const [name, setName] = useState("")
    const [dateActivation, setDateActivation] = useState<string>(
        currentDate.toLocaleDateString('en-CA', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        })
    )
    const [timeActivate, setTimeActivate] = useState(
        `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`
    )

    const [loading, setLoading] = useState(false)

    function createQueue() {
        setLoading(true);
        $api.post("queue/register/", {
            name: name,
            date_activation: `${dateActivation} ${timeActivate}`
        }).then(() => {
            setName("")
            setDateActivation(
                currentDate.toLocaleDateString('en-CA', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                })
            )
            setTimeActivate(`${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`)
        }).finally(() => setLoading(false))
    }


    return (
        <div>
            <div className="form-floating mb-3">
                <input type="email"
                       className="form-control rounded-3"
                       id="floatingInput"
                       placeholder="name@example.com"
                       value={name}
                       onChange={event => setName(event.target.value)}
                />
                <label htmlFor="floatingInput">Название очереди</label>
            </div>
            <input
                type="date"
                className="form-control rounded-3 mb-3"
                value={dateActivation}
                onChange={event => setDateActivation(event.target.value)}
            />
            <input
                type="time"
                className="form-control rounded-3 mb-3"
                value={timeActivate}
                onChange={event => setTimeActivate(event.target.value)}
            />
            <button className="btn btn-success" onClick={createQueue}>
                {loading ? <Spinner/> : "Создать очередь"}
            </button>
        </div>
    );
}