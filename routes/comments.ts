// @ts-nocheck
const express = require('express')
const router = express.Router()
import { title } from "process"
import prisma from "../lib/prisma"
const security = require('../middleware/security')

router.get('/:postid', async (req, res) => {
    const { postid } = req.params
    try {
      const post = await prisma.post.findUnique({
        where:{
            id: postid
        },
      })

      const comments = await prisma.comment.findMany({
        where:{
            postId: postid
        }, 
      })
      res.json({post, comments})
    } catch (error) {
      console.log(error)
    }
  })

router.post('/:username/:postid', security.requireAuthenticatedUser, async (req, res) => {
    const { postid, username } = req.params
    const { content } = req.body
    try {
      const post = await prisma.post.findUnique({
        where:{
            id: postid
        },
      })


      const createdComment = await prisma.comment.create({
        data:{
            content: content,
            author: {
                connect: { username: username },
              },
            post: {
                connect: { id: post.id }
            }
        },
      })
      res.json({post, createdComment})
    } catch (error) {
      console.log(error)
    }
  })

router.delete('/:username/:postid', security.requireAuthenticatedUser, async (req, res) => {
    const { postid } = req.params
    const { commentid } = req.body
    try {
      const post = await prisma.post.findUnique({
        where:{
            id: postid
        },
      })

      const deletedComment = await prisma.comment.delete({
        where:{
            id: commentid
        }
      })
      res.json({post, deletedComment})
    } catch (error) {
      console.log(error)
    }
  })

module.exports = router;