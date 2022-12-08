import React, { Component } from "react";
import './index.css'

import {
  Route,
  NavLink,
  HashRouter,
  Routes
} from "react-router-dom";
import Home from "./Home";
import Stuff from "./Stuff";
import Contact from "./Contact";
 
class Main extends Component {
  render() {
    return (
        <HashRouter>
            <div>
                <h1>IntelligentGrocery App</h1>
                <ul className="header">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/stuff">Grocery Shopping</NavLink></li>
                    <li><NavLink to="/contact">Stores</NavLink></li>
                </ul>
                <div className="content">
                                   
                    <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/stuff" element={<Stuff/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    </Routes>

                </div>
            </div>
        </HashRouter>
    );
  }
}
 
export default Main;