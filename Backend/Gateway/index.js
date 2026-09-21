import express from "express"//import the default export from the express package and store it in a variable called express
import dotenv from "dotenv"
import proxy from "express-http-proxy"
dotenv.config()
import cors from "cors"
import cookieParser from "cookie-parser"
const port =process.env.PORT //takes the port from the env file in gateway 

const app=express() // calls the express function , and store the Express application it creates inside the app
app.use(cors({//access requests only from the frontend url
    origin:process.env.FRONTEND_URL,
    credentials:true
}))

app.use(cookieParser())
app.use("/auth",proxy(process.env.AUTH_SERVICE)) //to connect to auth service when an auth req comes from an frontend


app.get("/",(req,res)=>{ // tells the server what to do when someone visits a url 
    res.json({message :"Hello from Gateway"})
})

app.listen(port,()=>{ // starts your sever and makes it listen for requests 
    console.log(`gateway started at ${port}`);
    
})
