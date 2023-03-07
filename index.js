//basi server srtruture//

const express= require("express");
const Courseinfo =  require("./model/CourseDb");
const path = require('path')
// initialise
const app = new express();
// app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'/build')));
//cors policy
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type ");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
})

app.get('/api/view',async(req,res)=>{
    try {
        let result = await Courseinfo.find();
        res.json(result);
    }
    catch(error){
        res.status(500).send(error.message);
    }
})

//api creation

app.post('/api/create',async(req,res) => {
    try
    {
        let course = new Courseinfo(req.body);
         course.save();
     res.json(course);
          res.send("added");
        }
        catch(error){
            res.status(500).send(error.message);
        }
        
});
app.post('/api/update', async (req,res)=>{
    try{
        await Courseinfo.findByIdAndUpdate(req.body._id,req.body);
    }
    catch(error){
        res.status(500).send(error.message);
    }
    
})
app.post('/api/delete', async (req,res)=>{
try{
    await Courseinfo.findByIdAndDelete(req.body._id);
    res.send("data deleted");
}
    catch(error){
        res.status(500).send(error.message);
    }

})
app.post('/api/search',async (req,res) => {
    try{
        let result = await Courseinfo.find({ "cname": { $regex: ".*"+req.body.cname+'.*' }});
        res.json(result);
    }
    catch(error){
        res.status(500).send(error.message);
    }
})
app.get('/*', function(req,res){
    res.sendFile(path.join(__dirname,'/build/index.html'));
   
});
// setting port
app.listen(5000,() => {
    console.log("server is good");
})
