import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const nicheSchema = new mongoose.Schema({
    firstNiche: String,
    secondNiche: String,
    thirdNiche: String,
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, "Must contain at least 3 characters"],
        maxLength: [30, "Must contain a maximum of 30 characters"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email."],
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    niche: nicheSchema,
    password: {
        type: String,
        required: true,
        minLength: [8, "Must contain at least 8 characters"],
        maxLength: [30, "Must contain a maximum of 30 characters"],
        select: false,
    },
    resume: {
        public_id: String,
        url: String,
    },
    coverLetter: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ["Job Seeker", "Employer"],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

export const User = mongoose.model("User", userSchema);
