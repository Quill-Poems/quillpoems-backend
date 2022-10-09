require('dotenv').config();
require('colors')

const PORT = process.env.PORT ? Number(process.env.PORT) : 4001;
const DATABASEURL = process.env.DATABASE_URL
const NODENV = process.env.NODE_ENV 
const SECRET_KEY = process.env.SECRET_KEY
const BCRYPT_WORK_FACTOR = 10;

console.log(`running config for ==> ${NODENV}`.yellow);
console.log("Port:".blue, PORT);
console.log("DATABASE URL".blue, DATABASEURL)
console.log("----------------")

module.exports = {
    PORT,
    NODENV,
    SECRET_KEY,
    BCRYPT_WORK_FACTOR
}