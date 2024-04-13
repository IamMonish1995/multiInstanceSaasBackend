import { sendError, sendResult } from "../constant/HttpResponse.js";
import OrganizationModel, {
  getAllOrganizationModel,
  saveOrganizationModel,
} from "../models/Organizations.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { encryptJSON } from "../utils/encryptdecrypt.js";
import dotenv from "dotenv";
dotenv.config();
class OrganizationsController {
  //  save organization
  static saveOrganization = async (req, res) => {
    console.log("save Organization called");
    try {
      const {
        organizationname,
        adminemail,
        adminpassword,
        website,
        logo,
        organizationdomain,
        organizationnoofproducts,
      } = req.body;
      if (organizationname && adminemail && adminpassword) {
        const organization = await OrganizationModel.findOne({ adminemail });
        if (organization) {
          // res.send({ status: "failed", message: "Email already exists" });
          this.loginOrganization(req, res);
        } else {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(adminpassword, salt);
          saveOrganizationModel({
            organizationname,
            adminemail,
            adminpassword: hashPassword,
            website,
            logo,
            organizationdomain,
            organizationnoofproducts,
          })
            .then(async (response) => {
              const organization = await OrganizationModel.findOne({
                adminemail,
              });
              const token = jwt.sign(
                { data: encryptJSON(organization, process.env.JWT_SECRET_KEY) },
                process.env.JWT_SECRET_KEY
              );
              res.cookie("token", token, { httpOnly: true });
              res.cookie("authenticated", true, { httpOnly: true });
              sendResult(res, token, "Logged in");
              // res.redirect("/dashboard"); // Redirect to dashboard
            })
            .catch((error) => {
              sendError(res, error, "Something Went Wrong");
            });
        }
      } else {
        sendError(
          res,
          "Organization-Name, Email and Password are a required parameter",
          "Something Went Wrong"
        );
      }
    } catch (error) {
      console.log(error);
      sendError(res, error, "Something Went Wrong");
    }
  };
  static loginOrganization = async (req, res) => {
    try {
      const { adminemail, adminpassword } = req.body;
      if (adminemail && adminpassword) {
        const organization = await OrganizationModel.findOne({ adminemail });
        if (organization != null) {
          const isMatch = await bcrypt.compare(
            adminpassword,
            organization.adminpassword
          );
          if (organization.adminemail === adminemail && isMatch) {
            const token = jwt.sign(
              { data: encryptJSON(organization) },
              process.env.JWT_SECRET_KEY
            );

            res.cookie("token", token, { httpOnly: true });
            res.cookie("authenticated", true, { httpOnly: true });
            sendResult(res, token, "Logged in");
            // res.redirect("/dashboard"); // Redirect to dashboard
          } else {
            res.send({
              status: "failed",
              message: "Email or Password is not Valid",
            });
          }
        } else {
          res.send({
            status: "failed",
            message: "You are not a Registered User",
          });
        }
      } else {
        res.send({ status: "failed", message: "All Fields are Required" });
      }
    } catch (error) {
      console.log(error);
      res.send({ status: "failed", message: "Unable to Login" });
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
