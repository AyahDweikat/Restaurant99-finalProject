import { roles } from "../Middleware/auth.middleware.js"

export const getAllRoles = ()=>{
    const allRoles = []
    for(let key in roles){
        allRoles.push(roles[key])
    }
    return allRoles;
}
