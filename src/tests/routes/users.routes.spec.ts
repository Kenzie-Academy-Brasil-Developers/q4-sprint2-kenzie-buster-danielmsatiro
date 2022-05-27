import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import request from "supertest";
import app from "../../app";

describe("Testing the user routes", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  const email = "eMail@mAIl.com";
  const name = "name";
  const password = "password";

  test("Should return unauthorized to create new administrator without permission", async () => {
    const userData = { email, name, password, isAdm: true };

    const response = await request(app)
      .post("/api/users/register")
      .send(userData);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error");
  });

  test("Should be able to create a new user", async () => {
    const userData = { email, name, password };

    const response = await request(app)
      .post("/api/users/register")
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: response.body.id,
        isAdm: false,
        email: "email@mail.com",
        name: "Name",
      })
    );
  });

  test("Should return bad request in create user with incomplete request", async () => {
    const userData = { name: "name" };

    const response = await request(app)
      .post("/api/users/register")
      .send(userData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  test("Should return conflict in create user with duplicate email", async () => {
    const userData = { email, name, password };

    const response = await request(app)
      .post("/api/users/register")
      .send(userData);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("error");
  });

  test("Should be able to login", async () => {
    const userData = { email: email.toLowerCase(), password };

    const response = await request(app).post("/api/users/login").send(userData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});
