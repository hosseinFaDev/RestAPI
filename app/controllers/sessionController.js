const userModel = require('../models/userModel');
const getToken = require('../services/tokenService');

exports.newSession = async (req, res, next) => {
    try {
        const { email, mobile } = req.body;
        if (email == undefined || mobile == undefined || email == '' || mobile == '') {
            return res.status(400).send({
                message: "write your email and mobile number"
            })
        }
        const user = await userModel.findOne({email,mobile});
        console.log(user)
        if(!user){
            return res.status(404).send({
                message: "wrong email or mobile number"
            })
        }
        const token = getToken.sing(email);
        return res.status(201).send({
            code: 'ok',
            message: 'your token generated sucsessfully',
            token
        })
    } catch (error) {
        next(error);
    }
}