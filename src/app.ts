import { verifyToken, verifyTokenAndAdmin } from './middleware/auth'
import videoRouter from './controllers/video'
import userRouter from './controllers/user'
import { getOne } from './service/user'
import { connect } from './db/mongo'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken';
import express from 'express'
import cors from 'cors';
import path from 'path'

const port = 3000;
const app = express();

// cors
app.use(cors())

// static files
app.use(express.static(path.join(path.resolve(__dirname, '..'), "client", "build")));

// register middlewares
app.use(bodyParser.json())

// register controllers
app.use('/user', verifyTokenAndAdmin, userRouter)
app.use('/video', verifyToken, videoRouter)

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.htm"));
})

// login
app.post('/login', async (req, res, next) => {
  try {
      const { email, password } = req.body;

      const user = await getOne(email);
      if (!user || user.password !== password || user.isBlocked) {
          throw Error('One of the fields is incorrect')
      }

      const token = jwt.sign({ user_id: user._id, email, video: user.video, isAdmin: user.isAdmin, isBlocked: user.isBlocked }, 'supers3cretstring', { expiresIn: "12h" });
      user.token = token

      res.status(200).send({
          email: user.email,
          token: user.token,
          video: user.video,
          expireDate: user.expireDate,
          isAdmin: user.isAdmin,
          isBlocked: user.isBlocked
      })
  } catch (e) {
      next(e)
  }
})

// register error handler 
app.use((err, req, res, next) => {
  res.status(500).send({ error: true, data: err })
})

app.listen(port, '0.0.0.0', async () => {
  // initial mongo
  await connect()
  return console.log(`Listening on http://localhost:${port}`)
})
