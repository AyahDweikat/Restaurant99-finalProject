import { roles } from "../../Middleware/auth.middleware.js";
import { getAllRoles } from "../../Services/getAllRoles.js";



export const endPoint = {
    update:getAllRoles(),
    delete:getAllRoles(),
    get:getAllRoles(),
    getAllUsers:[roles.SuperAdmin, roles.Admin, roles.Employee],
}