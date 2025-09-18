const express = require("express");
const logger = require("./middelware/logger")

const app = express();

app.use(logger)

const {notFoundHandler,errorHandler} = require("./middelware/error")

app.get("/", (req, res) => {
    console.log("GET /")
    res.send("Operation Done")
})

app.use(notFoundHandler)
app.use(errorHandler)



app.listen(3000, () => console.log("App running on port 3000"))