import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    //hash password before saving
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return next(createError(404, "User not found"));
    
    //compare userpasword and hash password in database
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
    if(!isPasswordCorrect) return next(createError(400, "Wrong password or username"));

    //generate a token
    const token = jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.JWT)

    const {password, isAdmin, ...otherDetails} = user._doc
    //save token in the cookie
    res.cookie("access_token", token,{httpOnly:true}).status(200).json({...otherDetails})

} catch (err) {
    next(err)
}
};
