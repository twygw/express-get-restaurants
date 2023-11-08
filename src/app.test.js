const request = require("supertest");
const app = require("./app");

describe("Restaurant API Tests", () => {
  it("GET /restaurants should return a status code of 200", async () => {
    const response = await request(app).get("/restaurants");
    expect(response.status).toBe(200);
  });

  it("GET /restaurants should return an array of restaurants", async () => {
    const response = await request(app).get("/restaurants");
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("GET /restaurants should return the correct number of restaurants", async () => {
    const response = await request(app).get("/restaurants");
    expect(response.body.length).toBe(7);
  });

  it("GET /restaurants should return the correct restaurant data", async () => {
    const response = await request(app).get("/restaurants");
    expect(response.body).toEqual([
      {
        id: 1,
        name: "AppleBees",
        location: "Texas",
        cuisine: "FastFood",
        createdAt: "2023-11-06T12:40:46.646Z",
        updatedAt: "2023-11-06T12:40:46.646Z",
      },
      {
        id: 3,
        name: "Spice Grill",
        location: "Houston",
        cuisine: "Indian",
        createdAt: "2023-11-06T12:40:46.646Z",
        updatedAt: "2023-11-06T12:40:46.646Z",
      },
      {
        id: 5,
        name: null,
        location: null,
        cuisine: null,
        createdAt: "2023-11-07T12:26:39.237Z",
        updatedAt: "2023-11-07T12:26:39.237Z",
      },
      {
        id: 6,
        name: null,
        location: null,
        cuisine: null,
        createdAt: "2023-11-07T12:26:50.421Z",
        updatedAt: "2023-11-07T12:26:50.421Z",
      },
      {
        id: 7,
        name: null,
        location: null,
        cuisine: null,
        createdAt: "2023-11-07T12:26:57.986Z",
        updatedAt: "2023-11-07T12:26:57.986Z",
      },
    ]);
  });

  it("GET /restaurants/:id should return the correct data", async () => {
    const id = 1;
    const response = await request(app).get(`/restaurants/${id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: "AppleBees",
      location: "Texas",
      cuisine: "FastFood",
      createdAt: "2023-11-06T12:40:46.646Z",
      updatedAt: "2023-11-06T12:40:46.646Z",
    });
  });

  it("POST /restaurants should update the restaurant array", async () => {
    const newRestaurant = {
      name: "New Restaurant",
      cuisine: "Italian",
    };
    const response = await request(app)
      .post("/restaurants")
      .send(newRestaurant);
    expect(response.status).toBe(201);

    const restaurantsResponse = await request(app).get("/restaurants");
    expect(restaurantsResponse.body).toContainEqual(newRestaurant);
  });

  it("PUT /restaurants/:id should update the restaurant array with the provided value", async () => {
    const id = 5;
    const updatedRestaurant = {
      name: "Updated Restaurant",
    };

    const response = await request(app)
      .put(`/restaurants/${id}`)
      .send(updatedRestaurant);
    expect(response.status).toBe(200);

    const restaurantsResponse = await request(app).get("/restaurants");
    const updatedRestaurantData = restaurantsResponse.body.find(
      (r) => r.id === id
    );
    expect(updatedRestaurantData).toEqual(updatedRestaurant);
  });

  it("DELETE /restaurants/:id should delete the restaurant with the provided ID", async () => {
    const id = 3;
    const response = await request(app).delete(`/restaurants/${id}`);
    expect(response.status).toBe(204);

    const restaurantsResponse = await request(app).get("/restaurants");
    expect(restaurantsResponse.body).not.toContainEqual(
      expect.objectContaining({ id })
    );
  });
});
