const	express		= require ("express");
const	router		= express.Router();

const	ctrl_medias	= require("../controllers/medias");

const	mdlw_auth	= require("../middlewares/auth");


router.get("/findAll", mdlw_auth, ctrl_medias.findAll);


module.exports = router;
