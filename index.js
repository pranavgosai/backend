const mongoose =  require("mongoose");
const { boolean } = require("webidl-conversions");
mongoose.set(`strictQuery`,true);
mongoose.connect("mongodb://0.0.0.0:27017/user",{useNewUrlparser:true, useUnifiedTopology:true,}).then(()=>{
    console.log("connected to mongodb successfully");
}).catch((err)=>{
    console.log(err);
})


const pranav = new mongoose.Schema({
    name:String,
   
    height:Number,
});

const Pranav = new mongoose.model("Pranav",pranav);

const adder = async ()=>{
    const ss= new Pranav({
        name:"pranav",
       
        height:6
    })
    await  ss.save();
}

adder();