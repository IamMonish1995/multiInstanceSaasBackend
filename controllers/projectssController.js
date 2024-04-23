import { sendError, sendResult } from "../constant/HttpResponse.js";

import dotenv from "dotenv";
import { getAllProjectsByOrgIdModal, getAllProjectsModel, saveProjectsModel } from "../models/Projects.js";
dotenv.config();

class ProjectsController {
  static saveProject = async (req, res) => {
    console.log("save Project called");
    try {
      const {
        name,
        orgid,
        description,
        gitsourcefeurl,
        feframework,
        gitsourcebeurl,
        beframework,
        feenv,
        beenv,
        gitsourcetype,
        creditneeded
      } = req.body;
      if (name && orgid && gitsourcefeurl && feframework && gitsourcetype) {
        saveProjectsModel({
          name,
          orgid,
          description,
          gitsourcefeurl,
          feframework,
          gitsourcebeurl,
          beframework,
          gitsourcetype,
          creditneeded,
          feenv,
          beenv,
        })
          .then(async (response) => {
            sendResult(res, response, "Record Saved");
          })
          .catch((error) => {
            sendError(res, error, "Something Went Wrong");
          });
      } else {
        sendError(
          res,
          "Project-Name,Organization,gitsourcefeurl,feframework and gitsourcetype are a required parameter",
          "Something Went Wrong"
        );
      }
    } catch (error) {
      console.log(error);
      sendError(res, error, "Something Went Wrong");
    }
  };

  static getAllProjects = async (req, res) => {
    console.log("get all Projects called");
    try {
      getAllProjectsModel()
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
  static getAllProjectsByOrgId = async (req, res) => {
    const { orgid } = req.query;
    console.log("get all Instances called");
    try {
      getAllProjectsByOrgIdModal(orgid)
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

export default ProjectsController;
