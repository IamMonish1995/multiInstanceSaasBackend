export const mock_Status = [
  "Active",
  "Pending",
  "Processing",
  "Rejected",
  "Delayed",
  "Created",
  "Completed",
  "Approved",
  "Cancelled",
  "On Hold",
  "In Progress",
  "Submitted",
  "Under Review",
  "Failed",
  "Scheduled",
  "Deferred",
  "Closed",
  "Reopened",
  "Inactive",
  "Expired",
  "Deleted",
  "Suspended",
  "Banned",
  "Draft",
  "Archived",
  "Escalated",
  "Awaiting Feedback",
  "Partially Completed",
  "Accepted",
  "Declined",
];
export const mock_Roles = [
  "System Admin",
  "System Guest",
  "System User",
  "Org Admin",
  "Org User",
  "Client Admin",
  "Client User",
];

export const mock_Menus = [
  "menus_screen",
  "useraccess_screen",
  "system_admin_dashboard",
  "guest_dashboard",
  "explore_screen",
  "org_admin_dashboard",
  "client_admin_dashboard",
  "system_user_dashboard",
  "org_user_dashboard",
  "client_user_dashboard",
  "org_screen",
  "client_screen",
  "project_screen",
  "instance_screen",
  "membership_screen",
  "transactions",
];
export const mock_UserAccess = [
  // Superadmin access
  {
    role_name: "System Admin",
    menu_name: "useraccess_screen",
    can_create: true,
    can_read: true,
    can_update: true,
    can_delete: true,
  },
  {
    role_name: "System Admin",
    menu_name: "system_admin_dashboard",
    can_create: true,
    can_read: true,
    can_update: true,
    can_delete: true,
  },
  {
    role_name: "System Admin",
    menu_name: "menus_screen",
    can_create: true,
    can_read: true,
    can_update: true,
    can_delete: true,
  },
  {
    role_name: "System Admin",
    menu_name: "transactions",
    can_create: true,
    can_read: true,
    can_update: true,
    can_delete: true,
  },
  {
    role_name: "System Admin",
    menu_name: "explore_screen",
    can_create: true,
    can_read: true,
    can_update: true,
    can_delete: true,
  },
  //Guest Access
  {
    role_name: "System Guest",
    menu_name: "guest_dashboard",
    can_create: true,
    can_read: true,
    can_update: true,
    can_delete: true,
  },
  {
    role_name: "System Guest",
    menu_name: "explore_screen",
    can_create: true,
    can_read: true,
    can_update: true,
    can_delete: true,
  },
  //Org admin Access
  {
    role_name: "Org Admin",
    menu_name: "org_admin_dashboard",
    can_create: true,
    can_read: true,
    can_update: true,
    can_delete: true,
  },
  {
    role_name: "Org Admin",
    menu_name: "org_screen",
    can_create: true,
    can_read: true,
    can_update: true,
    can_delete: true,
  },
  {
    role_name: "Org Admin",
    menu_name: "client_screen",
    can_create: true,
    can_read: true,
    can_update: true,
    can_delete: true,
  },
  {
    role_name: "Org Admin",
    menu_name: "project_screen",
    can_create: true,
    can_read: true,
    can_update: true,
    can_delete: true,
  },
  {
    role_name: "Org Admin",
    menu_name: "membership_screen",
    can_create: true,
    can_read: true,
    can_update: true,
    can_delete: true,
  },
  {
    role_name: "Org Admin",
    menu_name: "instance_screen",
    can_create: true,
    can_read: true,
    can_update: true,
    can_delete: true,
  },
  {
    role_name: "Org Admin",
    menu_name: "transactions",
    can_create: true,
    can_read: true,
    can_update: true,
    can_delete: true,
  },
  {
    role_name: "Org Admin",
    menu_name: "explore_screen",
    can_create: true,
    can_read: true,
    can_update: true,
    can_delete: true,
  },
  //Client admin Access
  {
    role_name: "Client Admin",
    menu_name: "client_admin_dashboard",
    can_create: true,
    can_read: true,
    can_update: true,
    can_delete: true,
  },
  {
    role_name: "Client Admin",
    menu_name: "membership_screen",
    can_create: true,
    can_read: true,
    can_update: true,
    can_delete: true,
  },
  {
    role_name: "Client Admin",
    menu_name: "client_screen",
    can_create: true,
    can_read: true,
    can_update: true,
    can_delete: true,
  },
  {
    role_name: "Client Admin",
    menu_name: "instance_screen",
    can_create: true,
    can_read: true,
    can_update: true,
    can_delete: true,
  },
  {
    role_name: "Client Admin",
    menu_name: "transactions",
    can_create: true,
    can_read: true,
    can_update: true,
    can_delete: true,
  },
  {
    role_name: "Client Admin",
    menu_name: "explore_screen",
    can_create: true,
    can_read: true,
    can_update: true,
    can_delete: true,
  },
];
