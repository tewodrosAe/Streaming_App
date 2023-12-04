const User = require("../models/UserModel");
const jwt = require('jsonwebtoken')

const createToken = (email) => {
  return jwt.sign({email},process.env.JWT_SECRET,{expiresIn: '3d'})
}
const createUser = async(req,res) => {
  console.log('here')
  const {email} = req.body
  console.log(email)
  try{
    const user = await User.create({email})
    const token = createToken(email)
    res.status(200).json({token})
  }catch(e){
    res.status(400).json({error: e})
  }
}
const loginUser = async(req,res) => {
  const {email} = req.body
  const exists = await User.exists({email})
  if(exists){
    const token = createToken(email)
    res.status(200).json({token})
  }else{
    res.status(400).json({error: 'User does not exist'})
  }
}
const getUser = async (req, res) => {
  const {email} = req.user
  try{
    const user = await User.findOne({email})
    res.status(200).json(user)
  }catch(e){
    res.status(400).json({error:e})
  }
};

const addToLikedMovies = async (req, res) => {
  const { email } = req.user
  const { data } = req.body
  try {
    const user = await User.find({email,'likedMovies.id' : data.id});
    if (user.length > 0) {
      res.status(400).json({error: 'It is Already in your liked list'})
    }else{
      const updated = await User.findOneAndUpdate(
        {email: email},
        {$push : {likedMovies: data}},
        {new:true}
      )
      res.status(200).json(updated)
    }}catch(e){
      res.status(400).json({error:e})
    }
};

const removeFromLikedMovies = async (req, res) => {
  const { email } = req.user
  const { id } = req.body
  try {
    const user = await User.find({email,'likedMovies.id' : id});
    if (user.length <= 0) {
      res.status(400).json({error: 'It is not in your liked list'})
    }else{
      const updated = await User.findOneAndUpdate(
        {email: email},
        {$pull : {likedMovies: {id: id}}},
        {new: true}
      )
      res.status(200).json(updated)
    }}catch(e){
      res.status(400).json({error:e})
    }
};
const addToWatchList = async (req, res) => {
  const { email } = req.user
  const { data } = req.body
  try {
    const user = await User.find({email,'watchList.id' : data.id});
    if (user.length > 0) {
      res.status(400).json({error: 'It is Already in your liked list'})
    }else{
      const updated = await User.findOneAndUpdate(
        {email: email},
        {$push : {watchList: data}},
        {new:true}
      )
      res.status(200).json(updated)
    }}catch(e){
      res.status(400).json({error:e})
    }
};

const removeFromWatchList = async (req, res) => {
  const { email } = req.user
  const { id } = req.body
  try {
    const user = await User.find({email,'watchList.id' : id});
    if (user.length <= 0) {
      res.status(400).json({error: 'It is not in your liked list'})
    }else{
      const updated = await User.findOneAndUpdate(
        {email: email},
        {$pull : {watchList: {id: id}}},
        {new: true}
      )
      res.status(200).json(updated)
    }}catch(e){
      res.status(400).json({error:e})
    }
};
module.exports = {
  createUser,
  getUser,
  addToLikedMovies,
  removeFromLikedMovies,
  addToWatchList,
  removeFromWatchList,
  loginUser
}