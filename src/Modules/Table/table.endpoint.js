import { roles } from "../../Middleware/auth.middleware.js";
import { getAllRoles } from './../../Services/getAllRoles.js';

export const endPoint = {
    create:[roles.SuperAdmin, roles.Admin],
    update:[roles.SuperAdmin, roles.Admin],
    reserve:getAllRoles(),
    delete:[roles.SuperAdmin, roles.Admin],
    getInfo:[roles.SuperAdmin, roles.Admin, roles.Employee],// userIdReserved
    getStatus: getAllRoles(),
}