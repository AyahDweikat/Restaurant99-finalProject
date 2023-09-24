import { roles } from '../../Middleware/auth.middleware.js';
import {getAllRoles} from '../../Services/getAllRoles.js';

export const endPoint = {
    create: getAllRoles(),
    update: getAllRoles(),
    cancel:getAllRoles(),
    changeStatus:[roles.SuperAdmin, roles.Admin, roles.Employee],
}