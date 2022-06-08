import app from '../index';
import request from "supertest";

describe('GET /tag/:page', ()=>{
    it('List tag simple', async()=>{
        const result= await request(app).get(`/tag/${3}`);
        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('tags');
    })
});