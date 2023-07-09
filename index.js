//Dotenv used to set Up environment variables required
require('dotenv').config();
//Create a Server using Express module
const app=require('express')()
//Assigning a port to the Server
PORT=process.env.PORT;
app.listen(PORT,()=>console.log(`Server on Port ${PORT}`))

//Cross origin policy to map to frontend at different server
const cors=require('cors')
app.use(cors())

//Product Routes import and usage
const ProductApp=require('./routes/product_route')
app.use('/products',ProductApp)

//Category Routes import and usage
const CategoryApp=require('./routes/category_route')
app.use('/categories',CategoryApp)

//Cart Routes import and usage
const CartApp=require('./routes/cart_route')
app.use('/cart',CartApp)

//Order Routes import and usage
const OrderApp=require('./routes/order_route')
app.use('/order',OrderApp)

//User Route import and usage
const UserApp=require('./routes/user_route')
app.use('/user',UserApp)

app.use((err,req,res,next)=>{
    res.send({message:"Error occured",err});
})