import UserService from "../services/user-service";

class UserController {
  constructor() {
    this.service = new UserService();
  }

  async store(req, res, next) {
    try {
      const payload = req.body;
      const data = await this.service.register(payload);

      res.json({
        success: true,
        message: "Success add user",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async profile(req, res, next) {
    try {
      const id = req.params.id;
      const data = await this.service.getUser(id);

      res.json({
        success: true,
        message: "Success retrieve user profile",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async list(req, res, next) {
    try {
      const data = await this.service.getUsers();
      res.json({
        success: true,
        message: "Success retrieve all users",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const id = req.params.id;
      const payload = req.body;
      const data = await this.service.update(id, payload);

      res.json({
        success: true,
        message: "Success update user profile",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      const id = req.params.id;
      await this.service.remove(id);

      res.json({
        success: true,
        message: "Success remove user"
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
