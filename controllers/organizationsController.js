import { sendError, sendResult } from "../constant/HttpResponse.js";
import {
  getAllOrganizationModel,
  saveOrganizationModel,
} from "../models/Organizations.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { encryptJSON } from "../utils/encryptdecrypt.js";
import dotenv from "dotenv";
import db from "../schema/db.js";

dotenv.config();
class OrganizationsController {
  //  save organization
  static saveOrganization = async (req, res) => {
    console.log("save Organization called");
    try {
      const {
        name,
        organization_domain,
        organization_no_of_products,
        website,
        logo,
        credits,
        active_plan,
        payment_gateway_key,
        payment_gateway_secret,
      } = req.body;
      if (name && adminemail && adminpassword) {
        const organization = await db.OrganizationModel.findOne({ adminemail });
        if (organization) {
          this.loginOrganization(req, res);
        } else {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(adminpassword, salt);
          saveOrganizationModel({
            name,
            organization_domain,
            organization_no_of_products,
            website,
            logo,
            credits,
            active_plan,
            payment_gateway_key,
            payment_gateway_secret,
          })
            .then(async (response) => {
              const organization = await db.OrganizationModel.findOne({
                adminemail,
              });
              const token = jwt.sign(
                { data: encryptJSON(organization, process.env.JWT_SECRET_KEY) },
                process.env.JWT_SECRET_KEY
              );
              res.cookie("token", token, { httpOnly: true });
              res.cookie("authenticated", true, { httpOnly: true });
              sendResult(res, token, "Logged in");
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
