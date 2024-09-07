const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({limit : "10mb"}))

const PORT = process.env.PORT || 8080

//MONGO DB CONNECTION
mongoose.set('strictQuery', false);
console.log(process.env.MONGODB_URL)
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("connnect to database"))
.catch((err)=>console.log(err))


// Schema
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    confirmPassword: String,
    image : String
})

// Model

const userModel = mongoose.model('user', userSchema);


//API 
app.get("/", (req, res)=>{
    res.send('server is running')
});


// Sign up API for registering the user
app.post("/signup", async (req, res)=>{
    try{
        console.log(req.body);

    const {email} = req.body;

 // Use async/await to handle the result
    const data = await userModel.findOne({email:email});

        if(data){
            // if the user already exist
            res.send({message: "Email id is already registered", alert:false})
        }
        else{
            //create new user
            const data = new userModel(req.body);
             await data.save();
            res.send({message: "successfully registered", alert:true})
        }
    }
    catch(err){
        //Handle any error that occurs
        console.error('Error during signup', err);
        res.status(500).send({message: 'Internal server Error'});
        
    }

});

// Login API 
app.post('/login', async(req, res)=>{
    try{
        console.log(req.body);
        const {email, password} = req.body;
        
        const data = await userModel.findOne({email:email});
    
        if(data){
        if(data.password===password){
            
            const dataSend = {
                id: data._id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email, 
                image: data.image,
            };
            console.log(dataSend)
            res.send({message: "Login is successfull", alert : true, data: dataSend})
        }
        else{
            res.send({ message: 'Incorrect password', alert: false });
        }
    }
     else{
        res.send({message: 'This email is not registered, please signup ', alert: false })
    }
    
    }
    catch(err){
        console.error(err);
        res.status(500).send({ message: 'Server error', alert: false });
    }
})

// ----------------Product Section------------------------------------------------

const productSchema = new mongoose.Schema({
    name:String,
    category:String,
    image:String,
    price:String,
    description:String,

});

const productModel = mongoose.model("product", productSchema);

// save product data through API

app.post('/updateProduct', async (req, res)=> {
    console.log(req.body);

    let data = await productModel(req.body);
    data = await data.save();

    res.send({message: "Upload successfully!"})
})


//--------------------get Product data ------------------------------

app.get("/product", async(req, res)=>{

    const data = await productModel.find({});
    res.send(JSON.stringify(data))

})







app.listen(PORT, ()=>console.log("Server is running at port: "+PORT));
