import { sendError, sendResult } from "../constant/HttpResponse.js";
import { decryptJSON, encryptJSON } from "../utils/encryptdecrypt.js";
import dotenv from "dotenv";
import { InitiatSetupWizard } from "../models/SetupWizard.js";
dotenv.config();

class DevController {
  static Encryptdata = async (req, res) => {
    const { data } = req.body;
    await encryptJSON(data)
      .then(async (encrypted_data) => {
        sendResult(res, encrypted_data, "success");
      })
      .catch((error) => {
        sendError(res, error, "Invalid Data");
      });
  };
  static Decryptdata = async (req, res) => {
    const { data } = req.body;
    await decryptJSON(data)
      .then(async (decrypted_data) => {
        sendResult(res, decrypted_data, "success");
      })
      .catch((error) => {
        sendError(res, error, "Invalid Data");
      });
  };

  static InitiatSetupWizard = async (req, res) => {
    try {
      await InitiatSetupWizard();
      sendResult(res, {}, "Imported data Successfully");
    } catch (error) {
      sendError(res, error.message, "Failed");
    }
  };
}

export default DevController;
