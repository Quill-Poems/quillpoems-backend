// @ts-nocheck
const express = require('express')
const router = express.Router()
import { title } from "process"
import prisma from "../lib/prisma"
const { createUser } = require('../utils/tokens')
const security = require('../middleware/security')
const { loginFields, registerFields, emailRegex } = require('../lib/fields')
const { BadRequestError, UnauthorizedError } = require('../utils/errors')
const bcrypt = require('bcrypt')
const { BCRYPT_WORK_FACTOR } = require('../config')

router.post('/register', async (req, res, next) => {
    
    function validateEmaiL(email) {
        return String(email).toLowerCase().match(emailRegex)
    }

    try {

        const { userData } = req.body
        
        // Validating if provided required information.
        registerFields.forEach((property) => {
            if (!userData.hasOwnProperty(property)){
                throw new BadRequestError(`Missing ${property} in request body`)
            }
        })

        // Validating user email.
        if (!validateEmaiL(userData.email)){
            throw new BadRequestError("Invalid email")
        }

        // Finding user in the database with a matching email provided
        const existingUser = await prisma.user.findUnique({
            where: {
                email: userData.email
            }
        })

        // Check existingUser const is populated means user already exists => Throw error .
        if (existingUser){
            throw new BadRequestError(
                `A user already exists with the email ${userData.email}`
            )
        }

        // Hashing password with BCRYPT
        const hashedPassword = await bcrypt.hash(
            userData.password,
            BCRYPT_WORK_FACTOR
        )

        // Formatting fields 
        const formattedEmail = userData.email.toLowerCase()
        const formattedBirthday = new Date(userData.birthday.toString());
        
        // Creating new user with fields.
        const newUser = await prisma.user.create({
            data: {
                firstName: userData.firstName,
                lastName: userData.lastName,
                username: userData.username,
                email: formattedEmail,
                password: hashedPassword,
                birthday: formattedBirthday,
                isAdmin: false
            }
        })

        // Generating token, storing res.locals, deleting password from object to be returned
        const token = createUser(newUser)
        res.locals.token = token
        res.locals.user = newUser
        delete newUser['password'];

        res.status(201).json({ newUser, token}) 
    } catch (error) {
        next(error)
    }
})

router.post('/login', async (req, res, next) => {
    try {
        const { userData } = req.body

        // Validating if provided required information.
        loginFields.forEach((property) => {
            if (!userData.hasOwnProperty(property)){
                throw new BadRequestError(`Missing ${property} in request body`)
            }
        })

        // Checking if user exists .
        const existingUser = await prisma.user.findUnique({
            where: {
                email: userData.email
            }
        })

        // If user doesnt exist -> error else continue user validation
        if (!existingUser){
            throw new BadRequestError(`Could not find user matching the credentials provided.`)
        } else {
            //Checking if password provided matches password stored.
            const validPassword = await bcrypt.compare(
                userData.password,
                existingUser.password
            )
            // Storing locals, and returning user object with token.
            if (validPassword){
                delete existingUser['password'];
                const token = createUser(existingUser)
                res.locals.token = token
                res.locals.user = existingUser
                res.status(201).json({ existingUser, token})

            } else {
                throw new BadRequestError(`Could not find user matching the credentials provided.`)
            }
        }

    } catch (error){
        next(error)
    }
})

router.get('/me', security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const user = res.locals.user

        const existingUser = await prisma.user.findUnique({
            where: {
                email: user.email
            }
        })
        delete existingUser['password'];
        res.locals.user = existingUser
        res.status(200).json({ existingUser })
    } catch (err){
        next(err)
    }
})

module.exports = router;