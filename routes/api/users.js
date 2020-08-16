const express = require('express');
const { builtinModules } = require('module');
const router = express.Router();
const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const auth = require ('../../middleware/auth');

router.route('/login')
    .post(async (req, res) => {
        const { email, password } = req.body;
        isUser = await userModel.findOne({email: email});
        if (!isUser) {
            return res.status(401).json({msg: "Wrong email"});
        }
        const isMatch = await bcrypt.compare(password, isUser.password);
        if (!isMatch) {
            return res.status(401).json({msg: "Wrong password"});
        }
        const token = await jwt.sign({id: isUser._id}, process.env.JWT_SECRET);
        return res.json({
            token,
            user: {
                id: isUser._id,
                name: isUser.name,
                email: isUser.email,
            }
        });
    });

router.route('/register')
    .post(async (req, res) => {
        const { name, email, password } = req.body;
        const isUser = await userModel.findOne({email: email});
        console.log(isUser);
        if (isUser) {
            return res.json({msg: "User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const passHash = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            name, 
            email,
            password: passHash
        });
        const savedUser = await newUser.save();
        return res.json(savedUser);
    });

router.route('/isValidToken') 
    .post(async (req, res) => {
        try {
            const token = req.header("x-auth-token");
            if (!token) {
                return res.json(false);
            }
            const isValid = jwt.verify(token, process.env.JWT_SECRET);
            if (!isValid) {
                return res.json(false);
            }
            const isUser = await userModel.findById(isValid.id);
            if (!isUser) {
                return res.json(false);
            }
            return res.json(true);
        } catch (err) {
            return res.json({err: err.message});
        }
    })

router.route('/addClass') 
    .post(auth, async (req, res) => {
        try {
            const id = req.user;
            console.log(id);
            const course = {
                name: req.body.course,
                _id: id
            }
            console.log(course);
            const response = await userModel.updateOne({_id: req.user}, {$addToSet: {classes: course}});

            return res.json(response.nModified);
        } catch (err) {
            return res.json({err: err.message});
        }
    })

router.route('/getUser')
    .post(auth, async(req, res) => {
        try {
            const user = await userModel.findById(req.user);
            const result = {
                name: user.name,
                email: user.email,
                class: user.classes
            }
            return res.json(result);
        } catch (err) {
            return res.json({err: err.message});
        }
    })
module.exports = router;
