import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../src/app.js";
import { pool } from "../src/db/pool.js";

// Reset to two known rows before every test, so each test is an island
// regardless of what ran before it.
beforeEach(async () => {
    await pool.query("DELETE FROM categories");
    await pool.query(
        `INSERT INTO categories (name) VALUES
           ('Sports'),
           ('Transportation')`,
    );
});

// Close the connection pool once all tests in this file are done, so the
// process can exit cleanly.
afterAll(async () => {
    await pool.end();
});

describe("GET /api/categories", () => {
    it("returns categories", async () => {
        const res = await request(app).get("/api/categories");

        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(2);
        const sports = res.body.find(
            (e: { name: string }) => e.name === "Sports",
        );
				expect(sports.id).toBeDefined()
    });
});


describe("POST /api/categories", () => {
    it("creates a category and returns 201 with the created row", async () => {
        const res = await request(app)
            .post("/api/categories")
            .send({ name: "Fun" });

        expect(res.status).toBe(201);
        expect(res.body).toMatchObject({ name: "Fun" });
        expect(res.body.id).toBeDefined();  // an id exists — we don't pin its value
    });

    it("returns 400 when a required field is missing", async () => {
        const res = await request(app)
            .post("/api/categories")
            .send({ name: 67 }); // no amount

        expect(res.status).toBe(400);
    });
});

describe("PUT /api/categories/:id", () => {
    it("returns 404 for an id that does not exist", async () => {
        const res = await request(app)
            .put("/api/categories/00000000-0000-0000-0000-000000000000")
            .send({ name: "Housing" });

        expect(res.status).toBe(404);
    });
});

describe("DELETE /api/categories/:id", () => {
    it("deletes an existing expense and returns 204", async () => {
        // Arrange: grab a real id from the seeded list
        const list = await request(app).get("/api/categories");
        const id = list.body[0].id;

        const res = await request(app).delete(`/api/categories/${id}`);
        expect(res.status).toBe(204);
    });
});