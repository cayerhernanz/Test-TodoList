//Model de tâche
const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    name: {type: String, required: true},
    category: {type: String, required: true},
    priority: {type: String, required: true},
    creationDate: {type: Number, required: true},
    modificationDate: {type: Number},
    endDate: {type: Number, required: true},
    creator: {type: String, required: true},
    description: {type: String, required: true},
    assignedTo: {type: [String]},
});

module.exports = mongoose.model('Sauce', taskSchema);