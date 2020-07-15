import React, {useEffect} from 'react';
import './style.css'
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
// import comps
import Navbar from './comps/Navbar'
import HomeComp from './comps/HomeComp'
import ArtistsComp from './comps/ArtistsComp'
import ShopComp from './comps/ShopComp'
import ArtistPageComp from './comps/ArtistPageComp'
import CartComp from './comps/CartComp'
import './myScript.js'


function App() {

  useEffect(()=> {
    // load font awesome script and add it
    let script = document.createElement('script')
    script.src = "https://kit.fontawesome.com/4568c96668.js"
    document.body.appendChild(script)
    // init cart if there is none already in the Local storage
    if(!localStorage.getItem('cart')) localStorage.setItem('cart', JSON.stringify([]))
  })

  return (
  	<Router>
    <div className="App">
      <div className="nav-cont">
      	<Navbar />
      </div>
      <div className="content">
      	{/* here the routes are added */}
      	<Switch>
      		<Route path="/artists" component={ArtistsComp} />
      		<Route path="/shop" component={ShopComp} />
          <Route path="/artist/:passedName" component={ArtistPageComp} />
          <Route path="/cart" component={CartComp} />
      		<Route path="/" component={HomeComp} />
      	</Switch>
      </div>
      <Link to="/cart" ><div className="cart-icon"><i className="fas fa-shopping-cart"></i></div></Link>
      {/* will be displayed by clicking the burger btn */}
      <div className="mobile-menu">
        <div className="mobileMenuHeader">
          <h3>Menu</h3>
          <h3 className="close-menu">X</h3>
        </div>
      </div>
    </div>
    </Router>
  );
}

export default App;
