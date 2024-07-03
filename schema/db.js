import { ClientsModal } from "./ClientsSchema.js";
import { ClientUsersModel } from "./ClientsUsersSchema.js";
import { InstancesModel } from "./InstancesSchema.js";
import { MenusModal } from "./MenusSchema.js";
import { OrganizationModel } from "./OrganizationsSchema.js";
import { OrganizationUsersModel } from "./OrganizationsUsersSchema.js";
import { ProjectsModel } from "./ProjectsSchema.js";
import { RolesModal } from "./RolesSchema.js";
import { SystemUsersModel } from "./SaasSystemUsersSchema.js";
import { StatusModal } from "./StatusSchema.js";
import { UserAccessModal } from "./UserAccessesSchema.js";
import { UsersModal } from "./UsersSchema.js";


const db = {
  ClientsModal,
  ClientUsersModel,
  InstancesModel,
  MenusModal,
  OrganizationModel,
  OrganizationUsersModel,
  ProjectsModel,
  RolesModal,
  SystemUsersModel,
  UserAccessModal,
  UsersModal,
  StatusModal
};

export default db;
