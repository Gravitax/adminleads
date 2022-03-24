const	express		= require ("express");
const	router		= express.Router();

const	ctrl_clients	= require("../controllers/clients");

const	mdlw_auth		= require("../middlewares/auth");


router.get("/findAll", mdlw_auth, ctrl_clients.findAll);
router.get("/findOne/:name", mdlw_auth, ctrl_clients.findOne);
router.get("/findServices/:name", mdlw_auth, ctrl_clients.findServices);

router.delete("/delete/:name", mdlw_auth, ctrl_clients.delete);

router.post("/create", mdlw_auth, ctrl_clients.create);


module.exports = router;
