
// import User from '../models/user.model.js'
// import bcryptjs from 'bcryptjs';

// export const signup =async(req,res)=>{
//     const {username,email,password}=req.body;
//     const hashPassword = bcryptjs.hashSync(password, 10);
//     const newUser = new User({username,email,password})
//     await newUser.save()
//     res.status(201).json({message:'user created successfully'})
    
// }

import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'

export const signup = async (req, res,next) => {
    const { username, email, password } = req.body;

    try {
        const hashPassword = bcryptjs.hashSync(password, 10); // hash the password
        const newUser = new User({
            username,
            email,
            password: hashPassword // ✅ use hashed password here
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found!'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

