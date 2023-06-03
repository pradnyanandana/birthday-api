import UserRepository from "../repositories/user-repository";
import ApiError from "../helpers/api-error";

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  async register(user) {
    const userExist = await this.repository.findOneBy("email", user.email);

    if (userExist) {
      throw ApiError.badRequest("Email exist");
    }

    return await this.repository.store(user);
  }

  async update(id, user) {
    const userExist = await this.repository.findOneBy("email", user.email);

    if (userExist && userExist.id !== parseInt(id)) {
      throw ApiError.badRequest("Email exist");
    }

    return await this.repository.update(id, user);
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
