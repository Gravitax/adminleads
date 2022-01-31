const	express		= require ("express");
const	router		= express.Router();

const	ctrl_users	= require("../controllers/users");

const	mdlw_auth	= require("../middlewares/auth");


router.delete("/delete/:username", mdlw_auth, ctrl_users.delete);

router.get("/read", mdlw_auth, ctrl_users.read);
router.get("/readOne/:username", mdlw_auth, ctrl_users.readOne);

router.put("/update", mdlw_auth, ctrl_users.update);


module.exports = router;
