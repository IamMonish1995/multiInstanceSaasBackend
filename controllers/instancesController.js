import { sendError, sendResult } from "../constant/HttpResponse.js";

import dotenv from "dotenv";
import {
  getAllInstancesModel,
  getAllInstancesModelByProjectId,
  saveInstancesModel,
} from "../models/Instances.js";
import { createVercelProject, deployVercelProject } from "./vercelapicalls.js";
import { getProjectModelById } from "../models/Projects.js";
import { extractOwnerAndRepoName } from "../utils/repoextraction.js";
dotenv.config();
class InstancesController {
  //  save instance
  static saveInstance = async (req, res) => {
    console.log("save instance called");
    try {
      const { name, projectid } = req.body;
      if (name && projectid) {
        const projectData = await getProjectModelById(projectid);
        if (projectData.creditneeded > req.organizationData.credits) {
          saveInstancesModel({
            name,
            projectid,
          })
            .then(async (response) => {
              if (projectData.gitsourcebeurl) {
                const { ownerName, repoName } = extractOwnerAndRepoName(
                  projectData.gitsourcebeurl
                );
                const dataSetBEProject = {
                  name: (name + "-" + projectData.name)
                    .replace(/\s+/g, "")
                    .toLowerCase(),
                  gitRepository: {
                    repo: ownerName + "/" + repoName,
                    type: projectData.gitsourcetype,
                  },
                  environmentVariables: [
                    {
                      type: "plain",
                      key: "database_name",
                      target: "production",
                      value: (name + projectData.name)
                        .replace(/\s+/g, "")
                        .toLowerCase(),
                    },
                  ],
                };
                await createVercelProject(dataSetBEProject).then(
                  async (backendProject) => {
                    console.log({backendProject});
                    if (backendProject.id) {
                      const dataSetBEDeployment = {
                        name: "instant-deployment",
                        project: backendProject.id,
                        target: "production", // Specify the target environment
                        gitSource: {
                          owner: ownerName,
                          repo: repoName,
                          ref: "main",
                          type: projectData.gitsourcetype,
                          repoId: backendProject.link.repoId,
                        },
                      };
                      await deployVercelProject(dataSetBEDeployment).then(
                        (backendProjectDeploy) => {
                          console.log({ backendProjectDeploy });
                        });
                    }
                  }
                );
                
              } else {
                // only frontend project
              }

              sendResult(res, response, "Record Saved");
            })
            .catch((error) => {
              console.log(error);
              sendError(res, error, "Something Went Wrong");
            });
        } else {
          sendError(res, "Not Enough Credits", "Something Went Wrong");
        }
      } else {
        sendError(
          res,
          "Instance-Name and Project are a required parameter",
          "Something Went Wrong"
        );
      }
    } catch (error) {
      console.log(error);
      sendError(res, error, "Something Went Wrong");
    }
  };

  static getAllInstances = async (req, res) => {
    console.log("get all Instances called");
    try {
      getAllInstancesModel()
        .then((result) => {
          sendResult(res, result, "Data retrived");
        })
        .catch((error) => {
          console.log(error);
          sendError(res, error, "Something Went Wrong");
        });
    } catch (error) {
      console.log(error);
      sendError(res, error, "Something Went Wrong");
    }
  };
  static getAllInstancesByProjectId = async (req, res) => {
    const { projectid } = req.query;

    console.log("get all Instances called");
    try {
      getAllInstancesModelByProjectId(projectid)
        .then((result) => {
          sendResult(res, result, "Data retrived");
        })
        .catch((error) => {
          console.log(error);
          sendError(res, error, "Something Went Wrong");
        });
    } catch (error) {
      console.log(error);
      sendError(res, error, "Something Went Wrong");
    }
  };
}

export default InstancesController;
