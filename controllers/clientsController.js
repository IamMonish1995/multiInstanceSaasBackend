import { sendError, sendResult } from "../constant/HttpResponse.js";
import ClientsFunctions from "../models/Clients.js";
import ClientUsersFunctions from "../models/ClientUsers.js";
import OrganizationFunctions from "../models/Organizations.js";
import dotenv from "dotenv";

dotenv.config();
class ClientsController {
  //  save organization
  static saveClients = async (req, res) => {
    console.log("save Organization called");
    try {
      const {
        client_name,
        org_id,
        credits,
        payment_gateway_key,
        payment_gateway_secret,
        user_data,
      } = req.body;
      if (client_name) {
        const clients = await ClientsFunctions.getClients({
          client_name,
        });
        if (clients.length > 0) {
          sendError(
            res,
            "client_name Must be Unique",
            "client_name Name Already Exist"
          );
        } else {
          ClientsFunctions.CreateClient({
            client_name,
            org_id,
            credits,    
            payment_gateway_key,
            payment_gateway_secret,
            created_by_user_id: user_data.user._id,
          })
            .then(async (response) => {
              ClientUsersFunctions.CreateClientAdmin({
                client_id: response._id,
                user_id: user_data.user._id,
                created_by_user_id: user_data.user._id,
              }).then((orgUserResponse) => {
                sendResult(res, response, "Client Created");
              });
            })
            .catch((error) => {
              sendError(res, error, "Something Went Wrong");
            });
        }
      } else {
        sendError(
          res,
          "client name is a required parameter",
          "Something Went Wrong"
        );
      }
    } catch (error) {
      console.log(error);
      sendError(res, error, "Something Went Wrong");
    }
  };

  static getAllClients = async (req, res) => {
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

export default ClientsController;
