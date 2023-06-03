import UserRepository from "../repositories/user-repository";
import ApiError from "../helpers/api-error";
import AlertService from "./alert-service";

class UserService {
  constructor() {
    this.alert = new AlertService();
    this.repository = new UserRepository();
  }

  async register(user) {
    const userExist = await this.repository.findOneBy("email", user.email);

    if (userExist) {
      throw ApiError.badRequest("Email exist");
    }

    const userSave = await this.repository.store(user);

    this.alert.send(userSave);

    return userSave;
  }

  async update(id, user) {
    const userExist = await this.repository.findOneBy("email", user.email);

    if (userExist && userExist.id !== parseInt(id)) {
      throw ApiError.badRequest("Email exist");
    }

    const userSave = await this.repository.update(id, user);

    this.alert.clear(userSave);
    this.alert.send(userSave);

    return userSave;
  }

  async getUser(id) {
    return await this.repository.findById(id);
  }

  async getUsers() {
    return await this.repository.find();
  }

  async remove(id) {
    return await this.repository.delete(id);
  }
}

module.exports = UserService;
