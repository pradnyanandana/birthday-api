import UserRepository from "../repositories/user-repository";
import ApiError from "../helpers/api-error";
import { generate, generateRefresh, parseToken, destroy } from "../helpers/auth-jwt";

class AuthService {
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

    async login({ email, password }) {
        const user = await this.repository.findModelOneBy("email", email);

        if (user) {
            if (user.status !== "approved") {
                throw ApiError.badRequest("User not approved");
            }

            if (user.validPassword(password)) {
                const payload = {
                    id: user.id,
                    _id: user._id,
                    email: user.email,
                    role: user.role,
                };

                const token = generate(payload);
                const refreshToken = generateRefresh(payload);

                return {
                    data: await this.repository.findOneBy("email", email),
                    token: token,
                    refresh_token: refreshToken,
                };
            }
        }

        throw ApiError.badRequest("Email or Password doesn't match");
    }

    async refresh(user) {
        const userExist = await this.repository.findOneBy("email", user.email);

        if (userExist) {
            const payload = {
                id: user.id,
                email: user.email,
                role: user.role,
            };

            const token = generate(payload);
            const refreshToken = generateRefresh(payload);

            return {
                data: await this.repository.findOneBy("email", user.email),
                token: token,
                refresh_token: refreshToken,
            };
        }

        throw ApiError.badRequest("Can't find user. Please login");
    }

    async profile(token) {
        const parse = parseToken(token);
        return await this.repository.findById(parse.id);
    }

    async logout(token) {
        return destroy(token);
    }
}

module.exports = AuthService;
