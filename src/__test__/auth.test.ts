import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import supertest from "supertest";
import { v4 as uuidv4 } from "uuid";
import { createUserRepo } from "../services/auth.service";
import { hashing } from "../utils/hashing";
import createServer from "../utils/server";

const app = createServer();

const userAdmin = {
    user_id: uuidv4(),
    email: "ariefbudiman123@gmail.com",
    name: "arief",
    password: `${hashing("pw123")}`,
    role: "admin",
};

const userMentee = {
    user_id: uuidv4(),
    email: "ariefbudiman@gmail.com",
    name: "arief",
    password: `${hashing("pw123")}`,
    role: "mentee",
};

const createUserAdmin = {
    email: "arief123@gmail.com",
    name: "arief",
    password: "pw123",
    role: "admin",
};

const createUserMentee = {
    email: "arief@gmail.com",
    name: "arief",
    password: "pw123",
};

const loginUser = {
    email: "ariefbudiman123@gmail.com",
    password: "pw123",
};

const userNotExist = {
    email: "budi@gmail.com",
    password: "pw123",
};

describe("product", () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
        await createUserRepo(userAdmin);
        await createUserRepo(userMentee);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    describe("register", () => {
        describe("create user with role admin", () => {
            it("should return 201, success create user admin", async () => {
                await supertest(app)
                    .post("/auth/register")
                    .send(createUserAdmin)
                    .expect(201);
            });
        });

        describe("create user with role mentee", () => {
            it("should return 201, success create user mentee", async () => {
                await supertest(app)
                    .post("/auth/register")
                    .send(createUserMentee)
                    .expect(201);
            });
        });
    });

    describe("login", () => {
        describe("login with exist user", () => {
            it("should return 200, return access token & refresh token", async () => {
                await supertest(app)
                    .post("/auth/login")
                    .send(loginUser)
                    .expect(200);
            });
        });

        describe("login with not exist user", () => {
            it("should return 404, login failed", async () => {
                await supertest(app)
                    .post("/auth/login")
                    .send(userNotExist)
                    .expect(404);
            });
        });
    });
});
