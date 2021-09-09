const	express		= require ("express");
const	router		= express.Router();

const	leadsCtrl	= require("../controllers/leads");


router.get("/readAll", leadsCtrl.readAll);
router.get("/readQuery", leadsCtrl.readQuery);
router.get("/readDestinataires", leadsCtrl.readDestinataires);
router.get("/readProvenances", leadsCtrl.readProvenances);


module.exports = router;
