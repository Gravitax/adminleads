const	express		= require ("express");
const	router		= express.Router();

const	ctrl_clients	= require("../controllers/clients");

const	mdlw_auth		= require("../middlewares/auth");


router.get("/findAll", mdlw_auth, ctrl_clients.findAll);


module.exports = router;
