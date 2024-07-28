import { mock_Menus, mock_Roles, mock_Status, mock_UserAccess } from "../constant/staticData.js";
import MenusFunctions from "./Menus.js";
import rolesFunctions from "./Roles.js";
import StatussFunctions from "./Status.js";
import UserAccessFunctions from "./UserAccess.js";
// save
export const InitiatSetupWizard = () => {
  return new Promise(async (resolve, reject) => {
    try {
      //  all role
      await Promise.all(
        mock_Roles.map(async (role) => {
          let existingrole = await rolesFunctions.FindRole({ role_name: role });
          if (!existingrole) {
            await rolesFunctions.CreateRole({ role_name: role });
            console.log(`${role} Created`);
          } else {
            console.log(`${role} exist`);
          }
        })
      );
      // all status
      await Promise.all(
        mock_Status.map(async (status) => {
          let existingStatus = await StatussFunctions.FindStatus({
            status_name: status,
          });
          if (!existingStatus) {
            await StatussFunctions.CreateStatus({ status_name: status });
            console.log(`${status} Created`);
          } else {
            console.log(`${status} exist`);
          }
        })
      );
      // all menus
      await Promise.all(
        mock_Menus.map(async (menus) => {
          let existingMenus = await MenusFunctions.FindMenu({
            menu_name: menus,
          });
          if (!existingMenus) {
            await MenusFunctions.CreateMenu({ menu_name: menus });
            console.log(`${menus} Created`);
          } else {
            console.log(`${menus} exist`);
          }
        })
      );
      // menu access

      await Promise.all(
        mock_UserAccess.map(async (access) => {
          let menu = await MenusFunctions.FindMenu({
            menu_name: access.menu_name,
          });
          let role = await rolesFunctions.FindRole({
            role_name: access.role_name,
          });
          let existingUserAccess = await UserAccessFunctions.FindUserAccess({
            role_id: role._id,
            menu_id: menu._id,
          });
          if (!existingUserAccess) {
            await UserAccessFunctions.CreateUserAccess({
              role_id: role._id,
              menu_id: menu._id,
              can_create: access.can_create,
              can_read: access.can_read,
              can_update: access.can_update,
              can_delete: access.can_delete,
            });
            console.log(`${access.menu_name} ${access.role_name} Created`);
          } else {
            console.log(`${access.menu_name} ${access.role_name} exist`);
          }
        })
      );
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
