// @ts-nocheck
const express = require('express')
const router = express.Router()
import prisma from "../lib/prisma"
const { excludePassword } = require('../utils/users')

router.get('/', async (req, res) => {
    try {
      const users = await prisma.user.findMany()
      for (const user in users){
        excludePassword(users[user], 'password')
        // delete users[user].password
      }
      res.json(users)
    } catch (error) {
      console.log(error)
    }
  })

router.get('/:username', async (req, res) => {
  const { username } = req.params
  try {
      const user = await prisma.user.findUnique({
        where: {
          username: username
        },
        include: {
          writtenPosts: true,
          writtenComments: true,
          likedPosts: true,
          favoritedPosts: true,
          followedBy: true,
          following: true,
        }
      })
      delete user['password']
      res.json(user)
    } catch (error) {
      console.log(error)
    }
  })

router.post('/:username', async (req, res) => {
  const { username } = req.params
  const { bio } = req.body
  try {
    const updatedBio = await prisma.user.update({
      where:{
        username: username
      },
      data:{
        bio: bio,
      }
    })
    
    res.json(updatedBio)
  } catch (error){
    console.log(error)
  }
})


module.exports = router;