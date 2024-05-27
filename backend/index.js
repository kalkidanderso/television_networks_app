import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import ChannelRoutes from './routes/channelRoutes.js'
import UserRoutes from './routes/userRoutes.js'
import MovieRoutes from './routes/movieRoutes.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 80

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use(ChannelRoutes)
app.use(UserRoutes)
app.use(MovieRoutes)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

export default app
