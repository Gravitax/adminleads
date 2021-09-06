const	express		= require ("express");
const	router		= express.Router();

const	leadsCtrl	= require("../controllers/leads");


router.get("/read", leadsCtrl.read);


module.exports = router;
