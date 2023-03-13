function validatePassword(password, repeat_password){
    if (password !== repeat_password){
        return ["Invalid password"];
    }
    return [];
}
export default validatePassword