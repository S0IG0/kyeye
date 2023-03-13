function validatePassword(password, repeat_password){
    if (password !== repeat_password){
        console.log(password)
        console.log(repeat_password)
        return ["Invalid password"];
    }
    return [];
}
export default validatePassword