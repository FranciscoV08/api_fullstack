import Task from '../models/task_model.js'

// obtenes tareas y como se que sera una consulta a la db necesito que sea asincrona 
export const getTasks = async (req, res) => {
    // busca todas las tareas  
    const tasks = await Task.find({
        user: req.user.id
    })
    // console.log()
    res.json(tasks);
}

export const createTask = async (req, res) => {
    const { title, description, date} = req.body;
    const newTask = new Task({
        title,
        description,
        date, 
        user: req.user.id
    })
    const saveTask = await newTask.save()
    res.json(saveTask)
}

export const getTask = async (req, res) => {
    try {        
        const task = await Task.findById(req.params.id).populate('user'); 
        if(!task ) return res.status(404).json({"message" : 'Tarea no encontrada'})
        res.json(task)
    } catch (error) {
        res.status(400).json({message: "Task Not found"})
        // console.log(error)
    }
}

export const deletTask = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id)
    if(!task ) return res.status(404).json({"message" : 'Tarea no encontrada e eliminada'})
    res.sendStatus(204);
}

export const updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        // devuelveme mi dato nuevo 
        new:true 
    })
    if(!task ) return res.status(404).json({"message" : 'Tarea no encontrada'})
    res.json(task)
}
// Tengo que hacer el trycatch