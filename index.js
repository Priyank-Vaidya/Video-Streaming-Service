const express = require('express')
const fs = require('fs')
const app = express()
// const mongoose = require('mongoose');
const routers = require('./routers')
const cors = require('cors')

const PORT=process.env.PORT || 5000

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.listen(PORT, ()=>{
    console.log(`Server Running at Port: ${PORT}`);
})

app.get('/', (req, res)=>{
    res.send("Server Running");
})

app.use('/api', routers)

// mongoose.connect(process.env.MONGO_URI, {user: process.env.MONGO_USER, pass: process.env.MONGO_PASSWORD, useNewUrlParser: true , useUnifiedTopology: true })
// const db = mongoose.connection;

// try{
//     app.listen(process.env.PORT,()=>{
//         console.log(`connected to db and Listening to port : ${PORT} `);
//         // });

//     });
// }
// catch (error) {console.log("Error in connecting")};

// const conn = mongoose.connection
