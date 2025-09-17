const express = require("express");

const app = express();


app.get("/", (req, res) => {
    console.log("GET /")
    res.send("Operation Done")
})



app.listen(3000, () => console.log("App running on port 3000"))