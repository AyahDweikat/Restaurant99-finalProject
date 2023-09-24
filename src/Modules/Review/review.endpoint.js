import { roles } from "../../Middleware/auth.middleware.js";
import { getAllRoles } from "../../Services/getAllRoles.js";

export const endPoint = {
    create: getAllRoles(),
    update: getAllRoles(),
    delete:[roles.Admin, roles.SuperAdmin],
}