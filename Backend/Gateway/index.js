import express from "express"//import the default export from the express package and store it in a variable called express
import dotenv from "dotenv"
dotenv.config()

const port =process.env.PORT //takes the port from the env file in gateway 

const app=express() // calls the express function , and store the Express application it creates inside the app


app.get("/",(req,res)=>{ // tells the server what to do when someone visits a url 
    res.json({message :"Hello from Gateway"})
})

app.listen(port,()=>{ // starts your sever and makes it listen for requests 
    console.log(`gateway started at ${port}`);
    
})
