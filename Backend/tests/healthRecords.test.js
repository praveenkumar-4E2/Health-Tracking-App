const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const HealthRecord = require('../models/healthRecords');
require("dotenv").config();

// Connect to a test database before tests
beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    //remove entires before test
    await HealthRecord.deleteMany();
});

// Clean up the database after each test
afterEach(async () => {
  await HealthRecord.deleteMany();
});

// Close the database connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Health Records API', () => {
  it('POST /health-records - should create a new health record', async () => {
    const response = await request(app)
      .post('/health-records')
        .send({
        date:'2024-09-17',
        bodyTemperature: 98,
        bloodPressure: '120/80',
        heartRate: 72,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.bodyTemperature).toBe(98);
    expect(response.body.bloodPressure).toBe('120/80');
    expect(response.body.heartRate).toBe(72);
  });

  it('GET /health-records - should retrieve all health records', async () => {
    await HealthRecord.create({ bodyTemperature: 98.6, bloodPressure: '120/80', heartRate: 72 });

    const response = await request(app).get('/health-records');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].bodyTemperature).toBe(98.6);
  });

  it('GET /health-records/:id - should retrieve a specific health record by ID', async () => {
    const record = await HealthRecord.create({ bodyTemperature: 98.6, bloodPressure: '120/80', heartRate: 72 });

    const response = await request(app).get(`/health-records/${record._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.bodyTemperature).toBe(98.6);
  });

  it('PUT /health-records/:id - should update a health record', async () => {
    const record = await HealthRecord.create({ bodyTemperature: 98.6, bloodPressure: '120/80', heartRate: 72 });

    const response = await request(app)
      .put(`/health-records/${record._id}`)
      .send({ bodyTemperature: 99.5 });

    expect(response.statusCode).toBe(200);
    expect(response.body.bodyTemperature).toBe(99.5);
  });

  it('DELETE /health-records/:id - should delete a health record', async () => {
    const record = await HealthRecord.create({ bodyTemperature: 98.6, bloodPressure: '120/80', heartRate: 72 });

    const response = await request(app).delete(`/health-records/${record._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Record deleted');
  });
});
