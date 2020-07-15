import React from 'react'
import '../style.css'
import axios from 'axios'
import Rec from './Rec'

export default class ShopComp extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			recs: [],
			isRecsLoaded: false,
			displayedRecs: 8
		}
		this.showMore = this.showMore.bind(this)
	}
	componentDidMount(){
		axios.get('/api/recs')
			.then(res => this.setState({ recs: res.data, isRecsLoaded: true}))
	}
	showMore(){
		let inc = this.state.displayedRecs+8
		this.setState({ displayedRecs: inc })
	}
	render(){
		let {displayedRecs, recs, isRecsLoaded} = this.state
		return(
			<div className="ShopComp container">
				<h1 className="section-header">VeinL shop </h1>
				<p>Check out our discography of <b>{recs.length }</b> jazz records now and order whichever you please now!</p>
				<div className="recs-cont">
				{
					this.state.recs.slice(0,displayedRecs).map((rec, index) => <Rec key={index} values={rec} />)
				}
				</div>
				{ isRecsLoaded && displayedRecs < recs.length ? <button className="show-more" onClick={this.showMore} >Show More</button> : "" }
			</div>
		)
	}
}