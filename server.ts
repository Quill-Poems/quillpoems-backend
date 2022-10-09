// @ts-nocheck
const express = require('express')
const cors = require('cors')
const { PORT } = require('./config')
const app = express()
const users = require('./routes/users')
const posts = require('./routes/posts')
const auth = require('./routes/auth')
const social = require('./routes/social')
const comments = require('./routes/comments')
const security = require('./middleware/security')

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`)
})

app.use(express.json())
app.use(cors())
app.use(security.extractUserFromJwt);
app.use('/user', users)
app.use('/posts', posts)
app.use('/comments', comments)
app.use('/auth', auth)
app.use('/social', social)

app.get('/', (req, res) =>{
  res.status(200).send({ server_is: "up"})
})
