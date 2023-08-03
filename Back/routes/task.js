const express = require('express');

const router = express.Router();
const taskController = require('../controllers/task');

router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.get('/:id', taskController.getOneTask);
router.put('/:id', taskController.modifyTask);
router.get('/:user_Id', taskController.getUserTasks);

module.exports = router;