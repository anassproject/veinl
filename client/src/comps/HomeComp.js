import React from 'react'
import '../style.css'
import Rec from './Rec'

export default class Homecomp extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			newRecs: [
				{
					artist: "charles mingus",
					artistImg: "https://images-na.ssl-images-amazon.com/images/I/714CpdmTyUL.png",
					price: 25.89,
					recImg: "https://cdns-images.dzcdn.net/images/cover/9e2d0d6b4a2cf6d4180aa9f8b98a0b79/264x264.jpg",
					title: "mingus in wonderland",
					__v: 0,
					_id: "5eed01860a93e10dcc2dfc50"
				},
				{
					artist: "chet baker",
					artistImg: "https://images-na.ssl-images-amazon.com/images/I/71+wWABre6L.png",
					price: 19.89,
					recImg: "https://cdns-images.dzcdn.net/images/cover/63f24d377c90dc7fadaf8f5868b650fd/264x264.jpg",
					title: "the best of chet baker sings",
					__v: 0,
					_id: "5eecfeef0a93e10dcc2dfc4a"
				},
				{
					artist: "chet baker",
					artistImg: "https://images-na.ssl-images-amazon.com/images/I/71+wWABre6L.png",
					price: 23.99,
					recImg: "https://e-cdns-images.dzcdn.net/images/cover/7521ad74c902a3bda504b5909ae10c65/264x264.jpg",
					title: "chet baker in tokyo",
					__v: 0,
					_id: "5eecffac0a93e10dcc2dfc4c"
				},
				{
					artist: "john coltrane",
					artistImg: "https://images-na.ssl-images-amazon.com/images/I/51p9wtoPTUL.jpg",
					price: 25.99,
					recImg: "https://cdns-images.dzcdn.net/images/cover/07e013aa32192e3e9516165992eb0461/264x264.jpg",
					title: "a love supreme",
					__v: 0,
					_id: "5eed056d0a93e10dcc2dfc59"
				}
			]
		}
	}
	render(){
		return(
			<div className="Homecomp container">
				<h1 className="section-header">Welcome to VeinL</h1>
				<p className="into-p">your favorite hub for pristine vinyl records from the world's giants of Jazz.</p>
				<div className="our-picks">
					<h2>New Arrivals In Our Discography</h2>
					<div className="recs-cont">
					{
						this.state.newRecs.map((rec, index) => {
							return(
								<Rec key={index} values={rec} />
							)
						})
					}
					</div>
				</div>
			</div>
		)
	}
}