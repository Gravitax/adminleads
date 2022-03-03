
const	express		= require ("express");
const	router		= express.Router();

const	ctrl_users	= require("../controllers/users");

const	mdlw_auth	= require("../middlewares/auth");


router.get("/findAll", mdlw_auth, ctrl_users.findAll);
router.get("/findOne/:email", mdlw_auth, ctrl_users.findOne);

router.delete("/delete/:email", mdlw_auth, ctrl_users.delete);

router.put("/update", mdlw_auth, ctrl_users.update);


module.exports = router;
