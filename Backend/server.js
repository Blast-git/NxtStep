const express = require("express")
const app = express()

require("dotenv").config()
const PORT = process.env.PORT || 3000

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json())

require("./src/config/database.js").connect()

//route import and mount
const user = require("./src/routes/user.js")   
app.use("/api/v1",user)

app.listen(PORT,()=>{
    console.log(`App is listening at ${PORT}`)
})