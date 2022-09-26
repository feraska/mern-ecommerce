require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const path = require('path')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles:true
}))

//connect
const URI = process.env.MONGODB_URI
mongoose.connect(URI,{
    
    useNewUrlParser:true,
    useUnifiedTopology:true
},err=>{
    if(err){
        console.log("error message",err.message)
        throw err
    }
    console.log('Connected to MongoDB')
}
)
//router
app.use('/user',require('./routes/userRouter'))
app.use('/api',require('./routes/categoryRouter'))
app.use('/api',require('./routes/upload'))
app.use('/api',require('./routes/ProductRouter'))
app.use('/api', require('./routes/paymentRouter'))
if(process.env.NODE_ENV==="production"){
    app.use(express.static('client/build'))
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'))
    })
}
const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log('Server is running on port',PORT)
})