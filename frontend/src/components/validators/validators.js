export function validatePassword(password, repeat_password) {
    let errors = []
    if (password !== repeat_password) {
        errors.push("Invalid password");
    }
    if (!String(password).match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)) {
        errors.push("The password is too simple");
    }
    if (password === '') {
        errors.push("Password is require");
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
        errors.push("Invalid email");
    }
    return errors;
}

export function validateName(type, name) {
    let errors = []
    if (name === '') {
        errors.push(`${type} name is require`);
    }
    return errors;
}