const	express		= require ("express");
const	router		= express.Router();

const	usersCtrl	= require("../controllers/users");

const	authMdlw	= require("../middlewares/auth");


router.delete("/delete/:username", authMdlw, usersCtrl.delete);

router.get("/read", authMdlw, usersCtrl.read);
router.get("/readOne/:username", authMdlw, usersCtrl.readOne);

router.put("/update", authMdlw, usersCtrl.update);


module.exports = router;
