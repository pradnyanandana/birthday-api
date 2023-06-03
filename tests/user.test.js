require("dotenv").config();

const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const User = require("../database/models/user");

let userId = 0;

beforeAll(async () => {
  await mongoose.connect(
    `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}test?retryWrites=true&w=majority`
  );

  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Test routes", () => {
  test("should store user data", async () => {
    const res = await request(app).post("/user").send({
      first_name: "John",
      last_name: "Doe",
      email: "johndoe@example.com",
      location: "Asia/Makassar",
      birthdate: "2020-01-01",
    });

    userId = res.body.data?.id || 0;

    expect(res.statusCode).toBe(200);
    expect(typeof res.body.data).toBe("object");
  });

  test("should email exists", async () => {
    const res = await request(app).post("/user").send({
      first_name: "Jane",
      last_name: "Doe",
      email: "johndoe@example.com",
      location: "Asia/Makassar",
      birthdate: "2020-01-01",
    });

    expect(res.statusCode).toBe(400);
  });

  test("should store other user data", async () => {
    const res = await request(app).post("/user").send({
      first_name: "Jane",
      last_name: "Doe",
      email: "janedoe@example.com",
      location: "Asia/Makassar",
      birthdate: "2020-01-01",
    });

    expect(res.statusCode).toBe(200);
    expect(typeof res.body.data).toBe("object");
  });

  test("should update email exists", async () => {
    const res = await request(app).put(`/user/${userId}`).send({
      first_name: "Max",
      last_name: "Doe",
      email: "janedoe@example.com",
      location: "Asia/Makassar",
      birthdate: "2020-01-01",
    });

    expect(res.statusCode).toBe(400);
  });

  test("should update user", async () => {
    const res = await request(app).put(`/user/${userId}`).send({
      first_name: "Max",
      last_name: "Doe",
      email: "maxdoe@example.com",
      location: "Asia/Makassar",
      birthdate: "2020-01-01",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.first_name).toBe('Max');
    expect(res.body.data.last_name).toBe('Doe');
    expect(res.body.data.email).toBe('maxdoe@example.com');
  });

  test("should return all users", async () => {
    const res = await request(app).get("/user");
    expect(res.statusCode).toBe(200);
    expect(typeof res.body).toBe("object");
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test("should return user", async () => {
    const res = await request(app).get(`/user/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(typeof res.body.data).toBe("object");
    expect(res.body.data.first_name).toBe('Max');
    expect(res.body.data.last_name).toBe('Doe');
  });

  test("should delete user", async () => {
    const res = await request(app).delete(`/user/${userId}`);
    expect(res.statusCode).toBe(200);
  });

  test("should remove user", async () => {
    const res = await request(app).get(`/user/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBe(null);
  });
});
