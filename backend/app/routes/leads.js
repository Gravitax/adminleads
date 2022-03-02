const	express		= require("express");
const	router		= express.Router();

const	ctrl_leads	= require("../controllers/leads");

const	mdlw_auth	= require("../middlewares/auth");


router.get("/findAll", mdlw_auth, ctrl_leads.findAll);
router.get("/findQuery", mdlw_auth, ctrl_leads.findQuery);

router.post("/update", mdlw_auth, ctrl_leads.update);

router.get("/findAll", mdlw_auth, ctrl_leads.findAll);


module.exports = router;
