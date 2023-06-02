import BaseRepository from "./base-repository";
import User from "../database/models/user";

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }
}

module.exports = UserRepository;
