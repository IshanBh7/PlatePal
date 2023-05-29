const express = require('express')
const app = express()
const port = process.env.PORT||5000;
const mongoDB= require("./db")
const path= require("path");

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use(express.json())
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("build"));
  
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build/index.html"));
  });
    
}

