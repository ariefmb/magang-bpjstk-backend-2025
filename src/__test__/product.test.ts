import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import supertest from "supertest";
import { v4 as uuidv4 } from "uuid";
import { createUserRepo } from "../services/auth.service";
import { addProductRepo } from "../services/product.service";
import { hashing } from "../utils/hashing";
import createServer from "../utils/server";

const app = createServer();

const productPayload = {
    product_id: uuidv4(),
    name: "Sendal",
    price: 90000,
    size: "40",
};

const productPayloadCreate = {
    product_id: uuidv4(),
    name: "Sweater",
    price: 1000000,
    size: "M",
};

const productPayloadUpdate = {
    price: 95000,
    size: "38",
};

const createUserAdmin = {
    user_id: uuidv4(),
    email: "ariefbudiman123@gmail.com",
    name: "arief",
    password: `${hashing("pw123")}`,
    role: "admin",
};

const createUserMentee = {
    user_id: uuidv4(),
    email: "ariefbudiman@gmail.com",
    name: "arief",
    password: `${hashing("pw123")}`,
    role: "mentee",
};

const userAdmin = {
    email: "ariefbudiman123@gmail.com",
    password: "pw123",
};

const userMentee = {
    email: "ariefbudiman@gmail.com",
    password: "pw123",
};

describe("product", () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
        await addProductRepo(productPayload);
        await createUserRepo(createUserAdmin);
        await createUserRepo(createUserMentee);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    describe("create product", () => {
        describe("if user is not login", () => {
            it("should return 403, request forbidden", async () => {
                const { statusCode } = await supertest(app)
                    .post("/product")
                    .send(productPayloadCreate);
                expect(statusCode).toBe(403);
            });
        });

        describe("if user is login as admin", () => {
            it("should return 201, success create product data", async () => {
                const { body } = await supertest(app)
                    .post("/auth/login")
                    .send(userAdmin);
                const accessToken = body.data.accessToken;
                const { statusCode } = await supertest(app)
                    .post("/product")
                    .set("Authorization", `Bearer ${accessToken}`)
                    .send(productPayloadCreate);
                expect(statusCode).toBe(201);
            });

            it("should return 422, product name is exist in db", async () => {
                const { body } = await supertest(app)
                    .post("/auth/login")
                    .send(userAdmin);
                const accessToken = body.data.accessToken;
                const { statusCode } = await supertest(app)
                    .post("/product")
                    .set("Authorization", `Bearer ${accessToken}`)
                    .send(productPayload);
                expect(statusCode).toBe(422);
            });
        });

        describe("if user is login as mentee", () => {
            it("should return 403, request forbidden", async () => {
                const { body } = await supertest(app)
                    .post("/auth/login")
                    .send(userMentee);
                const accessToken = body.data.accessToken;
                const { statusCode } = await supertest(app)
                    .post("/product")
                    .set("Authorization", `Bearer ${accessToken}`)
                    .send(productPayloadCreate);
                expect(statusCode).toBe(403);
            });
        });
    });

    describe("get all detail product", () => {
        it("should return 200, and products data", async () => {
            const { statusCode } = await supertest(app).get(`/product`);
            expect(statusCode).toBe(200);
        });
    });

    describe("get detail product", () => {
        describe("given the product does not exist", () => {
            it("should return 404, and empty data", async () => {
                const productId = "PRODUCT_123";
                await supertest(app).get(`/product/${productId}`).expect(404);
            });
        });

        describe("given the product does exist", () => {
            it("should return 200, and detail product data", async () => {
                const { statusCode } = await supertest(app).get(
                    `/product/${productPayload.product_id}`
                );
                expect(statusCode).toBe(200);
            });
        });
    });

    describe("update product", () => {
        describe("if user is not login", () => {
            it("should return 403, request forbidden", async () => {
                const { statusCode } = await supertest(app)
                    .put(`/product/${productPayload.product_id}`)
                    .send(productPayloadUpdate);
                expect(statusCode).toBe(403);
            });
        });

        describe("if user is login as admin", () => {
            it("should return 200, success update product data", async () => {
                const { body } = await supertest(app)
                    .post("/auth/login")
                    .send(userAdmin);
                const accessToken = body.data.accessToken;
                const { statusCode } = await supertest(app)
                    .put(`/product/${productPayload.product_id}`)
                    .set("Authorization", `Bearer ${accessToken}`)
                    .send(productPayloadUpdate);
                expect(statusCode).toBe(200);

                const updatedData = await supertest(app).get(
                    `/product/${productPayload.product_id}`
                );
                expect(updatedData.body.data.price).toBe(
                    productPayloadUpdate.price
                );
                expect(updatedData.body.data.size).toBe(
                    productPayloadUpdate.size
                );
            });

            it("should return 404, product name does not exist in db", async () => {
                const { body } = await supertest(app)
                    .post("/auth/login")
                    .send(userAdmin);
                const accessToken = body.data.accessToken;
                const { statusCode } = await supertest(app)
                    .put("/product/product_123")
                    .set("Authorization", `Bearer ${accessToken}`)
                    .send(productPayloadUpdate);
                expect(statusCode).toBe(404);
            });
        });

        describe("if user is login as mentee", () => {
            it("should return 403, request forbidden", async () => {
                const { body } = await supertest(app)
                    .post("/auth/login")
                    .send(userMentee);
                const accessToken = body.data.accessToken;
                const { statusCode } = await supertest(app)
                    .put(`/product/${productPayload.product_id}`)
                    .set("Authorization", `Bearer ${accessToken}`)
                    .send(productPayloadUpdate);
                expect(statusCode).toBe(403);
            });
        });
    });

    describe("delete product", () => {
        describe("if user is not login", () => {
            it("should return 403, request forbidden", async () => {
                const { statusCode } = await supertest(app).delete(
                    `/product/${productPayload.product_id}`
                );
                expect(statusCode).toBe(403);
            });
        });

        describe("if user is login as admin", () => {
            it("should return 200, success delete product data", async () => {
                const { body } = await supertest(app)
                    .post("/auth/login")
                    .send(userAdmin);
                const accessToken = body.data.accessToken;
                const { statusCode } = await supertest(app)
                    .delete(`/product/${productPayload.product_id}`)
                    .set("Authorization", `Bearer ${accessToken}`);
                expect(statusCode).toBe(200);
            });

            it("should return 404, product name does not exist in db", async () => {
                const { body } = await supertest(app)
                    .post("/auth/login")
                    .send(userAdmin);
                const accessToken = body.data.accessToken;
                const { statusCode } = await supertest(app)
                    .delete("/product/product_123")
                    .set("Authorization", `Bearer ${accessToken}`);
                expect(statusCode).toBe(404);
            });
        });

        describe("if user is login as mentee", () => {
            it("should return 403, request forbidden", async () => {
                const { body } = await supertest(app)
                    .post("/auth/login")
                    .send(userMentee);
                const accessToken = body.data.accessToken;
                const { statusCode } = await supertest(app)
                    .delete(`/product/${productPayload.product_id}`)
                    .set("Authorization", `Bearer ${accessToken}`);
                expect(statusCode).toBe(403);
            });
        });
    });
});
