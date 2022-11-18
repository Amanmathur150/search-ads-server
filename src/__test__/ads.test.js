const request = require('supertest');
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../database/db");
const { loadData } = require("../../data/loadData");


describe('Ads Api test', () => {
  jest.setTimeout(20000)
  beforeAll(async ()=>{
    // to make sure all connectivity done before test
    await mongoConnect()
    await loadData()
  })

  describe('get All ads Test', () => {
    test('It should respond with 200 success', async () => {
      const response = await request(app)
      .get('/api/ads')
      .expect(200);
    });
  });
  
  describe('Test For search', () => {
   
  
    test('It should response with 200', async () => {
      const response = await request(app)
        .get('/api/ads/search?text=levi')
        .expect(200);
    });
    
   
 
  });

  afterAll(async ()=>{
    await mongoDisconnect()
  })
});