export function validatePassword(password, repeat_password) {
    let errors = []
    if (password !== repeat_password) {
        errors.push("Пароли не совпадают");
    }
    // if (!String(password).match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)) {
    //     errors.push("Пароль слишком простой");
    // }
    if (password === '') {
        errors.push("Заполните пароль");
    }

    return errors;
}

export function validateEmail(email) {
    let errors = []
    if (!String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
        errors.push("Неправильно указан e-mail");
    }
    return errors;
}

export function validateName(type, name) {
    let errors = []
    if (name === '') {
        errors.push(`Укажите ${type}`);
    }
    return errors;
}