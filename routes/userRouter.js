const express=require("express")
const router=express.Router();
const {login,signup,getuserDetails}=require("../controllers/userConrollers")
const {auth}=require("../auth/userAuth")
router.post("/login",login);
router.post("/signup",signup);
router.get("/userdetails",auth,getuserDetails)
module.exports=router;