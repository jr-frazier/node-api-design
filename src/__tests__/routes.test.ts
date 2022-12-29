import app from "../server";
import supertest from "supertest";

describe("GET /", () => {
  it("should send back dome data", async () => {
    const res = await supertest(app).get("/");

    expect(res.body.message).toBe("hello there");
  });
});
