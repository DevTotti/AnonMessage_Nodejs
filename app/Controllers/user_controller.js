const User = require('../Models/user_model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// env
const JWT_SECRET = process.env.JWT_SECRET;


//controller

const signUp = ((req, res) => {
    if (!req.body.username){
        return res.json({
            error: true,
            message: 'Fill all required fields'
        });
    }

    let username = req.body.username;
    User.findOne({username})
        .then((result) => {
            if (result){
                return res.json({
                    error: true,
                    message: 'A user with same username exists'
                });
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hpass) => {
                    if (err){
                        return res.json({
                            error: true,
                            message: err.message
                        })
                    }
                    else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId,
                            username: req.body.username,
                            password: hpass
                        })
                        user.save()
                            .then((user) => {
                                res.json({
                                    error: false,
                                    message: 'User created!'
                                })
                            })
                            .catch((err) => {
                                console.log(err.message);
                                res.json({
                                    error: true,
                                    message: err.message
                                });
                            });
                    }
                });
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.json({
                error: true,
                message: err.message
            });
        });
});



const signIn = ((req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (!username){
        return res.json({
            error: true,
            message: 'Invalid fields'
        });
    }
    User.findOne({username})
        .then((user) => {
            if (!user){
                return res.json({
                    error: true,
                    message: 'User with username does not exist'
                });
            }
            else {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err){
                        return res.json({
                            error: true,
                            message: 'Authenticatication failed'
                        });
                    }
                    if (result) {
                        const token = jwt.sign({
                            username: user.username,
                            userID: user._id
                        }, JWT_SECRET, {
                            expiresIn: "2h"
                        });
                        console.log(token);

                        return res.status(200).cookie('auth',token).json({
                            error: false,
                            userId: user._id,
                            message: 'You logged in successfully!',
                            token: token

                        });
                    }
                    else{
                        return res.json({
                            error: true,
                            message: 'Incorrect password'
                        })
                    }
                })
            }
        })
        .catch((err) => {
            console.log('Error occured');
            res.json({
                error: true,
                message: err.message
            });
        });
});


const getUsers = ((req, res) => {
    User.find()
        .then((users) => {
            console.log('Users data fetched!');
            res.json({
                error: false,
                message: 'Users data fetched',
                data: users
            });
        })
        .catch((err) => {
            console.log('Error fecthing users data');
            res.json({
                error: true,
                message: 'Error fecthing users data',
                response: err.message
            })
        })
})


module.exports = {
    signUp,
    signIn,
    getUsers
}
