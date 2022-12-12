const express = require('express')
const dbConnect = require('./connectDB')
const app = express()
app.use(express.json())
const path = require('path')
const userRoute = require('./routes/usersRoute')
const transactionRoute = require("./routes/transactionRoute");
const port = 5000;
app.use('/api/users/' , userRoute)
app.use('/api/transactions/',transactionRoute)





app.listen(port, () => console.log(`Node JS Server started at port ${port}!`))