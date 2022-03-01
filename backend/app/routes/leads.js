const	express		= require("express");
const	router		= express.Router();

const	ctrl_leads	= require("../controllers/leads");

const	mdlw_auth	= require("../middlewares/auth");


router.get("/readAll", mdlw_auth, ctrl_leads.readAll);
router.get("/readQuery", mdlw_auth, ctrl_leads.readQuery);
router.get("/readDispositifs", mdlw_auth, ctrl_leads.readDispositifs);
router.get("/readFlux", mdlw_auth, ctrl_leads.readFlux);

router.post("/update", mdlw_auth, ctrl_leads.update);


module.exports = router;
