
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
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
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
        res.status(500).json({ message: 'Something went wrong', error });
    }
};
