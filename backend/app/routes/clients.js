const	express		= require ("express");
const	router		= express.Router();

const	ctrl_clients	= require("../controllers/clients");

const	mdlw_auth		= require("../middlewares/auth");


router.get("/findAll", mdlw_auth, ctrl_clients.findAll);
router.get("/findOne/:email", mdlw_auth, ctrl_clients.findOne);

router.delete("/delete/:email", mdlw_auth, ctrl_clients.delete);

router.post("/create", mdlw_auth, ctrl_clients.create);


module.exports = router;
