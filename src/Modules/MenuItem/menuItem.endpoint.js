import { roles } from "../../Middleware/auth.middleware.js";
import { getAllRoles } from "../../Services/getAllRoles.js";

export const endPoint = {
    create:[roles.SuperAdmin, roles.Admin],
    update:[roles.SuperAdmin, roles.Admin],
    delete:[roles.SuperAdmin, roles.Admin],
    changeAvailability:[roles.SuperAdmin, roles.Admin, roles.Employee],
    get:getAllRoles(),
}