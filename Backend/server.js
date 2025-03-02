const express = require("express")
const app = express()

require("dotenv").config()
const PORT = process.env.PORT || 3000

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json())

require("./src/config/database.js").connect()

//route import and mount
const routes = require("./src/routes/index.js");
app.use("/api/v1", routes);

app.listen(PORT,()=>{
    console.log(`App is listening at ${PORT}`)
})