const router = require("express").Router();

const validation = require("./../middlewares/validation");
const schema = require("./../helpers/validation-schema");

const UserController = require("../controllers/user-controller");
const userController = new UserController();

router.post("/", validation(schema.register), (req, res, next) => {
  userController.store(req, res, next);
});

router.get("/", (req, res, next) => {
  userController.list(req, res, next);
});

router.get("/:id", (req, res, next) => {
  userController.profile(req, res, next);
});

router.put("/:id", (req, res, next) => {
  userController.update(req, res, next);
});

router.delete("/:id", (req, res, next) => {
  userController.remove(req, res, next);
});

module.exports = router;
