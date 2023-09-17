import path from "path";
import { fileURLToPath } from "url";
import { globalErrorHandle } from "../Services/errorHandling.js";
import connectDB from "../../DB/connection.js";
import UserRouter from "./User/user.router.js";
import EmployeeRouter from "./Employee/employee.router.js";
import AdminRouter from "./Admin/admin.router.js";
import SuperAdminRouter from "./SuperAdmin/superAdmin.router.js";
import cors from "cors";
import AuthRouter from './authe/auth.router.js';
import categoryRouter from './Category/category.router.js';
import menuItemRouter from './MenuItem/menuItem.router.js';





const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fullPath = path.join(__dirname, "../upload");

const initApp = (app, express) => {
//   app.use(async (req, res, next) => {
//     var whitelist = ["", ""];
//     if (!whitelist.includes(req.header("origin"))) {
//       return next(new Error("Invalid Origin", { cause: 403 }));
//     }
//     next();
//   });
  app.use(cors());
  connectDB();
  app.use(express.json());
  app.use("/upload", express.static(fullPath));
  app.use("/auth", AuthRouter);
  app.use("/user", UserRouter);
  app.use("/employee", EmployeeRouter);
  app.use("/admin", AdminRouter);
  app.use("/superAdmin", SuperAdminRouter);
  app.use("/category", categoryRouter);
  app.use("/menuItem", menuItemRouter);




  app.use('/',(req, res)=>{
    res.json({message : "App is running"})
  })

  app.use("/*", (req, res) => {
    return res.json({ messaga: "Page Not Found" });
  });
  //global error handler
  app.use(globalErrorHandle);
};
export default initApp;
