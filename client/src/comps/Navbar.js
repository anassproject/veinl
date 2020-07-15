import React from 'react'
import { Link } from 'react-router-dom'
import '../style.css'

export default class Navbar extends React.Component {
	constructor(props){
		super(props)
		this.state = {}
	}
	render(){
		return(
			<div className="Navbar">
				<div className="logo-menu">
					<div className="logo">V</div>
					<div className="menu-cont">
						<ul className="menu">
							<li><Link className="link-type" to="/" >Home</Link></li>
							<li><Link className="link-type" to="/artists" >Artists</Link></li>
							<li><Link className="link-type" to="/shop" >Shop</Link></li>
						</ul>
					</div>
				</div>
				<div className="sm-icons">
					<span className="follow-span">Follow VeinL On</span>
					<div className="sm-cont">
						<i className="fab fa-facebook-square"></i>
						<i className="fab fa-twitter-square"></i>
						<i className="fab fa-youtube"></i>
					</div>
					<span className="credits" >Developed by Anass Sekram</span>
				</div>
				<div className="burger-btn"><i className="fas fa-bars"></i></div>
			</div>
		)
	}
}