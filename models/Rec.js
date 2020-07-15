const mongoose = require('mongoose')

const recSchema = mongoose.Schema({
	recImg: { type: String, required: true },
	title: { type: String, required: true },
	artist: { type: String, required: true },
	artistImg: { type: String, required: true },
	price: { type: Number, required: true }
})

module.exports = mongoose.model('rec', recSchema)