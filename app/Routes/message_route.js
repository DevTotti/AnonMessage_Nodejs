const messageController = require('../Controllers/message_controller');
const express = require('express');
const checkAuth = require('../Middlewares/check-auth');

const router = express.Router();


router.post('/',checkAuth, messageController.getMessage);
router.post('/:username',messageController.createMessage);


module.exports = router;