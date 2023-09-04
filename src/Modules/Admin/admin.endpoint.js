import { roles } from "../../Middleware/auth.middleware.js";
import { getAllRoles } from "../../Services/getAllRoles.js";




export const endPoint = {
    changeToAdmin:[roles.SuperAdmin],
    deleteAdmin:[roles.SuperAdmin],
    updateAdminSalary:[roles.SuperAdmin],
    getAllAdmins:[roles.SuperAdmin],
    updateStatus:[roles.SuperAdmin],
}