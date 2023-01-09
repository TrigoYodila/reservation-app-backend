import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//CHECK TOKEN
// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//     res.send("Hello user, you are authenticated")
// })

//CHECK USER
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("Hello user, you are logged in and your can delete you account");
// });

//CHECK TOKEN
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("Hello admin, you are logged in and you can delete All accounts");
// });


//UPDATE
router.put("/:id",verifyUser, updateUser); //protected route (only owner and admin can update)

//DELETE
router.delete("/:id", verifyUser, deleteUser)

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers)

export default router;
