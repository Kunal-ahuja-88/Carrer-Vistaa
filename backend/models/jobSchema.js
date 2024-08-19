import mongoose from "mongoose"

const jobSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    jobType: {
        type: String,
        required: true,
        enum: ["Full-time", "Part-time"],
      },
    location : {
        type : String,
        required : true
    },
    companyName : {
        type : String,
        required : true
    },
    introduction : {
         type : String,
    },
    responsibilities : {
        type : String,
        required : true
    },
    offers : {
        type : String,
    },
    qualifications : {
        type : String,
        required : true
    },
    salary : {
        type : Number,
        required : true
    },
    hiringMultipleCandidates : {
        type : String,
        required : true,
        enum : ["Yes","No"],
    },
    personalWebsite : {
        type : String,
        required : true
    },
    jobNiche : {
        type : String,
        required : true
    },
    newsletterSent : {
        type : String,
        required : true
    },
    jobPostedOn : {
        type : Date,
        
    },
    postedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }

})

export const Job = mongoose.model("Job",jobSchema)