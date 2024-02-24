import {Router} from "express"
import {upload} from "../middleware/Multer.middleware.js"
import {register,login,logout,AddTask,removeTask,editTask,currentUser,getAllTask} from "../controller/User.controller.js"
import {Authentication} from "../middleware/Auth.middleware.js"

const router = Router()


router.route("/register").post(
  upload.single('avatar'),
  register
)


//secured router
router.route("/login").post(login)
router.route("/logout").get(Authentication,logout)
router.route("/addtask").post(Authentication,AddTask)
router.route("/removetask").post(Authentication,removeTask)
router.route("/edit").post(Authentication,editTask)
router.route("/getuser").post(Authentication,currentUser)
router.route("/getalltask").post(Authentication,getAllTask)


export default router