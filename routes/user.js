
const express = require('express');
const userController=require('../controller/user')
const router= express.Router()

router 

.get('/', userController.getAllUser)
.get('/:id', userController.getUser)
.put('/:id', userController.replaceUser)
.patch('/:id', userController.updateUser)
.delete('/:id', userController.deleteUser)
       

exports.router =router