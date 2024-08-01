import { sendError, sendResult } from "../constant/HttpResponse.js";
import OrganizationFunctions from "../models/Organizations.js";
import OrganizationUsersFunctions from "../models/OrganizationUsers.js";
import { encryptJSON } from "../utils/encryptdecrypt.js";
import dotenv from "dotenv";

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
        user_data,
      } = req.body;
      if (name) {
        const organization = await OrganizationFunctions.getOrganization({
          name,
        });
        if (organization.length > 0) {
          sendError(
            res,
            "Name Must be Unique",
            "Organization Name Already Exist"
          );
        } else {
          OrganizationFunctions.saveOrganization({
            name,
            organization_domain,
            organization_no_of_products,
            website,
            logo,
            credits,
            active_plan,
            payment_gateway_key,
            payment_gateway_secret,
            created_by_user_id: user_data.user._id,
          })
            .then(async (response) => {
              OrganizationUsersFunctions.CreateOrganizationAdmin({
                org_id: response._id,
                user_id: user_data.user._id,
                created_by_user_id: user_data.user._id,
              }).then((orgUserResponse)=>{
                sendResult(res, response, "Organization Created");
              });
            })
            .catch((error) => {
              sendError(res, error, "Something Went Wrong");
            });
        }
      } else {
        sendError(
          res,
          "Organization-Name is a required parameter",
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
      OrganizationFunctions.getAllOrganization()
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
