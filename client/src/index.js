import React from "react";
import ReactDOM from "react-dom/client";
import Main from "./Main";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Stuff from "./Stuff";


const root = ReactDOM.createRoot(document.getElementById('root'));
 
root.render(
    <Router>
        <Routes>
            <Route path="/" element={<Stuff />} />
        </Routes>
    </Router>

);