import { sendError, sendResult } from "../constant/HttpResponse.js";
import jwt from "jsonwebtoken";
import { decryptJSON, encryptJSON } from "../utils/encryptdecrypt.js";
import dotenv from "dotenv";
import db from "../schema/db.js";
import { CreateUser, getAllUsers } from "../models/Users.js";
import SystemUsersFunctions from "../models/SaasSystemUsers.js";
import { InitiatSetupWizard } from "../models/SetupWizard.js";
import OrganizationUsersFunctions from "../models/OrganizationUsers.js";
import ClientUsersFunctions from "../models/ClientUsers.js";
import UserAccessFunctions from "../models/UserAccess.js";
import MenusFunctions from "../models/Menus.js";
import rolesFunctions from "../models/Roles.js";
dotenv.config();

const expirationTime =
  Math.floor(Date.now() / 1000) + process.env.JWT_EXPIRE * 60; // 15 minutes

class AuthController {
  static getUser = async (req, res) => {
    const { external_user_id } = req.body;
    decryptJSON(external_user_id)
      .then(async (decrypted_external_user_id) => {
        try {
          let user;
          let userProfiles;
          let noOfUsers = await getAllUsers();
          if (noOfUsers?.length <= 0) {
            // first setup functions for static tables
            await InitiatSetupWizard();
            // create user
            user = await CreateUser({
              external_user_id: decrypted_external_user_id,
            });
            // create admin
            await SystemUsersFunctions.CreateSystemAdmin({
              user_id: user?._id,
            });
          } else {
            user = await db.UsersModal.findOne({
              external_user_id: decrypted_external_user_id,
            });
            if (!user) {
              user = await CreateUser({
                external_user_id: decrypted_external_user_id,
              });
              await SystemUsersFunctions.CreateSystemGuest({
                user_id: user._id,
              });
            }
          }
          // fetch profiles
          let systemProfiles = await SystemUsersFunctions.getSystemUsersList({
            user_id: user._id,
          });
          let organizationProfiles =
            await OrganizationUsersFunctions.getOrganizationUsersList({
              user_id: user._id,
            });
          let clientProfiles = await ClientUsersFunctions.getClientUsersList({
            user_id: user._id,
          });
          userProfiles = {
            systemProfiles,
            organizationProfiles,
            clientProfiles,
          };
          encryptJSON({ user, userProfiles })
            .then((encrypteddata) => {
              const token = jwt.sign(
                { data: encrypteddata },
                process.env.JWT_SECRET_KEY,
                { expiresIn: expirationTime }
              );
              sendResult(res, token, "Logged in");
            })
            .catch((err) => {
              sendError(res, err, "Loggin Failed");
            });
        } catch (error) {
          sendError(res, error.message, "Loggin Failed");
        }
      })
      .catch((error) => {
        sendError(res, error, "Invalid Data");
      });
  };
  static getProfileConfig = async (req, res) => {
    const { external_role_id } = req.body;
    decryptJSON(external_role_id)
      .then(async (decrypted_external_role_id) => {
        try {
          let access = await UserAccessFunctions.FindUserAccessList({
            role_id: decrypted_external_role_id,
          });
          sendResult(res, access, "Fetch Config");
        } catch (error) {
          sendError(res, error.message, "Fetch Config Failed");
        }
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
  static getAllMenus = async (req, res) => {
    try {
      MenusFunctions.getAllMenus().then((menus) => {
        sendResult(res, menus, "Fetched data Successfully");
      });
    } catch (error) {
      sendError(res, error.message, "Failed");
    }
  };
  static getAllRoles = async (req, res) => {
    try {
      rolesFunctions.getAllRoles().then((roles) => {
        sendResult(res, roles, "Fetched data Successfully");
      });
    } catch (error) {
      sendError(res, error.message, "Failed");
    }
  };
  static saveNewRole = async (req, res) => {
    try {
      const { name, assessList } = req.body;
      // save new role
      rolesFunctions.CreateRole({ role_name: name }).then(async (role) => {
        // save multiple access
        await UserAccessFunctions.CreateMultipleUserAccess(
          role._id,
          assessList
        );
        sendResult(res, role, "Role Saved Successfully");
      });
    } catch (error) {
      sendError(res, error.message, "Failed");
    }
  };
  static updateRole = async (req, res) => {
    try {
      const { assessList, role_id, name } = req.body;
      // update role
   const role = await rolesFunctions.UpdateRole(role_id,name)
      // save delete old access
      await UserAccessFunctions.DeleteMultipleUserAccess(role_id)
      // add new access
      await UserAccessFunctions.CreateMultipleUserAccess(role_id,assessList);
      sendResult(res, role, "Role Saved Successfully");
    } catch (error) {
      sendError(res, error.message, "Failed");
    }
  };
  static deleteRole = async (req, res) => {
    try {
      const { role_id} = req.body;
      // save delete all access
      await UserAccessFunctions.DeleteMultipleUserAccess(role_id)
      // delete role
      const role = await rolesFunctions.DeleteRole(role_id)
      sendResult(res, role, "Role Saved Successfully");
    } catch (error) {
      sendError(res, error.message, "Failed");
    }
  };
}

export default AuthController;
