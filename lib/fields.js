const registerFields = [
    'email', 'password', 'firstName', 'lastName', 'birthday', 'username'
]

const loginFields = [
    'email', 'password',
]

const emailRegex = /[^@]+@[^@]+\.[^@]+/;

module.exports = {
    loginFields,
    registerFields,
    emailRegex
}