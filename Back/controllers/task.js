const Task = require('../models/task');

//Recuperer toutes les tâches
exports.getAllTasks = (req, res, next) => {
    Task.find()
    .then((tasks) => {
        res.status(200).json(tasks);
    })
    .catch((error) => {
        res.status(400).json({error});
    });
}

//Recuperer une tâche
exports.getOneTask = (req, res, next) => {
    Task.findOne({
        name: req.params.name
    })
    .then((task) => {
        return res.status(200).json(task);
    })
    .catch((error) => {
        return res.status(404).json({error});
    });
};

//Recuperer tâches d'un user

//créer un tâche
exports.createTask = (req, res, next) => {
    const taskObject = JSON.parse(req.body.sauce);
    delete taskObject._name;
    delete taskObject._creator;
    const currentDate = new Date();
    const todayDate = currentDate.getDate();
    const task = new Task({
        ...taskObject,
        creator: res.locals.auth.nickname,
        creationDate: todayDate,
        modificationDate: todayDate,
    });
    task.save()
    .then(() => {
        return res.status(201).json({message: 'task created succesfully.'});
    })
    .catch((error => {
        return res.status(400).json({error});
    }));
};

//Modifier une tâche
exports.modifyTask = (req, res, next) => {
    const taskObject = req.file ? {
        ...JSON.parse(req.body.task),
    } : {...req.body};
    delete taskObject._modificationDate;
    const currentDate = new Date();
    const todayDate = currentDate.getDate();
    Task.finOne({_name: req.params.name})
    .then((task) => {
        taskObject._modificationDate = todayDate;
        Task.updateOne({_name:req.params.id}, {...taskObject, _name: req.params.name})
        .then(() => res.status(200).json({message: 'Task modified.'}))
        .catch(error => res.status(401).json({error}))
    })
    .catch((error) => {
        res.status(400).json({error});
    });
};