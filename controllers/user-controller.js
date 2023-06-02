import UserService from "../services/user-service";

class UserController {
  constructor() {
    this.service = new UserService();
  }

  async store(req, res, next) {
    const payload = req.body;

    await this.service.register(payload);
    
    try {
      res.json({
        success: true,
        message: "Success add user",
        data: payload,
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

      res.json({
        success: true,
        message: "Success update user profile",
        data: { id },
      });
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      const id = req.params.id;

      res.json({
        success: true,
        message: "Success remove user",
        data: { id },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
