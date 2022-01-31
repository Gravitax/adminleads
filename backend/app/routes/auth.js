const	express		= require ("express");
const	router		= express.Router();

const	ctrl_auth	= require("../controllers/auth");


router.post("/login", ctrl_auth.login);
router.post("/register", ctrl_auth.register);


module.exports = router;
