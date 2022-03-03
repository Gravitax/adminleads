const	express		= require ("express");
const	router		= express.Router();

const	ctrl_medias	= require("../controllers/medias");

const	mdlw_auth	= require("../middlewares/auth");


router.get("/findAll", mdlw_auth, ctrl_medias.findAll);
router.get("/findOne/:name", mdlw_auth, ctrl_medias.findOne);

router.delete("/delete/:name", mdlw_auth, ctrl_medias.delete);

router.post("/create", mdlw_auth, ctrl_medias.create);


module.exports = router;
