const app = require("../app");
const mongoose = require("mongoose");
const supertest = require("supertest");

describe("Sample Test", () => {
    it("should test that true === true", () => {
      expect(true).toBe(true);
    });
  });

test("test add Payment without relevent data", async () => {
    const result = await supertest(app)
      .post("/api/payment/create")
      .send({});
    expect(result.statusCode).toBe(201);
  });

  test("test Payment controller with relevent data", async () => {
    const result = await supertest(app)
      .post("/api/payment/create")
      .send({
        name:"testCat-02",
        email:"testCat-01",
        date:"22/08/2021",
        cardnumber:"2.00",
        cvc:123,
        amount:100,
        
       
        
      });
    expect(result.statusCode).toBe(201);
  });
  
test("test get Booking details controller ", async () => {
    const result = await supertest(app)
      .get("/api/booking/getall")
      .send({});
    expect(result.statusCode).toBe(200);
  });
  