function isPhone(phone) {
     const phoneFormat = /^((?:3|0)6)(?:-|\()?(\d{1,2})(?:-|\))?(\d{3})-?(\d{3,4})/;
     return phone.match(phoneFormat) && phone.match(phoneFormat).input !== null && phone.match(phoneFormat).input.length === 11;
 }

 function PasswordVerify(password) {
     const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
     return password.match(passwordFormat);
 }

 function isEmail(email) {
    const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return email.match(emailFormat);
}

 module.exports.isPhone = isPhone;
 module.exports.isEmail = isEmail;
 module.exports.PasswordVerify = PasswordVerify;