
const	express		= require ("express");
const	router		= express.Router();

const	ctrl_users	= require("../controllers/users");

const	mdlw_auth	= require("../middlewares/auth");


router.delete("/delete/:email", mdlw_auth, ctrl_users.delete);

router.get("/readAll", mdlw_auth, ctrl_users.readAll);
router.get("/read/:email", mdlw_auth, ctrl_users.read);

router.put("/update", mdlw_auth, ctrl_users.update);


module.exports = router;
