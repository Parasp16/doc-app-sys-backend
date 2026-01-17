const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./models') 
const userRoute = require('./routes/userRoutes')
const appointmentRoute = require('./routes/appointmentRoute')
const { testConnection } = require('./config/db')

testConnection()

const app = express()
const port = process.env.PORT || 7005

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

app.use(express.json())

app.use('/api/user', userRoute)
app.use('/api/appointment', appointmentRoute)
app.use('/uploads', express.static('uploads'))
app.use('/api/user', userRoute)
app.use('/api/appointment', appointmentRoute)
const doctorRoute = require('./routes/doctorRoute')

app.use('/api/doctor', doctorRoute)

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Server Running 🚀'))

app.listen(port, () =>
  console.log(`Server running on port ${port}`)
)

