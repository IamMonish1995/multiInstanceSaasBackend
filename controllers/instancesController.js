import { sendError, sendResult } from "../constant/HttpResponse.js";

import dotenv from "dotenv";
import {
  deleteInstancesModel,
  getAllInstancesModel,
  getAllInstancesModelByProjectId,
  getInstanceModelById,
  saveInstancesModel,
  updateInstancesModel,
} from "../models/Instances.js";
import {
  createVercelProject,
  deleteVercelProject,
  deployVercelProject,
} from "./vercelapicalls.js";
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
        if (projectData) {
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
                    name: (name + "-" + projectData.name + "-" + "backend")
                      .replace(/\s+/g, "")
                      .toLowerCase(),
                    gitRepository: {
                      repo: ownerName + "/" + repoName,
                      type: projectData.gitsourcetype,
                    },
                    environmentVariables: [
                      ...projectData?.beenv,
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
                  // backend project created
                  await createVercelProject(dataSetBEProject).then(
                    async (backendProject) => {
                      if (backendProject.id) {
                        let updatedData = {
                          plateformprojectbeid: backendProject.id,
                          beurl: (
                            "https://" +
                            name +
                            "-" +
                            projectData.name +
                            "-" +
                            "backend.vercel.app"
                          ).toLowerCase(),
                          creditcharged: projectData.creditneeded,
                          status: "becreated",
                          plateformgitberepoid: backendProject.link.repoId,
                        };
                        updateInstancesModel(response._id, updatedData);

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
                        // backend project deploy
                        await deployVercelProject(dataSetBEDeployment).then(
                          async (backendProjectDeploy) => {
                            if (backendProjectDeploy.id) {
                              let updatedData = {
                                plateformdeploymentbeid:
                                  backendProjectDeploy.id,
                                status: "bedeployed",
                              };
                              updateInstancesModel(response._id, updatedData);

                              // frontend project
                              const { ownerName, repoName } =
                                extractOwnerAndRepoName(
                                  projectData.gitsourcefeurl
                                );
                              const dataSetFEProject = {
                                name: (
                                  name +
                                  "-" +
                                  projectData.name +
                                  "-" +
                                  "frontend"
                                )
                                  .replace(/\s+/g, "")
                                  .toLowerCase(),
                                gitRepository: {
                                  repo: ownerName + "/" + repoName,
                                  type: projectData.gitsourcetype,
                                },
                                framework: projectData.feframework,
                                environmentVariables: [
                                  ...projectData.feenv,
                                  {
                                    type: "plain",
                                    key: "NEXT_PUBLIC_BACKEND_API",
                                    target: "production",
                                    value: (
                                      "https://" +
                                      name +
                                      "-" +
                                      projectData.name +
                                      "-" +
                                      "backend.vercel.app"
                                    ).toLowerCase(),
                                  },
                                ],
                              };
                              // project Created
                              await createVercelProject(dataSetFEProject).then(
                                async (frontendProject) => {
                                  if (frontendProject.id) {
                                    let updatedData = {
                                      plateformprojectfeid: frontendProject.id,
                                      feurl: (
                                        "https://" +
                                        name +
                                        "-" +
                                        projectData.name +
                                        "-" +
                                        "frontend.vercel.app"
                                      ).toLowerCase(),
                                      status: "fecreated",
                                      plateformgitrepofeid:
                                        frontendProject.link.repoId,
                                    };
                                    updateInstancesModel(
                                      response._id,
                                      updatedData
                                    );

                                    const dataSetFEDeployment = {
                                      name: "instant-deployment",
                                      project: frontendProject.id,
                                      target: "production", // Specify the target environment
                                      gitSource: {
                                        owner: ownerName,
                                        repo: repoName,
                                        ref: "main",
                                        type: projectData.gitsourcetype,
                                        repoId: frontendProject.link.repoId,
                                      },
                                    };
                                    // frontend project deployed
                                    await deployVercelProject(
                                      dataSetFEDeployment
                                    ).then((frontendProjectDeploy) => {
                                      if (frontendProjectDeploy.id) {
                                        let updatedData = {
                                          plateformdeploymentfeid:
                                            frontendProjectDeploy.id,
                                          status: "fedeployed",
                                        };
                                        updateInstancesModel(
                                          response._id,
                                          updatedData
                                        );
                                      }
                                    });
                                  }
                                }
                              );
                            }
                          }
                        );
                      }
                    }
                  );
                } else {
                  // only frontend project
                }
                let finalResponse = await getInstanceModelById(response._id);
                sendResult(res, finalResponse, "Record Saved");
              })
              .catch((error) => {
                console.log(error);
                sendError(res, error, "Something Went Wrong");
              });
          } else {
            sendError(res, "Not Enough Credits", "Something Went Wrong");
          }
        } else {
          sendError(res, "Project Not Found", "Something Went Wrong");
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
  static deleteInstance = async (req, res) => {
    console.log("delete instance called");
    try {
      const { instanceID } = req.body;
      const instanceData = await getInstanceModelById(instanceID);
      if (instanceData) {
        await deleteVercelProject(instanceData.plateformprojectbeid);
        await deleteVercelProject(instanceData.plateformprojectfeid);

        deleteInstancesModel({
          instanceID,
        })
          .then(async (response) => {
            sendResult(res, response, "Record deleted");
          })
          .catch((error) => {
            console.log(error);
            sendError(res, error, "Something Went Wrong");
          });
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
