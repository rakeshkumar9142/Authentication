import { projects } from "../data/projectData.js";
import { authorize } from "../middlewares/authorized.js";
import { canUpdateProject, canViewProject,} from "../polices/projectPolicies.js";
//Standardized response function

const handleResponse = (res,status,message,project=null) => {
  res.status(status).json({
    status,
    message,
    project,
  });
}

export const viewProject = (req,res) => {
   const projectID = parseInt(req.params.id);
   const project = getProjectById(projectID,res);
   console.log(`Project is : ${project}`);
   authorize(canViewProject,project)(req,res, () => {
     handleResponse(res,200,"Project retrieved successfully",project);

   });
};
export const updateProject = (req,res) => {
    const projectID = parseInt(req.params.id);
   const project = getProjectById(projectID,res);
   console.log(`Project is : ${project}`);
   authorize(canUpdateProject,project)(req,res,() => {
    handleResponse(res,200,"Project Updated successfully",project);
   })
}

const getProjectById = (id,res) => {
    const project = projects.find((projects) => project.id === id );
    if (!project) handleResponse(res,404,"Projetc not found")
    return project;
}