import { sendError, sendResult } from "../constant/HttpResponse.js";
import jwt from "jsonwebtoken";
import { encryptJSON } from "../utils/encryptdecrypt.js";
import dotenv from "dotenv";
import db from "../schema/db.js";
import { CreateUser, getAllUsers } from "../models/Users.js";
import SystemUsersFunctions from "../models/SaasSystemUsers.js";
import { InitiatSetupWizard } from "../models/SetupWizard.js";
dotenv.config();

const expirationTime =
  Math.floor(Date.now() / 1000) + process.env.JWT_EXPIRE * 60; // 15 minutes

class AuthController {
  static getToken = async (req, res) => {
    const { external_user_id } = req.body;
    try {
      let user;
      let noOfUsers = await getAllUsers();
      if (noOfUsers?.length <= 0) {
        // first setup functions for static tables
        await InitiatSetupWizard();
        user = await CreateUser({ external_user_id });
        await SystemUsersFunctions.CreateSystemAdmin({
          user_id: user?._id,
        });
      } else {
        user = await db.UsersModal.findOne({ external_user_id });
        if (!user) {
          user = await CreateUser({ external_user_id });
          await SystemUsersFunctions.CreateSystemGuest({
            user_id: user._id,
          });
        }
      }
      const token = jwt.sign(
        { data: encryptJSON(user) },
        process.env.JWT_SECRET_KEY,
        { expiresIn: expirationTime }
      );
      sendResult(res, token, "Logged in");
    } catch (error) {
      sendError(res, error.message, "Loggin Failed");
    }
  };
}

export default AuthController;
