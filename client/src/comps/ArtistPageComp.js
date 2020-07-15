import React from 'react'
import axios from 'axios'
import '../style.css'
import Rec from './Rec'

export default class ArtistPageComp extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			passedName: this.props.match.params.passedName,
			artistRecs: []
		}
	}

	componentDidMount(){
		axios.get('/api/artists/' + this.state.passedName)
			.then(res => this.setState({artistRecs : res.data}))
			.catch(err => console.log(err))
	}

	render(){
		return(
			<div className="ArtistPageComp container">
				<h1 className="section-header" >{this.state.passedName}</h1>
				<div className="recs-cont">
				{
					this.state.artistRecs.map((rec, index) => {
						return(
							<Rec key={index} values={rec} />
						)
					})
				}
				</div>
			</div>
		)
	}
}