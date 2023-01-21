const {Role} = require("./Model");

module.exports={
    addRole:(req,res)=>{
        if(res){
            const company = req.user.user.company;
         console.log(req.user)
            const roleData =  req.body.role.replace(/[&\/\\#,+_!^()$~%.'":*?<>{}\s]/g, "-")
            .toLowerCase();
            const role = new Role({...req.body,slug:roleData,company:company});
     console.log(role)
            role.save({ value: roleData}).then((result)=>{
              return res.status(200).json({
                  code :"CREATED",
                  data:result
              })
            }).catch((error)=>{
                console.log(error)  
                return res.json({
                    code : "ERROROCCURED",
                    data: error,
                })
            })
        }else{
        
            return res.status(401).json({
                code: "UNAUTHORIEDACTION"

            })
        }
     
    },
    getRole:(req,res)=>{
      if(res){
    Role.find().then((result)=>{
        return res.status(200).json({
            code :"FETCHED",
            data:result,
        })
    }).catch((error)=>{
        return res.status(400).json({
            code:"ERROROCCURED",
            data:error,
        })
    })
}
    },
    getRolebyId:(req,res)=>{
if(res){
    Role.find({_id:req.params.id}).then((result)=>{
        return res.status(200).json({
            code:"FETCHED",
            data:result
        })

    }).catch((error)=>{
        return res.status(200).json({
            code:"ERROROCCURED",
            data:error,
        })
    })
}
    }
}