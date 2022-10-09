// @ts-nocheck
const express = require('express')
const router = express.Router()
import prisma from "../lib/prisma"
const security = require('../middleware/security')

router.post('/follow/:username/:receptor', security.requireAuthenticatedUser, async (req, res) => {
    const { username, receptor } = req.params

    try {
        if (username == receptor){
            res.json({cant: "execute"})
        }
        const followerUser = await prisma.user.findUnique({
            where:{
                username: username
            }
        })

        const followedUser = await prisma.user.findUnique({
            where: {
              username: receptor
            },
        })
        const exchange = await prisma.user.update({
            where:{
                username: followerUser?.username
            },
            data:{
                following:{
                    connect : { id: followedUser.id}
                },
            },
            include:{
                followedBy: true,
                following: true,
            }
        })

        delete followedUser['password']
        if (exchange){
            res.json({ followedUser })
        }
    } catch (error) {
      console.log(error)
    }
  })


  router.post('/unfollow/:username/:receptor', security.requireAuthenticatedUser, async (req, res) => {
    const { username, receptor } = req.params
    try {
        const followerUser = await prisma.user.findUnique({
            where:{
                username: username
            }
        })
        const followedUser = await prisma.user.findUnique({
            where: {
              username: receptor
            },
        })


        delete followedUser['password']
        const exchange = await prisma.user.update({
            where:{
                username: followerUser?.username
            },
            data:{
                following:{
                    disconnect : { id: followedUser.id}
                },
            }
        })

        if (exchange){
            res.json({ successful: "exchange" })
        }
    } catch (error) {
      console.log(error)
    }
  })

module.exports = router;