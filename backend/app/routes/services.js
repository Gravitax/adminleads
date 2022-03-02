
const	express		= require ("express");
const	router		= express.Router();

const	ctrl_services	= require("../controllers/services");

const	mdlw_auth		= require("../middlewares/auth");


router.post("/create", mdlw_auth, ctrl_services.create);


module.exports = router;
