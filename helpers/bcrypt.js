const bcrypt = require('bcrypt');

const hashPassword = (text) => {
    return bcrypt.hashSync(text, 10)
}

const comparePassword = (text, hashedPassword) => {
    return bcrypt.compareSync(text, hashedPassword)
}

module.exports = {
    hashPassword,
    comparePassword
}