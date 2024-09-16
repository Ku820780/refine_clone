const User = require('../models/user.model.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({})

const register = async (req, res) => {
    try {
        const {fullname, email, phoneNumber, password} = req.body;
        console.log(fullname, email, phoneNumber, password)
        if(!fullname || !email || !phoneNumber || !password){
            return res.status(400).json({
                message: "Something is Missing",
                success: false
            });
        };

        const profile = req.file.filename;

        const user = await User.findOne({ email });
        if(user){
            return res.status(400).json({
                message: "User already exists",
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            profile
        })

        return res.status(200).json({
            message: "Account created successfully...",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                message: "Incorrect Email and Password",
                success: false
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message: "Incorrect Email and Password",
                success: false
            });
        }

        const tokenData = {
            userId: user._id
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d'})

        const userInfo = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            profile: user.profile
        };

        return res.status(200)
            .cookie('token', token, {
                maxAge: 1 * 24 * 60 * 60 * 1000, //1 day
                httpOnly: true,
                sameSite: 'strict'
            })
            .json({
                message: `Welcome back ${userInfo.fullname}`,
                user: userInfo,
                success: true
            });

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    };
}

const getAllUser = async (req, res) => {
    try {
      // Get search parameters from the query string
      const { fullname, email, role, page = 1, limit = 10 } = req.query;
  
      // Convert page and limit to numbers
      const pageNumber = parseInt(page, 10);
      const limitNumber = parseInt(limit, 10);
  
      // Calculate how many documents to skip
      const skip = (pageNumber - 1) * limitNumber;
  
      // Build search filter dynamically based on query parameters
      const filter = {};
  
      if (fullname) {
        // Use regex for partial case-insensitive matching
        filter.fullname = { $regex: fullname, $options: 'i' };
      }
  
      if (email) {
        // Use regex for partial case-insensitive matching
        filter.email = { $regex: email, $options: 'i' };
      }
  
      if (role) {
        // Exact match for role
        filter.role = role;
      }
  
      // Fetch users with the search filter and apply pagination
      const users = await User.find(filter)
        .skip(skip)
        .limit(limitNumber);
  
      // Get the total number of matching users
      const totalUsers = await User.countDocuments(filter);
  
      // Send response with users and pagination info
      res.status(200).json({
        totalUsers,
        totalPages: Math.ceil(totalUsers / limitNumber),
        currentPage: pageNumber,
        users,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  };
  
const logout = (req, res) =>{
    try{
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message: "Logged out successfully.",
            success: true
        })
    }catch(error){
        console.log(error)
    }
}


module.exports = {register, login,getAllUser, logout}