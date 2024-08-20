import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/userSchema.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"

export const register = asyncHandler(async (req, res, next) => {
    console.log("Received request to register a new user");

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

    console.log("Request body received:", req.body);

    // Check for required fields
    if ([name, email, phone, address, password, role].some((field) => field?.trim() === "")) {
        console.log("Validation failed: Missing required fields");
        throw new ApiError(400, "All fields are required");
    }

    if (role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)) {
        console.log("Validation failed: Missing niches for Job Seeker role");
        throw new ApiError(400, "Select valid niches");
    }

    // Check if the user already exists
    const existingUser = await User.findOne({
        $or: [{ name }, { email }]
    });
    if (existingUser) {
        console.log("Validation failed: User with the same name or email already exists");
        throw new ApiError(400, "User with the same name or email already exists");
    }

    const userData = {
        name,
        email,
        phone,
        address,
        password,
        role,
        niche: {
            firstNiche,
            secondNiche,
            thirdNiche,
        },
        coverLetter,
    };

      // Handle file upload
      const resumePath = req.files?.resume[0]?.path;

      if (!resumePath) {
          throw new ApiError(400, "Resume file is required")
      }
  
      const resume = await uploadOnCloudinary(resumePath)
  
      if(!resume) {
          throw new ApiError(400, "Resume file is not uploaded")
      }
  
      userData.resume = {
          public_id: resumePath.public_id,
          url: resumePath.url,
        };
  
  

    // Create the user in the database
    try {
        const user = await User.create(userData);
        console.log("User successfully created:", user);

        const createdUser = await User.findById(user._id).select("-password");
        console.log("Created user (excluding password):", createdUser);

        if (!createdUser) {
            console.log("Failed to retrieve the created user");
            throw new ApiError(500, "Something went wrong while registering the user");
        }

        return res.status(201).json(
            new ApiResponse(200, createdUser, "User registered successfully")
        );
    } catch (error) {
        console.error("Error during user creation:", error);
        throw new ApiError(500, "Failed to register user");
    }
});
























