import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import '../style.css'

export default class ArtistsComp extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			artists : []
		}
	}
	componentDidMount(){
		axios.get('/api/artists')
			.then(res => this.setState({ artists: res.data }))
			.catch(err => console.log(err))
	}

	render(){
		return(
			<div className="ArtistsComp container">
				<h1 className="section-header">Artists</h1>
				<p style={{textTransform: "capitalize"}} >Discover the best artists of the Jazz genre, check out their discographies and get your next vinyl gem now.</p>
				<div className="artists-cont">
				{
					this.state.artists.map((artist, index) => {
						return(
							<Link key={index} to={"/artist/" + artist.name}>
								<div className="artist">
									<div className="artist-img" style={{ background: `url(${artist.img}) center/cover` }}></div>
									<h3>{artist.name}</h3>
								</div>
							</Link>
						)
					})
				}
				</div>
			</div>
		)
	}
}