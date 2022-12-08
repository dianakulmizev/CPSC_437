const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
var async = require("async");

const app = express()
const mysql = require('mysql2')
//const mysql = require('sync-mysql')

const db = mysql.createPool(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'groceryapp'
    }
)

//app.use(cors)
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

app.get('/hello', (req, res)=>{
    console.log("Get /hello called")
    res.send("Hello World!")
})

app.get('/api/stores', (req, res) => {
    console.log("GET /api/stores called")

    const sqlGet = "select * from stores;"
    db.query(sqlGet, (err, result) => {
        res.send(result)
    })
    
})

app.get('/api/products', (req, res) => {
    console.log("GET /api/products called")

    const sqlGet = "select * from products;"
    db.query(sqlGet, (err, result) => {
        res.send(result)
    })
    
})

// given a product_id, get quantity from shoppingList
const getQuantity = (productId, shoppingList) => {
    //console.log("call getQuantity function...")
    //console.log(shoppingList)
    for(item in shoppingList) {
        //console.log(item)
        if(shoppingList[item].id === productId) {
            return shoppingList[item].quantity;
        }
    }
}

app.post('/api/shoppinglist', (req, res)=> {
    console.log('POST api/shoppinglist called')
    console.log(req.body)
    
    var shoppingList = req.body;

    var shoppingResult = [];
    
   

    var sqlGetStoreProducts = "select sp.store_id, s.name,  sp.product_id, sp.price , 0 as item_price from product_store_price sp join stores s on (sp.store_id = s.store_id)where product_id in ";
    var inCond = "("
    for( i in shoppingList) {
        inCond = inCond + shoppingList[i].id + ","
    }
    const incondition = inCond.slice(0, -1) + ')'
    sqlGetStoreProducts = sqlGetStoreProducts + incondition + " order by store_id;"
    console.log(sqlGetStoreProducts)

    db.query(sqlGetStoreProducts, incondition, (err, result) => {
        if(err) {
            console.log(err)
        }else {
            console.log(result)
            // process shopping result
            var storeName = ""
            var sub_total = 0

            for(i in result) {
                var item = result[i];
                if( sub_total === 0) {
                    // a new store 
                    storeName = item.name;
                    console.log("new store:" + storeName)
                    sub_total = sub_total + item.price * getQuantity(item.product_id, shoppingList);
                }else if (storeName != "" && storeName === item.name) {
                    console.log("storeName:" + storeName)
                    console.log("item.name:" + item.name)
                    // still in same store
                    console.log("still in same store:" + item.name)
                    sub_total = sub_total + item.price * getQuantity(item.product_id, shoppingList);
                }else {
                    console.log("new store:" + item.name)
                    // start a new store
                    // add last store total to shopping result
                    shoppingResult = shoppingResult.concat({store: storeName, total_price: sub_total})
                    sub_total = 0;
                    storeName = item.name
                    sub_total = sub_total + item.price * getQuantity(item.product_id, shoppingList); 
                }
            }
            // last store
            shoppingResult = shoppingResult.concat({store: storeName, total_price: sub_total})
            res.send(shoppingResult)
        }
    })
}) 

app.listen(3001, (
)=>{
    console.log("app running on port 3001")
})