const app = require("../app");
const mongoose = require("mongoose");
const supertest = require("supertest");

describe("Sample Test", () => {
    it("should test that true === true", () => {
      expect(true).toBe(true);
    });
  });

test("test add Booking without relevent data", async () => {
    const result = await supertest(app)
      .post("/api/bus/booking")
      .send({});
    expect(result.statusCode).toBe(201);
  });

  test("test Booking controller with relevent data", async () => {
    const result = await supertest(app)
      .post("/api/bus/booking")
      .send({
        nic:1,
        date:"22/08/2021",
        time:"2.00",
        startingPoint:"Test Test",
        endingPoint: "testCat",
        quantity:1,
        
       
        
      });
    expect(result.statusCode).toBe(201);
  });
  
test("test get Booking details controller ", async () => {
    const result = await supertest(app)
      .get("/api/booking/getall")
      .send({});
    expect(result.statusCode).toBe(200);
  });
  