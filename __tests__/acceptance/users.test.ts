import app from "../../src/app";
import { port } from "../../src/config";
import * as request from "supertest";
import { createConnection, DataSource } from "typeorm";
import { AppDataSource } from "../../src/data-source";

let connection, server;

const testUser = {
  firstName: 'John',
  lastName: 'Doe',
  age: 20,
};

beforeEach(async () => {
	connection = AppDataSource;
	await connection.synchronize(true);
	server = app.listen(port);
})

afterEach(async () => {
	connection.close();
	server.close();
})

it("should be no users initially", async () => {
  const response = await request(app).get("/users");
  console.log(response);
});

// it(""), () => {
// 	expect()
// });


it("simple test", () => {
  expect(1 + 1).toBe(2);
});
