import express from "express";
import { verifyToken } from "../middlewares/authentication.js";
import { updateProject,viewProject } from "../controllers/projectController.js";

const router = express.Router();

// Route to view a project
router.get('/:id',verifyToken,viewProject);


// Route to update a project
router.put('/:id',verifyToken,updateProject);

export default router;