import path from 'path'; 
import {fileURLToPath} from 'url';
import { globalErrorHandle } from '../Services/errorHandling.js';
import connectDB from '../../DB/connection.js';
import AuthRouter from './Auth/auth.router.js';
import UserRouter from './User/user.router.js';
import AdminRouter from './Admin/admin.router.js';
import EmployeeRouter from './Employee/employee.router.js';



const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fullPath=path.join(__dirname,'../upload');
const initApp=(app,express)=>{
    connectDB();
    app.use(express.json());
    app.use('/auth', AuthRouter)
    app.use('/user', UserRouter)
    app.use('/admin', AdminRouter)
    app.use('/employee', EmployeeRouter)



    
    app.use('/*', (req,res)=>{
        return res.json({messaga:"Page Not Found"});
    })
    //global error handler
    app.use(globalErrorHandle)
}
export default initApp;