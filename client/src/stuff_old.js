import React, { Component } from "react";
import {useState, useEffect} from 'react'
import Axios from 'axios'
import './index.css'


function Stuff() {
  const [productList, setProductList] = useState([])

  const [shoppingList, setShoppingList] = useState([])

  const [shoppingResult, setShoppingResult] = useState([])

    /*
    useEffect(() => {
        //Runs on every render
        console.log("I am here...")
      });
    */

    const listProducts =  () => {
        Axios.get('http://localhost:3001/api/products').then((response)=>{
            console.log(response.data)
            setProductList(response.data)
          })
    }

    const postShoppingList =  () => {
      Axios.post('http://localhost:3001/api/shoppinglist', shoppingList).then((response)=>{
        setShoppingResult(response.data)
      })
      setProductList([])
      }

    const addProduct = (_id, _name, _quantity) => {
        console.log("add product called...")
        console.log(_id)
        console.log(_name)
        console.log(_quantity)
        setShoppingList(shoppingList.concat([{
          id: _id,
          name: _name,
          quantity: _quantity
        }]))
    }

    const startOver = () => {
      setShoppingList([])
      setShoppingResult([])
    }

    return (
      <div>
        <h2>Create My Shopping List</h2>
        <p>Seach product: <input type="text"/> <button onClick={listProducts}>Search</button><button onClick={listProducts}>View All Products</button> Select items and quantities, we will recommand the best store to shop this list</p>
        {productList.length > 0 &&
        <table>
          <tr>
            <th>Product Name</th>
            <th>Quantities</th>
            <th>Order</th>
          </tr>
          <tbody>
        {productList.map ((val, idx)=>{
          return <tr>
            <td>{val.name}</td> 
            <td><input id={idx} type="text" size={2} defaultValue={1}/> </td> 
            <td><button onClick={()=>addProduct(val.product_id, val.name, document.getElementById(idx).value)}>Add to List</button></td> 
            </tr>
        })}
        </tbody>
        </table>
        }
        
        {shoppingList.length > 0 &&
        <div>         
          <p>
          <h2> My Shopping List</h2>
          <ol>
            {shoppingList.map ((val)=>{
            return <li>
              {val.name} ({val.quantity})
              </li>
            })}
          </ol>
          </p>
          <button onClick={postShoppingList}>Submit Shopping List</button>
        </div>
        }

      {shoppingResult.length > 0 &&
        <div>         
          <p>
          <h2> My Shopping Result</h2>
          <ol>
            {shoppingResult.map ((val)=>{
            return <li>
              Your shopping list can be fullilled at {val.store} at ${val.total_price}. 
              </li>
            })}
          </ol>
          </p>
          <button onClick={startOver}>Start Over</button>
        </div>
        }
        
      </div>
    );
  
}
 
export default Stuff;