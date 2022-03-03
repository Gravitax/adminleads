
const	express		= require ("express");
const	router		= express.Router();

const	ctrl_services	= require("../controllers/services");

const	mdlw_auth		= require("../middlewares/auth");


router.get("/findAll", mdlw_auth, ctrl_services.findAll);
router.get("/findOne/:name", mdlw_auth, ctrl_services.findOne);

router.delete("/delete/:name", mdlw_auth, ctrl_services.delete);

router.post("/create", mdlw_auth, ctrl_services.create);


module.exports = router;
