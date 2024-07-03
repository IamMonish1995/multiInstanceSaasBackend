import { mock_Menus, mock_Roles, mock_Status } from "../constant/staticData.js";
import MenusFunctions from "./Menus.js";
import rolesFunctions from "./Roles.js";
import StatussFunctions from "./Status.js";
// save
export const InitiatSetupWizard = () => {
  return new Promise(async (resolve, reject) => {
    try {
      //  all static tables
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
        let existingMenus = await MenusFunctions.FindMenu({ menu_name: menus });
          if (!existingMenus) {
            await MenusFunctions.CreateMenu({ menu_name: menus });
            console.log(`${menus} Created`);
          } else {
            console.log(`${menus} exist`);
          }
        })
      );

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
