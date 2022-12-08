import React, { Component } from "react";
import {useState, useEffect} from 'react'
import Axios from 'axios'
import './index.css'

 
function Contact(){

    const [storeList, setStoreList] = useState([])

    /*
    useEffect(()=>{
        Axios.get('http://localhost:3001/api/stores').then((response)=>{
          console.log(response.data)
          setStoreList(response.data)
        })
    })
    */

    const listStore =  () => {
      Axios.get('http://localhost:3001/api/stores').then((response)=>{
          console.log(response.data)
          setStoreList(response.data)
        })
    }
    

    return (
      <div>
        <h2>Store Information</h2>
        <p>Seach store: <input type="text"/> <button onClick={listStore}>Search</button><button onClick={listStore}>View All Stores</button>
        </p>

        {storeList.map ((val)=>{
          return <div className = "card">
            <h3> {val.name}</h3> 
            <b>Store ID</b>: {val.store_id} <br/>
            <b>Address</b>: {val.normalized_address}<br/>
            <b>Phone</b>: {val.phone_number}<br/>
            </div>
        })}
      </div>
    );

}
 
export default Contact;