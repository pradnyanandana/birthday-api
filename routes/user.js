const userController = require("../controllers/user-controller");
const router = require("express").Router();

router.post("/", userController.store);
router.get("/", userController.list);
router.get("/:id", userController.profile);
router.put("/:id", userController.update);
router.delete("/:id", userController.remove);

module.exports = router;
