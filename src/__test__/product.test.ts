import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import supertest from "supertest";
import { v4 as uuidv4 } from "uuid";
import { addProductRepo } from "../services/product.service";
import createServer from "../utils/server";

const app = createServer();
const productId1 = uuidv4();

const productPayload = {
    product_id: productId1,
    name: "Sendal",
    price: 90000,
    size: "40",
};

describe("product", () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
        await addProductRepo(productPayload);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
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
                const { statusCode, body } = await supertest(app).get(
                    `/product/${productId1}`
                );
                expect(statusCode).toBe(200);
            });
        });
    });
});
