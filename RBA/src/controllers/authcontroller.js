const user = require("../models/usermodel.js")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const register = async (req,res) => {
    const {username,password,role} = req.body;
}
const login = async (req,res) => {}

module.exports = {
    register,
    login,
};