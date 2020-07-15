const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const path = require('path')

// start exp app
const app = express()

// init MWs
app.use(cors())
app.use(express.json())

// add api route
app.use('/api', require('./api'))

// connect to db
mongoose.connect(
	process.env.DB_URI,
	{ useUnifiedTopology: true,  useNewUrlParser: true },
	()=> console.log('connected to db!')
)

// for production
if(process.env.NODE_ENV === 'production'){
	app.use(express.static('client/build'))
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
	})
}

// port listening
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> console.log('server running!'))