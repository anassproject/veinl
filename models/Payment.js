const mongoose = require('mongoose')
const Schema = mongoose.Schema

const paymentSchema = Schema({
	data: Schema.Types.Mixed
})

module.exports = mongoose.model('payment', paymentSchema)