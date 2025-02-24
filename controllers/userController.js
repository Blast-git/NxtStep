const bcrypt = require("bcrypt");
const User = require("../models/User");
const JWT = require("jsonwebtoken");


// signup route handler
exports.signup = async (req, res) => {
    try {
        // Get data
        const { first_name, last_name, email, password, role } = req.body;

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
            role,
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
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again later.",
        });
    }
};



exports.login = async(req,res)=>{
    try{
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            })
        }

        const user=await User.findOne({email});
        if(!email){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            })
        }
        const payload ={
            email:user.email,
            id:user._id,
            role:user.role
        }

        if(await bcrypt.compare(password,user.password_hash)){
            //password matched
            let token = JWT.sign(payload,
                                process.env.JWT_SECRET,
                                {
                                    expiresIn:process.env.JWT_EXPIRE
                                }
            )
            const userObj = user.toObject();
            userObj.token = token;
            userObj.password_hash = undefined;

            const options={
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true, //client side will not get access
            }
            return res.cookie("token", token , options).status(200).json({
                success:true,
                token,
                user:userObj,
                message:"Login Successfull",
            })

        }
        else{
            return res.status(403).json({
                success:false,
                message:"Please enter correct password"
            })
        }

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error logging in user",
        })
    }
}