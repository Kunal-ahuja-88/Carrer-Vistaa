import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/userSchema.js";
import {v2 as cloudinary} from "cloudinary";

export const register = asyncHandler(async(req,res,next) => {
        const {
            name,
            email,
            phone,
            address,
            password,
            role,
            firstNiche,
            secondNiche,
            thirdNiche,
            coverLetter,
        } = req.body;

        if(
            [name , email , phone , address , password , role].some((field) => field?.trim()==="")
        ) {
            throw new ApiError(400,"All fields are required")
        }
       
        if (role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)) {
           throw new ApiError(400,"Select valid niche")
          }

          const existingUser = await User.findOne({
            $or : [{name} , {email}]
          })
     
          if(existingUser) {
            throw new ApiError(400,"User with name or email already exists")
          }

          const userData = {
            name,
            email,
            phone,
            address,
            password,
            role,
            niches: {
              firstNiche,
              secondNiche,
              thirdNiche,
            },
            coverLetter,
          };

         if(req.files && req.files.resume) {
          const {resume} = req.files;

          if(resume) {
            try {
              const cloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath,
                {folder : "Job_Seekers_Resume"}
              )
             
              if(!cloudinaryResponse || cloudinaryResponse.error) {
                throw new ApiError(500,"Failed to upload resume")
              }

              userData.resume = {
                public_id : cloudinaryResponse.public_id,
                url : cloudinaryResponse.url
              }

            } catch (error) {
              throw new ApiError(500,"Failed to uplaod resume")
            }
          }
         }
         
        const user = await User.create(userData);

        const createdUser = await User.findById(user._id).select(
          "-password"
      )
  
      if (!createdUser) {
          throw new ApiError(500, "Something went wrong while registering the user")
      }
  
      return res.status(201).json(
          new ApiResponse(200, createdUser, "User registered Successfully")
      )

})
