const app = require("../app");
const mongoose = require("mongoose");
const supertest = require("supertest");

describe("Sample Test", () => {
    it("should test that true === true", () => {
      expect(true).toBe(true);
    });
  });

  

test("test add buses without relevent data", async () => {
    const result = await supertest(app)
      .post("/api/bus/createbus")
      .send({});
    expect(result.statusCode).toBe(201);
  });

 


  test("test buses controller with relevent data", async () => {
    const result = await supertest(app)
      .post("/api/bus/createbus")
      .send({
        platenumber: "Test Test",
        drivername: "testCat",
        city: "testCat-01",
        contact:"testCat-02",
        
      });
    expect(result.statusCode).toBe(201);
  });
  
test("test getbuses controller ", async () => {
    const result = await supertest(app)
      .get("/api/bus/viewbuses")
      .send({});
    expect(result.statusCode).toBe(200);
  });
  