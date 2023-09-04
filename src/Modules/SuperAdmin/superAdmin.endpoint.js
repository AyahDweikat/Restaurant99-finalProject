import { roles } from "../../Middleware/auth.middleware.js";
import { getAllRoles } from "../../Services/getAllRoles.js";




export const endPoint = {
    changeToSuperAdmin:[roles.SuperAdmin],
    deleteSuperAdmin:[roles.SuperAdmin],
    updateSuperAdminSalary:[roles.SuperAdmin],
    getAllSuperAdmins:[roles.SuperAdmin],
}