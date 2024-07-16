import { Router } from "express";
import { getTask, getTasks, deletTask, createTask, updateTask } from "../controllers/tasks.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

import { validatorSchema } from "../middlewares/validator.midelware.js";
import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router();

router.get('/tasks', authRequired, getTasks) 
router.get('/tasks/:id', authRequired, getTask) 
router.post('/tasks', authRequired, validatorSchema(createTaskSchema), createTask) 
router.delete('/tasks/:id', authRequired, deletTask) 
router.put('/tasks/:id', authRequired, updateTask) 

export default router;