exports.PasswordVerify = (password) => {
    const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    return password.match(passwordFormat);
}

exports.isEmail = (email) => {
    const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return email.match(emailFormat);
}

exports.isName = (name) =>{
    const nameFormat = /^[a-z ,.'-]+$/i;
    return name.match(nameFormat);
}