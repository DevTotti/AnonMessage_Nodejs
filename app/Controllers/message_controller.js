const mongoose = require('mongoose');
const Message = require('../Models/message_model');


const createMessage = ((req, res) => {
    const username = req.params.username;
    Message.findOne({username:username})
        .then((user) => {
            const anonMessage = new Message({
                username: username,
                message: req.body.message
            });

            console.log(anonMessage);
            anonMessage.save()
                .then((result) => {
                    console.log('Anonymous message saved!');
                    res.json({
                        error: false,
                        message: 'Anon message saved'
                    });
                })
                .catch((err) => {
                    console.log('Error saving data');
                    res.json({
                        error: true,
                        message: 'Error saving data'
                    });
                });
        })
        .catch((err) => {
            console.log('User with username not found');
            res.json({
                error: true,
                message: 'User with username not found'
            });
        });
    
});


const getMessage = ((req, res) => {
    const username = req.username;
    Message.find({username: username})
        .then((messages) => {
            console.log('User messages fetched!');
            res.json({
                error: false,
                message: 'messages fetched!',
                messages: messages
            });
        })
        .catch((err) => {
            console.log('Error No message for user!');
            res.json({
                error: true,
                message: 'No message!'
            });
        });
});


module.exports = {
    createMessage,
    getMessage
}