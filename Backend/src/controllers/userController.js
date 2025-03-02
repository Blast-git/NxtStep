const bcrypt = require("bcrypt");
const User = require("../models/User");
const JWT = require("jsonwebtoken");
require("dotenv").config(); // Ensure dotenv is loaded

exports.signup = async (req, res) => {
    try {
        
        const { first_name, last_name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        // Secure password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user entry
        const user = await User.create({
            email,
            password_hash: hashedPassword,
            first_name,
            last_name,
            created_at: new Date(),
            last_login: null, 
            is_active: true,
            role,
        });

        const payload = { id: user._id, email: user.email, role: user.role };
        const token = JWT.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE || "2h",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                id: user._id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                created_at: user.created_at,
                is_active: user.is_active,
                role: user.role,
            },
            token,
        })


    } 
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again later.",
        })
    }
}



exports.login = async (req, res) => {
    try {
        const {email,password} = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(403).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Generate jwt token
        const payload = { id: user._id, email: user.email, role: user.role };
        const token = JWT.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE || "2h",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        });

        const userObj = user.toObject();
        delete userObj.password_hash;

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: userObj,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error logging in user",
        });
    }
}
