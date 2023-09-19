import { roles } from "../../Middleware/auth.middleware.js";

export const endPoint = {
    create:[roles.SuperAdmin],
    update:[roles.SuperAdmin],
    delete:[roles.SuperAdmin],
    get:[roles.SuperAdmin],
}