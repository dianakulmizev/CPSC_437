import React, { Component } from "react";
import {useState, useEffect} from 'react'
import Axios from 'axios'
import styled from 'styled-components';
import Navigation from "./components/navigation";
import './index.css'


export const Page = styled.div`
    background-color: #FAF9F6;
    width: 100vw;
    height: 100vh;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
`
export const PageContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center; 
`

export const GroceryForm = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    margin: auto;
    width: 100%;
`

export const Field = styled.input`
    font-family: 'Klee One', cursive;
    background-color: #ffaa9f
    height: 20px;
    padding: 10px 15px 10px;
    margin-bottom: 10px;
    font-size: 16px;
    border-radius: 25px;
    border: none;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    &:focus {
        outline: none;
      }
`

export const Notebook = styled.div`
    width: 35%;
    height: fit-content;
    padding-bottom: 7px;
    outline-left: 1px solid #ffaa9f;
    background-color: #F5F5F5;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
    margin-left: -100px;
`
export const GroceryList = styled.ul`
    padding: 0px;
    height: 100%;
    font-family: 'Klee One', cursive;
`

export const Grocery = styled.li`
    list-style: none;
    border-bottom: 1px #96ADE9 solid;
    text-indent: 20px;
    padding: 5px;
    user-select: none;
    `

    export const Button = styled.button`
    border-radius: 25px;
    border: none;
    background-color: #009E60;
    color: white;
    padding: 10px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    width: fit-content;
    font-family: 'Raleway', sans-serif
`    

export const Table = styled.table`
background-color: #C1E1C1;
border-radius: 25px;
margin: auto;
padding: 10px;
`

function Stuff() {
  const [productList, setProductList] = useState([])

  const [shoppingList, setShoppingList] = useState([])

  const [shoppingResult, setShoppingResult] = useState([])

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
      <Page>
        <Navigation />
        <h2 style={{fontFamily: "Raleway"}}>Create My Shopping List</h2>
        <p><Button onClick={listProducts}>View All Products</Button></p>
        {productList.length > 0 &&
        <Table class="center">
          <tr>
            <th style={{fontFamily: "Raleway"}}>Product Name</th>
            <th style={{fontFamily: "Raleway"}}>Quantities</th>
            <th style={{fontFamily: "Raleway"}}>Order</th>
          </tr>
          <tbody>
        {productList.map ((val, idx)=>{
          return <tr>
            <td style={{fontFamily: "Raleway"}}>{val.name}</td> 
            <td><input style={{fontFamily: "Raleway", border: "0px", borderRadius: "25px"}} id={idx} type="text" size={2} defaultValue={1}/> </td> 
            <td><Button onClick={()=>addProduct(val.product_id, val.name, document.getElementById(idx).value)}>Add to List</Button></td> 
            </tr>
        })}
        </tbody>
        </Table>
        }
        
        {shoppingList.length > 0 &&
        <div>         
          <p>
          <h2 class="center"> My Shopping List</h2>
          <ol>
            {shoppingList.map ((val)=>{
            return <li>
              {val.name} ({val.quantity})
              </li>
            })}
          </ol>
          </p>
          <Button onClick={postShoppingList}>Submit Shopping List</Button>
        </div>
        }

      {shoppingResult.length > 0 &&
        <div>         
          <p>
          <h2> My Shopping Result</h2>
          <ol>
            {shoppingResult.map ((val)=>{
            return <li>
              Your shopping list can be fulfilled at {val.store} for ${val.total_price.toFixed(2)}. 
              </li>
            })}
          </ol>
          </p>
          <Button onClick={startOver}>Start Over</Button>
        </div>
        }
    </Page>
    );
  
}
 
export default Stuff;