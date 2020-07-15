import React, { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import '../style.css'
import axios from 'axios'

const CartComp = () => {
	const [cart, setCart] = useState([])
	const [cartTotal, setCartTotal] = useState(0)
	// payment variables for rendering
	const [success, setSuccess] = useState(false)
	const [failure, setFailure] = useState(false)

	// get cart from local storage and set total price
	useEffect(()=>{
		// get the cart
		let cart = JSON.parse(localStorage.getItem('cart'))
		setCart(cart)
	}, [])

	// set/update the cart total and paypal payment
	useEffect(()=>{
		if(cart.length > 0){
			// update cart total
			let newTotal = 0
			cart.forEach(item => {newTotal += item.price})
			document.querySelector('.paypal-btn').innerHTML = ""
			setTimeout(()=>{
				newTotal = Math.round(newTotal * 100 + Number.EPSILON) / 100 // round to 2 decimal digits number
				setCartTotal(newTotal)
				// PAYPAL Setup (sandbox mode!)
				let script = document.createElement('script')
				//cart.forEach(item => purchase_units.push({description: item.title , amount: { currency_code: 'USD', value: item.price }}))
				script.src = 'https://www.paypal.com/sdk/js?client-id=ARi4lz2bFAVs_rH8Y-SO8eNEPkkLqKLDlF3kkn-lLGS3cQ9xfLvrWBRk0bECpkVKz5QMicVjS2SKSj1l'
				script.addEventListener('load', ()=>{
					window.paypal.Buttons({
			        	createOrder: (data, actions) => {
				          	return actions.order.create({purchase_units : [{description: "VeinL Records" , amount: { currency_code: 'USD', value: cartTotal }}]})
			        	},
			        	onApprove: async (data, actions) => {
			         		const order = await actions.order.capture();
			          		// create payment data object
			          		let paymentData = {}
			          		paymentData.paymentId = order.id
			          		paymentData.create_time = order.create_time
			          		paymentData.email = order.payer.email_address
			          		paymentData.amount = order.purchase_units[0].amount.value
			          		paymentData.currency = order.purchase_units[0].amount.currency_code
			          		paymentData.address = order.purchase_units[0].shipping.address
			          		paymentData.name = order.purchase_units[0].shipping.name.full_name
			          		paymentData.cart = cart
			          		// send it to db
			          		axios.post('/api/send-payment', paymentData)
			          			.then(res => {
			          				console.log(res.data)
			          				// show success message
			          				setSuccess(true)
			          				// reset cart in state and LS
			          				setCart([])
			          				localStorage.setItem('cart', '[]')
			          			})
			          			.catch(err => {
			          				console.log(err)
			          				// show failure message
			          				setFailure(true)
			          			})
			        	},
			        	onError: err => {
			          		console.log(err)
			          		setFailure(true)
			        	},
			      	}).render(document.querySelector('.paypal-btn'))
			      	console.log("paypal btn amount: $" + cartTotal)
				})
				document.body.appendChild(script)
			}, 1000)
		}
	}, [cart, cartTotal])

	const remove = (e)=>{
		const id = e.target.id
		let editedCart = cart
		editedCart = editedCart.filter(item => item._id !== id)
		setCart(editedCart)
		localStorage.setItem('cart', JSON.stringify(editedCart))
	}

	return(
		<div className="CartComp container">
			{	cart.length > 0 && !success && !failure ?
				<div>
				<h1 className="section-header">My Cart ({cart.length})</h1>
				<div>
					<p>Below are the records you have added to your cart. you can add more or remove records and proceed to payment!</p>
					<div className="cart-recs recs-cont">
					{
						cart.map((item, index) => {
							return(
								<div className="cart-item rec" key={index}>
									<div>
										<img src={item.recImg} draggable="false" alt="rec-img" />
										<div className="rec-info">
											<h3 className="rec-title">{item.title}</h3>
											<Link to={"/artist/"+item.artist} ><h4 className="rec-artist">{item.artist}</h4></Link>
										</div>
									</div>
									<div className="rec-footer">
										<h3 className="rec-price">${item.price}</h3>
										<button id={item._id} className="remove-rec" onClick={remove} >Remove</button>
									</div>
								</div>
							)
						})
					}
					</div>
					<div className="cart-info">
						<div>
							<h2 className="cartInfoHeader">Cart Information</h2>
							<p>Number of Records: {cart.length}</p>
							<p>Total Amount: ${cartTotal}</p>
						</div>
						<div className="payment-div">
							<h3>Proceed to Payment</h3>
							<div className="paypal-btn"></div>
						</div>
					</div>
				</div>
				</div>
				: cart.length === 0 && !success && !failure ? <h1>Your cart is now empty!</h1> : ""
			}
			{
				success ? (
					<div>
						<h1 className="section-header">Thank You!</h1>
						<p>We have received your order and payment successfully!</p>
					</div>
				) : failure ? (<h1 className="section-header">Apologies! Your order has not been sent.</h1>) : ""
			}
		</div>
	)
}


export default CartComp