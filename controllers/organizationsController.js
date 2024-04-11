import { sendError, sendResult } from "../constant/HttpResponse.js";
import {
  getAllOrganizationModel,
  saveOrganizationModel,
} from "../models/Organizations.js";

class OrganizationsController {
  //  save organization
  static saveOrganization = async (req, res) => {
    console.log("save Organization called");
    try {
      const { organizationname, adminemail, adminpassword, website, logo } =
        req.body;
      if (organizationname && adminemail && adminpassword) {
        saveOrganizationModel({
          organizationname,
          adminemail,
          adminpassword,
          website,
          logo,
        })
          .then((result) => {
            sendResult(res, result, "Data Saved");
          })
          .catch((error) => {
            sendError(res, error, "Something Went Wrong");
          });
      } else {
        sendError(res, "Organization-Name, Email and Password are a required parameter", "Something Went Wrong");
      }
    } catch (error) {
      sendError(res, error, "Something Went Wrong");
    }
  };
  static getAllOrganizations = async (req, res) => {
    console.log("get all Organization called");
    try {
      getAllOrganizationModel()
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

export default OrganizationsController;
