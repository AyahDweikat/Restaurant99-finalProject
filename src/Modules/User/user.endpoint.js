import { roles } from "../../Middleware/auth.middleware.js";
import { getAllRoles } from "../../Services/getAllRoles.js";



export const endPoint = {
    update:getAllRoles(),
    get:getAllRoles(),
    getAllUsers:[roles.SuperAdmin, roles.Admin, roles.Employee],
    getAllEmployees:[roles.SuperAdmin, roles.Admin],
    getAllAdmins:[roles.SuperAdmin],
    updateStatus:[roles.SuperAdmin]
}