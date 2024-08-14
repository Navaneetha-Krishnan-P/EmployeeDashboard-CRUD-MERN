const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');

const app=express();

app.use(express.json());
app.use(cors());

const username = "new_user-01";
const password = "Krish2309";
const cluster = "cluster0";
const dbname = "EmployeeDashboard";

const uri = `mongodb+srv://${username}:${password}@${cluster}.hotzxyg.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri)
.then(()=>console.log("MongoDb Atlas Connected"))
.catch((error)=>console.log(error))

const Schema= mongoose.Schema;

const employee=new Schema({
    Employeename:{
        type:String,
        required:true
    },
    EmployeeID:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Phone:{
        type:Number,
        required:true,
        Integer:true
    }
})

const Employee = mongoose.model('Employee', employee);

app.post('/employee',async(req,res)=>{
    const empName= req.body.EmployeeName;
    const empId= req.body.EmployeeID;
    const empEmail=req.body.EmployeeEmail;
    const empPhone=req.body.EmployeePhone;
    const error=req.body.Error
    try{
        if(empName !== '' && empId !== '' && empEmail !== ' ' && empPhone != '' ){
            const existingEmployee = await Employee.findOne({ "Email": empEmail });
            if (existingEmployee) {
                console.log("if part")
                return res.status(400).json("Email already exists");
            }
           
            const newEmployee=new Employee(
                {
                    Employeename:empName,
                    EmployeeID:empId,
                    Email:empEmail,
                    Phone:empPhone
                });
                newEmployee.save()
                res.status(201).json("Employee Saved Succesfully")
        }else{
            console.log("elsePart")
            res.status(400).json("Missing Form Data");
        }
    } catch(error){
        console.log("error");
        res.status(500).json("Internal Server Error")
    }
    
})

app.get('/details',async(req,res)=>{
  
    const data=await Employee.find();
    res.json(data)
})

app.get('/details/:id',async(req,res)=>{
    
    const data = await Employee.find({"_id":req.params.id})
    res.json(data);
})

app.delete('/deleteemployee/:id', async (req, res) => {
   
	const result = await Employee.findByIdAndDelete(req.params.id);

	res.json({result});
});

app.put('/update/:id',async(req,res)=>{
    const {id}=req.params;
    const Empname=req.body.Employeename;
    const EmpID=req.body.EmployeeID;
    const Empemail=req.body.Email;
    const Empphone=req.body.Phone;
    try{
        const update=await Employee.findByIdAndUpdate(id,{
            Employeename:Empname,EmployeeID:EmpID,Email:Empemail,Phone:Empphone},{new:true});
        if(!update){
            return res.status(404).json({error:'EMployeeNotFound'})
        }

        res.status(200).json(update);
    }catch(error){
            console.log(error);
    }
})

app.listen(3001,()=>console.log("Server Listening at Port 3001"));
