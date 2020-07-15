import React from 'react'
import { Link } from 'react-router-dom'
import '../style.css'

export default class Rec extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			cart: [],
			isInCart: false
		}
		this.addToCart = this.addToCart.bind(this)
	}

	componentDidMount(){
		// get the cart
		let cart = JSON.parse(localStorage.getItem('cart'))
		// check is current record is in cart
		const isInCart = cart.some(item => item._id === this.props.values._id)
		this.setState({ isInCart })
	}

	addToCart(){
		// update the cart
		let cart = JSON.parse(localStorage.getItem('cart'))
		// add record
		const {_id, title, price, recImg, artist} = this.props.values
		const newItem = {_id, title, price, recImg, artist}
		cart.push(newItem)
		// save to local storage
		localStorage.setItem('cart', JSON.stringify(cart))
		console.log(cart)
		// set isInCart to true
		this.setState({ isInCart: true })
	}

	render(){
		let {_id, artist, price, recImg, title} = this.props.values
		return(
			<div className="rec">
				<div>
					<img src={recImg} draggable="false" alt="record cover" />
					<div className="rec-info">
						<h3 className="rec-title">{title}</h3>
						<Link to={"/artist/" + artist} ><h4 className="rec-artist">{artist}</h4></Link>
					</div>
				</div>
				<div className="rec-footer">
					<h3 className="rec-price">${price}</h3>
					{ this.state.isInCart ? <button disabled style={{background: "#48B02C"}} id={_id} >In Cart</button>
						: <button onClick={this.addToCart} >Add to Cart</button>
					}
				</div>
			</div>
		)
	}
}