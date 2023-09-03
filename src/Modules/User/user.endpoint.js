import { roles } from "../../Middleware/auth.middleware.js";
import { getAllRoles } from "../../Services/getAllRoles.js";



export const endPoint = {
    update:getAllRoles(),
    get:getAllRoles(),
}