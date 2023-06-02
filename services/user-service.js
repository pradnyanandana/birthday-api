import UserRepository from "../repositories/user-repository";

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

  async getUser(id) {
    return await this.repository.findById(id);
  }

  async getUsers() {
    return await this.repository.find();
  }
}

module.exports = UserService;
