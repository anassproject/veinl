const express = require('express')
const router = express.Router()
const Rec = require('./models/Rec')
const Payment = require('./models/Payment')

// main route
router.get('/', async (req, res) => {
	res.json('api main route')
})

// get all recs
router.get('/recs', async (req, res) => {
	try {
		const recs = await Rec.find()
		res.json(recs)
	}catch(err){
		res.status(400).json({msg: err})
	}
})
// get specific rec with id
router.get('/recs/:id', async (req, res) => {
	try {
		const rec = await Rec.findOne({ _id: req.params.id })
		res.json(rec)
	}catch(err){
		res.status(400).json({msg: err})
	}
})
// get all artists 
router.get('/artists', async (req, res) => {
	let artists = []
	try {
		const recs = await Rec.find()
		recs.forEach(rec => {
			// check if artist is already added, if otherwise add it
			let dupl = false
			artists.forEach(artist =>{
				if(artist.name == rec.artist){
					dupl = true;
				}
			})
			if(!dupl) artists.push({ name: rec.artist, img: rec.artistImg })
		})
		res.json(artists)
	}catch(err){
		res.status(400).json({msg: err})
	}
})
// get specific artist with name
router.get('/artists/:passedName', async (req, res) => {
	let {passedName} = req.params
	try {
		const recs = await Rec.find({ artist: passedName })
		res.json(recs)
	}catch(err){
		res.status(400).json({msg: err})
	}
})

// post payment data to db
router.post('/send-payment', async (req, res)=>{
	const payment = new Payment(req.body)
	try {
		const savedPayment = await payment.save()
		res.send(payment)
	}catch(err){
		res.status(400).json({msg: err})
	}
})

// to add recs *******************************************************************************************
router.post('/add-rec', async (req, res) => {
	const {recImg, title, artist, artistImg, price} = req.body
	const newRec = new Rec({recImg, title, artist, artistImg, price})
	try {
		const savedRec = await newRec.save()
		res.send("rec added!")
	}catch(err){
		res.status(400).json({msg: err})
	}
})

module.exports = router