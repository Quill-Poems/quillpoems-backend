// @ts-nocheck
const express = require('express')
const router = express.Router()
import { title } from "process"
import prisma from "../lib/prisma"
const security = require('../middleware/security')

router.get('/', async (req, res) => {
    try {
      const posts = await prisma.post.findMany({
        include: {
            comments: true,
            likedBy: true,
        }
      })
      res.json(posts)
    } catch (error) {
      console.log(error)
    }
  })

router.get('/:author', async (req, res) => {
    const author  = req.params.author
    try { 
     const posts = await prisma.post.findMany({
        where: {
            authorUsername: author,
        },
        include:{
            comments: true,
            likedBy: true,
        }
     })
     res.json(posts)
    } catch (error) {
        console.log(error)
    }
})

router.get('/:author/:id', async(req, res) => {
    const id = req.params.id
    try {
        const authoredPost = await prisma.post.findUnique({
            where: {
                id: id,
            },
            include: {
                comments: true,
                likedBy: true,
            }
        })
        res.json(authoredPost)
    } catch (error) {
        console.log(error)
    }
})


router.delete('/:author/:id', security.requireAuthenticatedUser, async(req, res) => {
    const author = req.params.author
    const id = req.params.id
    try {
        const deletedPost = await prisma.post.delete({
            where: {
                id: id,
            }
        })
        res.json(deletedPost)
    } catch (error) {
        console.log(error)
    }
})

router.post('/:author', security.requireAuthenticatedUser, async (req,res) => {
    const author = req.params.author
    const { data } = req.body
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: author
            }
        })

        const createdPost = await prisma.post.create({
            data: {
                author: {
                    connect: { id: user.id },
                  },
                content: data.content,
                title: data.title
            }
        })
        res.json(createdPost)
    } catch (error){
        console.log(error)
    }
})

router.post('/like/:username/:postid', security.requireAuthenticatedUser, async (req,res) => {
    const { postid, username } = req.params
    try{
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })
        delete user['password'];
        const interactedPost = await prisma.post.update({
            where: {
                id: postid
            }, 
            data: {
                likedBy: {
                    connect: { id: user.id }
                }
            },
            include:{
                likedBy: true,
            }
        })
        
        res.json(interactedPost)
    } catch (error)
    {console.log(error)}
})

router.post('/unlike/:username/:postid', security.requireAuthenticatedUser, async (req,res) => {
    const { postid, username } = req.params
    try{
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })
        delete user['password'];
        const interactedPost = await prisma.post.update({
            where: {
                id: postid
            }, 
            data: {
                likedBy: {
                    disconnect: { id: user.id }
                }
            },
            include:{
                likedBy: true,
            }
        })
        
        res.json(interactedPost)
    } catch (error)
    {console.log(error)}
})


router.post('/favorite/:username/:postid', security.requireAuthenticatedUser, async (req,res) => {
    const { postid, username } = req.params
    try{
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })
        delete user['password'];
        const interactedPost = await prisma.post.update({
            where: {
                id: postid
            }, 
            data: {
                favoritedBy: {
                    connect: { id: user.id }
                }
            },
            include:{
                favoritedBy: true,
            }
        })
        
        res.json(interactedPost)
    } catch (error)
    {console.log(error)}
})

router.post('/unfavorite/:username/:postid', security.requireAuthenticatedUser, async (req,res) => {
    const { postid, username } = req.params
    try{
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })
        delete user['password'];
        const interactedPost = await prisma.post.update({
            where: {
                id: postid
            }, 
            data: {
                favoritedBy: {
                    disconnect: { id: user.id }
                }
            },
            include:{
                favoritedBy: true,
            }
        })
        
        res.json(interactedPost)
    } catch (error)
    {console.log(error)}
})


module.exports = router;