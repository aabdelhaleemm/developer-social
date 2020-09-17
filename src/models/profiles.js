const mongoose = require('mongoose');

const profileSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    status:{
        required:true,
        type:String
    },
    company:{
        type:String
    },
    website:{
        type:String
    },
    location:{
        type:String
    },
    skills:{
        type:[String],
        required:true
    },
    bio:{
        type:String
    },
    githubusername:{
        type:String
    },
    experince :[{
        title:{
            type:String,
            required:true
        },
        company:{
            type:String,
            required:true
        },
        from:{
            type:Date
        },
        to:{
            type: Date , Boolean
        }

    }]

})


const profiles=mongoose.model('profiles',profileSchema)
module.exports=profiles