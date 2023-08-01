const express = require('express');

const router = express.Router();
const taskController = require('../controllers/task');

router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.get('/:name', taskController.getOneTask);
router.put('/:name', taskController.modifyTask);

module.exports = router;