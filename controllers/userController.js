const bcrypt = require("bcrypt");
const User = require("../models/User");

// signup route handler
exports.signup = async (req, res) => {
    try {
        // Get data
        const { first_name, last_name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        // secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error hashing password",
            });
        }

        // create a new user entry
        const user = await User.create({
            email,
            password_hash: hashedPassword,
            first_name,
            last_name,
            created_at: new Date(),
            last_login: null, 
            is_active: true,
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
            },
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again later.",
        });
    }
};
