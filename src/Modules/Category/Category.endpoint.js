import { roles } from "../../Middleware/auth.middleware.js";

export const endPoint = {
    create:[roles.SuperAdmin, roles.Admin],
    update:[roles.SuperAdmin, roles.Admin],
    delete:[roles.SuperAdmin, roles.Admin],
    get:Object.values(roles),
}